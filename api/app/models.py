import json
from enum import Enum


def get_item_from_shelfmark(shelfmark):
    # restructure of data  means this is no longer a nice function might want look into restructuring all notebooks to make this simpler
    with open("app/data/all_notebooks.json", "r") as file:
        data = json.loads(file.read())
    for item in data["results"]:
        if item["component_id"].lower() == shelfmark.lower():
            return item
    return {}


def create_search(query, obs):
    scorer = Scorer(query)
    return scorer.getScored(obs)


class Find(Enum):
    ABSENT = 0
    EXACT = 10
    WITHIN = 5
    WITHIN_IGNORE_PUNC = 5
    WITHIN_SUB = 2


# adapted from https://stackoverflow.com/questions/62314789/no-internet-connection-on-wsl-ubuntu-windows-subsystem-for-linux

def recursive_search(obj, query):
    if isinstance(obj, dict):
        for key, value in obj.items():
            if query.lower() in str(value).lower():
                return True
            if recursive_search(value, query):
                return True
    elif isinstance(obj, list):
        for item in obj:
            if recursive_search(item, query):
                return True
    return False


class Scorer:
    def __init__(self, query, depthDecay=0.5):
        self.query = query.lower()
        self.decay = depthDecay
        self.customFuncs = {
            "title": self.scoreStr,
            "subjects": self.scoreDictKeys,
            "linked_agents": self.scoreDictKeys
        }
        self.ignoreChars = ".,_-:;\"'"

    def tokenify(self, st):
        for ch in self.ignoreChars:
            st = st.replace(ch, " ")
        return st.split()

    def find(self, st):
        st = st.lower()
        if st == self.query:
            return Find.EXACT
        if self.query in st.split():
            return Find.WITHIN
        sub = False
        for tok in self.tokenify(st):
            if tok == self.query:
                return Find.WITHIN_IGNORE_PUNC
            if tok.find(self.query) != -1:
                sub = True
        return Find.WITHIN_SUB if sub else Find.ABSENT

    def scoreStr(self, con):
        return self.find(con).value

    def scoreDictKeys(self, sub):
        scr = 0
        for con in sub.keys():
            ns = self.find(con)
            if ns == Find.EXACT:
                return Find.EXACT.value
            scr = max(scr, ns.value)
        return scr

    def score(self, item, depthMod=1.0):
        score = 0
        nextMod = self.decay * depthMod
        if isinstance(item, dict):
            for key in item:
                if key in self.customFuncs:
                    score += self.customFuncs[key](item[key]) * depthMod
                else:
                    score += self.score(item[key], nextMod)
        elif isinstance(item, list):
            for sub in item:
                score += self.score(sub, nextMod)
        elif isinstance(item, str):
            score += self.scoreStr(item) * depthMod
        return score

    def getScored(self, items):
        rets = []
        for item in items:
            isc = self.score(item)
            if isc > 0:
                rets.append([item, isc])
        return sorted(rets, key=lambda x: x[1], reverse=True)


def date_filter(dates, obj):
    newObj = []
    dateList = dates.split(' ')
    after = dateList[0] if len(dateList) > 0 else ''
    before = dateList[1] if len(dateList) > 1 else ''
    for item in obj:
        include = True
        if type(item) == list:
            item = item[0]
        itemDate = item["dates"]
        if after:
            itemBegin = itemDate["begin"].split('-')[0]
            if itemBegin < after:
                include = False
        if before:
            itemEnd = itemDate["end"].split('-')[0]
            if itemEnd > before:
                include = False
        if include:
            newObj.append(item)
    return newObj


class TagHandler:
    def __init__(self):
        self.tagStore = {}

    def tag_filter(self, tags):
        shelfmarks = []
        for category in tags:
            if category not in self.tagStore:
                with open("app/data/tags/tag_" + category + ".json", "r") as file:
                    obj = json.loads(file.read())
                self.tagStore[category] = obj
            for tag in self.tagStore[category]:
                found = len(tags[category])
                if tag["title"] in tags[category]:
                    found -= 1
                    if not shelfmarks:
                        shelfmarks = (tag["entries"])
                        continue
                    shelfmarks = list(set(shelfmarks).intersection(tag["entries"]))
        notebooks = []
        for s in shelfmarks:
            notebooks.append(get_item_from_shelfmark(s))
        return notebooks

    def get_tags(self, notebooks):
        newTags = {}
        for notebook in notebooks:
            if type(notebook) == list:
                notebook = notebook[0]
            sm = notebook["component_id"]
            for sub in notebook["subjects"]:
                cat = notebook["subjects"][sub]
                self.find_tags(sub, cat, newTags, sm)
            for per in notebook["linked_agents"]:
                self.find_tags(per, notebook["linked_agents"][per], newTags, notebook["component_id"])
        return newTags

    def find_tags(self, title, category, newTags, componentID):
        if category not in self.tagStore:
            print(category)
            with open("app/data/tags/tag_" + category + ".json", "r") as file:
                obj = json.loads(file.read())
            self.tagStore[category] = obj
        if category not in newTags:
            newTags[category] = []
        for tag in newTags[category]:
            if tag["title"] == title:
                tag["entries"].append(componentID)
                return
        for tag in self.tagStore[category]:
            if tag["title"] == title:
                tagCopy = {
                    "title": tag["title"],
                    "id": tag["id"],
                    "published": tag["published"],
                    "entries": [componentID]
                }
                newTags[category].append(tagCopy)
                return
