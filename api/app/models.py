import json


def get_item_from_shelfmark(shelfmark):
    # restructure of data means this is no longer a nice function might want look into restructuring all notebooks to make this simpler
    with open("app/data/all notebooks.json", "r") as file:
        data = json.loads(file.read())
    for item in data["results"]:
        if item["component_id"].lower() == shelfmark.lower():
            return item
    return {}


def create_search(query, obj):
    results = []
    for item in obj["results"]:
        if recursive_search(item, query):
            results.append(item)
    return results


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
            sm = notebook["component_id"]
            for sub in notebook["subjects"]:
                cat = notebook["subjects"][sub]
                self.find_tags(sub, cat, newTags, sm)
            for per in notebook["linked_agents"]:
                self.find_tags(per, notebook["linked_agents"][per], newTags, notebook["component_id"])
        return newTags

    def find_tags(self, title, category, newTags, componentID):
        if category not in self.tagStore:
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
