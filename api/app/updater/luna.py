import json
import time

from flask import requests

LUNA_URL = "https://images.is.ed.ac.uk/luna/servlet/as/fetchMediaSearch"
LUNA_PARAMS = "fullData=true&bs=10000&includeIiifManifest=true&includeIiifCollection=true&q=="


def get_item(arcId, shelfmark):
    url = f"{LUNA_URL}?{LUNA_PARAMS}%22{arcId}%22 AND =%22{shelfmark}%22"
    item = None
    try:
        step = None
        tries = 1
        while tries < 6:
            step = requests.get(url)
            if step:
                break
            delay = 2 ** tries
            tries += 1
            time.sleep(delay)
        item = step.json()
    except requests.exceptions.RequestException as e:
        # swap with python logger
        print("luna api went wrong: " + str(e))
    item = better_response(item)
    return item


def better_response(response):
    temp = []
    for i in response["results"]:
        temp.append(i["iiifManifest"])
    newResponse = {"iiifCollection": response["iiifCollection"], "pages": temp}
    return newResponse


def get_archive_entry(response):
    try:
        page = requests.get(response["pages"][0]).json()
    except requests.exceptions.RequestException as e:
        print(response)
        print(response["pages"][0])
        input(">")
        raise SystemExit(e)
    metadata = page["sequences"][0]["canvases"][0]["metadata"]
    for i in metadata:
        if i["label"] == "Catalogue Entry":
            return i["value"]
    return False
