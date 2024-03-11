import time

from flask import requests


def make_manifest_v2(notebook, meta, pages):
    base = get_base()
    base["label"] = notebook["title"]
    base["description"] = notebook["display_string"]
    metadata = []
    for i in meta:
        if i["label"] != "Licence":
            metadata.append(i)
    base["metadata"] = metadata
    if notebook["notes"]:
        base["description"] = notebook["notes"][0]["content"]
    for page in pages:
        base["sequences"][0]["canvases"].append(page)
    return base


def get_luna_iiif(manifests):
    manifest_meta = {}
    canvases = []
    for i in manifests:
        iiifpage = None
        try:
            step = None
            tries = 1
            while tries < 6:
                step = requests.get(i)
                if step:
                    break
                delay = 2 ** tries
                tries += 1
                print(f"{i} FAILED! Trying again in {delay} second{'s' if tries == 1 else ''}")
                time.sleep(delay)
            iiifpage = step.json()
        except requests.exceptions.RequestException as e:
            print("iiif went wrong: " + str(e))
        print("got " + i.split('/')[-2])
        canvases.append(iiifpage["sequences"][0]["canvases"][0])

    for i in range(len(canvases)):
        metadata = convert_dict(canvases[i]["metadata"])
        if i == 0:
            manifest_meta = metadata
        else:
            for label in metadata:
                if label in manifest_meta and metadata[label] != manifest_meta[label]:
                    del manifest_meta[label]
    for i in range(len(canvases)):
        metadata = convert_dict(canvases[i]["metadata"])
        for label in manifest_meta:
            if label in metadata:
                del metadata[label]
        canvases[i]["metadata"] = convert_dict(metadata)
    manifest_meta = convert_dict(manifest_meta)
    return manifest_meta, canvases


# converts metadata between iiif formate and generic formate
def convert_dict(data):
    dict_data = {}
    array_data = []
    if type(data) == list:
        for kvp in data:
            try:
                lab = kvp["label"]
                val = kvp["value"]
                if lab not in dict_data:
                    dict_data[lab] = val
                else:
                    cur = dict_data[lab]
                    if type(cur) is list:
                        dict_data[lab] += [val]
                    else:
                        dict_data[lab] = [cur, val]
            except Exception as err:
                print(err)
                print(kvp)
                print(dict_data)
        return dict_data
    for k in data:
        array_data.append({"label": k, "value": data[k]})
    return array_data


def get_base():
    blank_file = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "https://images.is.ed.ac.uk/luna/images/LUNAIIIF80.png",
        "@type": "sc:Manifest",

        "label": "change",
        "metadata": "",
        "description": "change",

        "viewingDirection": "left-to-right",
        "viewingHint": "paged",

        "license": "https://creativecommons.org/licenses/by/3.0/",
        "attribution": "",
        "sequences": [
            {
                "@type": "sc:Sequence",
                "label": [
                    {
                        "@value": "Normal Sequence",
                        "@language": "en"
                    }
                ],
                "canvases": [

                ]
            }
        ]

    }

    return blank_file
