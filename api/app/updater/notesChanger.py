import re


def find_tags(notebook):
    for note in notebook["notes"]:
        noteText = note["content"].lower()
        pattern = r'<([^>]+)>'
        tags = re.findall(pattern, noteText)
        for tag in tags:
            if tag in ["lb", "/lb", "lb/", "br", "/emph", 'emph render="underline"', 'emph render="italic"']:
                continue
            print(notebook["component_id"])
            print("====")
            print(noteText)
            print("-----")
            print(tag)


def note_identify(notebook):
    notes = {
        "notebook": notebook["component_id"],
        "description": False,
        "index intro": False,
        "index": False,
        "content warning": False,
        "other scope content": False,
        "non scope": False,
        "process": False,
        "total": len(notebook["notes"]),
        "sorted all": True
    }
    for i in range(len(notebook["notes"])):
        note = notebook["notes"][i]
        label = note.get("label")
        if label == "Content warning":
            notes["content warning"] = i
            continue
        if note["type"] == "processinfo":
            notes["process"] = i
            continue
        if note["type"] == "scopecontent":
            if i == 0:
                if not notes["description"]:
                    notes["description"] = i
                    continue
            if any(map(lambda x: x in note["content"],
                       ["The following table of content", "This index is not", "summary of the main elements",
                        "Summaries of pages", "which was created using Transkribus"])):
                if "The following table of content" in note["content"] and not note["content"].startswith(
                        "The following table"):
                    print("index intro but odd " + notebook["component_id"] + " note " + str(i + 1))
                if not notes["index intro"]:
                    notes["index intro"] = i
                    continue
            if "p." in note["content"]:
                if "</lb>" in note["content"] or "<lb/>" in note["content"]:
                    if not notes["index"]:
                        notes["index"] = i
                        continue
                else:
                    print("not a index? " + notebook["component_id"] + str(i + 1))
                    # print(note["content"])
            print("hasn't fond catagory " + notebook["component_id"] + " note " + str(i + 1))
            # print(note["content"])
            if not notes["other scope content"]:
                notes["other scope content"] = i
                continue
            notes["sorted all"] = False
        else:
            # print("type different " + note["type"] + " in notebook " + notebook["component_id"])
            if not notes["non scope"]:
                notes["non scope"] = i
                continue
            notes["sorted all"] = False
    return notes
