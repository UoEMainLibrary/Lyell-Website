import json
from asnake.client import ASnakeClient

url = 'https://aspaceapi.collections.ed.ac.uk'
user = 'apiread'
password = 'Auxilium1'
token = ''


# archive snake!!!
def call_archive(target, param=None):
    client = ASnakeClient(baseurl=url, username=user, password=password)
    client.authorize()
    if param:
        result = client.get(target, params=param)
    else:
        result = client.get(target)
    print("call! " + target)
    return result.json()


def simplify_data(notebook_object):
    better_object = {key: notebook_object[key] for key in
                     notebook_object.keys() & {'title', 'display_string',
                                               'level', 'volumes',
                                               'component_id', 'id_0', 'uri'}}
    for key in notebook_object:
        if key == "subjects" or key == "linked_agents":
            subjects = []
            better_object["creators"] = []
            for i in notebook_object[key]:
                if "role" in i and i["role"] == "creator":
                    better_object["creators"].append(i["ref"])
                subjects.append(i["ref"])
            better_object[key] = subjects
        if key == "notes":
            better_object = note_time(better_object, notebook_object)
            better_object["notes"] = separate_warning(better_object["notes"])
        if key == "dates":
            if notebook_object[key]:
                dates = notebook_object[key][0]
                better_object["dates"] = {"expression": dates.get("expression", "date-missing"),
                                          "begin": dates.get("begin", "date-missing"),
                                          "end": dates.get("end", "date-missing")}
    return better_object


def get_name(target="/agents/people/86"):
    result = call_archive(target)
    identifier = "person"
    if result["jsonmodel_type"] == "agent_family":
        identifier = "family"
    if result["jsonmodel_type"] == "agent_corporate_entity":
        identifier = "corporate_entities"
    return result["names"][0]["sort_name"], identifier, result.get("publish", 0)


def get_subject(target="/subjects/27893"):
    result = call_archive(target)
    if result["title"]:
        person = result["title"]
        subject = result["terms"][0]["term_type"]
    else:
        person = result["names"][0]["sort_name"]
        subject = result["terms"][0]["term_type"]
    return person, subject, result.get("publish", 0)


class TagsAgain:
    def __init__(self):
        self.tagStore = {}
        self.tagDetails = []

    def expand_tags(self, tags, shelfmark):
        result = {}
        with open('data/tags/all_tags.json', 'r') as outFile:
            localTags = json.load(outFile)
        self.tagStore = localTags
        for tag in tags:
            if tag not in self.tagStore:
                self.new_tag(tag)
            if not self.tagDetails:
                with open('data/tags/tag_' + self.tagStore[tag] + '.json', 'r') as outFile:
                    tfile = json.load(outFile)
                self.tagDetails = tfile
            for t in self.tagDetails:
                if t['id'] == tag:
                    result[t["title"]] = self.tagStore[tag]
                    if shelfmark not in t["entries"]:
                        t["entries"].append(shelfmark)
            with open("data/tags/tag_" + self.tagStore[tag] + ".json", 'w') as file:
                json.dump(self.tagDetails, file, indent=4)
            self.tagDetails = []
        return result

    def new_tag(self, tag):
        id = tag.split('/')
        result, topic = "", ""
        published = False
        if id[1] == "subjects":
            result, topic, published = get_subject(tag)

        if id[1] == "agents":
            result, topic, published = get_name(tag)

        new = {
            "title": result,
            "id": tag,
            "published": published,
            "entries": []
        }
        with open("../data/tags/all_tags.json", 'w') as file:
            self.tagStore.update({tag: topic})
            json.dump(self.tagStore, file, indent=4)
        if result:
            with open("data/tags/tag_" + topic + ".json", "r+") as file:
                file_data = json.load(file)
                file_data.append(new)
                self.tagDetails = file_data
                file.seek(0)
                # file.truncate()
                json.dump(file_data, file, indent=4)


def resolveSubNote(subN):
    content = subN.get("content")
    if not content:
        content = subN.get('items')
        content = "\n<lb/>".join(map(lambda x: x["value"] + " " + x["label"], content))
        if not content:
            print(subN["jsonmodel_type"] + " has no process")
    return content


def note_time(better_object, notebook_object):
    better_object["notes"] = []
    out_notes = better_object["notes"]
    for note in notebook_object["notes"]:
        if not note["publish"]:
            continue
        temp = {}
        for pre in ["label", "type"]:
            if pre in note:
                temp[pre] = note[pre]
        note_info = "subnotes"
        if len(note[note_info]) > 1 and note["type"] == "scopecontent":
            for subNote in note["subnotes"]:
                cop = {"content": resolveSubNote(subNote)}
                cop.update(temp)
                out_notes.append(cop)
        else:
            temp["content"] = "\n".join(map(lambda x: resolveSubNote(x), note["subnotes"]))
            out_notes.append(temp)
    return better_object


def separate_warning(notes):
    for note in notes:
        noteText = note["content"].lower()
        if "content warning" in noteText:
            otherText = ""
            if "<lb></lb>" in noteText:
                tobe = note["content"].split("<lb></lb>")
                tobe = [item for item in tobe if item.strip() != ""]
                warningText = tobe[0]
                if len(tobe) == 3:
                    if "when known, lyell" in tobe[2].lower():
                        otherText = tobe[1].strip(" \n") + " " + tobe[2]
                    else:
                        print("third unknown note")
                elif len(tobe) > 3:
                    print("too many notes!")
                    otherText = tobe[1].strip(" \n")
                elif len(tobe) != 1:
                    otherText = tobe[1].strip(" \n")
            elif "the following table of content" in noteText:
                tobe = note["content"].split("The following table of content")
                warningText = tobe[0]
                otherText = "The following table of content" + tobe[1].strip(" \n")
            else:
                warningText = noteText

            notes.append(
                {
                    "label": "Content warning",
                    "type": note["type"],
                    "content": warningText
                }
            )
            if otherText:
                other = {
                    "type": note["type"],
                    "content": otherText
                }
                if note.get("label"):
                    other["label"] = note["label"]
                notes.append(other)
            notes.remove(note)
            break
    return notes


def separate_warning_new(notes):
    for note in notes:
        noteText = note["content"].lower()
        if "content warning" in noteText:
            otherText = ""
            if "<lb></lb>" in noteText:
                tobe = note["content"].split("<lb></lb>")
                tobe = [item for item in tobe if item.strip() != ""]
                warningText = tobe[0]
                for n in tobe[1:]:
                    other = {
                        "type": note["type"],
                        "content": n
                    }
                    if note.get("label"):
                        other["label"] = note["label"]
                    notes.append(other)
                if len(tobe) == 3:
                    if "when known, lyell" in tobe[2].lower():
                        otherText = tobe[1].strip(" \n") + " " + tobe[2]
                    else:
                        print("third unknown note")
                elif len(tobe) > 3:
                    print("too many notes!")
                    otherText = tobe[1].strip(" \n")
                elif len(tobe) != 1:
                    otherText = tobe[1].strip(" \n")
            elif "the following table of content" in noteText:
                tobe = note["content"].split("The following table of content")
                warningText = tobe[0]
                otherText = "The following table of content" + tobe[1].strip(" \n")
            else:
                warningText = noteText

            notes.append(
                {
                    "label": "Content warning",
                    "type": note["type"],
                    "content": warningText
                }
            )
            if otherText:
                other = {
                    "type": note["type"],
                    "content": otherText
                }
                if note.get("label"):
                    other["label"] = note["label"]
                notes.append(other)
            notes.remove(note)
            break
    return notes
