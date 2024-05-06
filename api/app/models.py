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
    def __init__(self, querySet, depthDecay=0.5):
        self.ignoreChars = ".,_-:;\"'"
        blocks = querySet.split(" OR ")
        self.queries = []
        self.quotes = {}
        for block in blocks:
            atocs = []
            acc = ""
            qc = False
            for ch in block.lower():
                if ch == '"':
                    if qc and acc != "":
                        self.quotes[(len(self.quotes),len(atocs))] = True
                        atocs.append(acc)
                        acc = ""
                    qc = not qc
                elif (ch == " " or ch in self.ignoreChars) and (not qc) and acc != "":
                    atocs.append(acc)
                    acc = ""
                else:
                    acc += ch
            if acc != "":
                atocs.append(acc)
            if atocs != []:
                self.queries.append(atocs)

        self.decay = depthDecay
        self.customFuncs = {
            "title": self.scoreStr,
            "subjects": self.scoreDictKeys,
            "linked_agents": self.scoreDictKeys
        }

    def tokenify(self, st):
        for ch in self.ignoreChars:
            st = st.replace(ch, " ")
        return st.split()

    def find(self, st, tar, qt=False):
        st = st.lower()
        if st == tar:
            return Find.EXACT
        if qt:
            fiv = st.find(tar)
            if fiv != -1:
                enc = fiv + len(tar)
                # checking to see if either end of the phrase is embedded in other words
                return Find.WITHIN if (fiv == 0 or not st[fiv - 1].isalnum()) and (
                            enc == len(st) or not st[enc].isalnum()) else Find.WITHIN_SUB
        elif tar in st.split():
            return Find.WITHIN
        sub = False
        for tok in self.tokenify(st):
            if tok == tar:
                return Find.WITHIN_IGNORE_PUNC
            if tok.find(tar) != -1:
                sub = True
        return Find.WITHIN_SUB if sub else Find.ABSENT

    def scoreStr(self, con, scores, depthMod):
        for i, cluster in enumerate(self.queries):
            for j, toke in enumerate(self.queries[i]):
                scores[i][j] += self.find(con, toke, (i,j) in self.quotes).value * depthMod

    def scoreDictKeys(self, sub, scores, depthMod):

        for i, cluster in enumerate(self.queries):
            for j, toke in enumerate(self.queries[i]):
                ov = 0
                for con in sub.keys():
                    ns = self.find(con, toke, (i,j) in self.quotes)
                    ov = max(ov, ns.value)
                    if ns == Find.EXACT:
                        break
                scores[i][j] += ov * depthMod

    def score(self, item, scores=None, depthMod=1.0):

        if scores is None:
            scores = []
            for qset in self.queries:
                bl = []
                for sq in qset:
                    bl.append(0)
                scores.append(bl)

        nextMod = self.decay * depthMod
        if isinstance(item, dict):
            for key in item:
                if key in self.customFuncs:
                    self.customFuncs[key](item[key], scores, depthMod)
                else:
                    self.score(item[key], scores, nextMod)
        elif isinstance(item, list):
            for sub in item:
                self.score(sub, scores, nextMod)
        elif isinstance(item, str):
            self.scoreStr(item, scores, depthMod)
        return scores

    def getScored(self, items):
        rets = []
        for item in items:
            scores = self.score(item)
            isc = 0
            for i, _ in enumerate(self.queries):
                con = 0
                for fs in scores[i]:
                    if fs == 0:
                        con = 0
                        break
                    con += fs
                isc += con

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