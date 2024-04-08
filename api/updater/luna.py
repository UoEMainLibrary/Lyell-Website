import json
import time
import requests
import logging

logger = logging.getLogger(__name__)

LUNA_URL = "https://images.is.ed.ac.uk/luna/servlet/as/fetchMediaSearch"
LUNA_PARAMS = "fullData=true&bs=10000&includeIiifManifest=true&includeIiifCollection=true&q=="


def get_item(arcId="", shelfmark=""):
    """
    Main luna call uses both the ID archivesspace assigns and the shlefmark to be sure to only get all off
    one specific notebooks pages, then from the response gets the iiif links.

    :param shelfmark: shelfmark
    :param arcId: archivespace assigned ID used at the end of the notebook uri

    :return: dictionary in with two keys, "iiifCollection" which is a single iiif link created by luna for the search request,
    "pages" which is a list of all the individual iiif link for every page
    """
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
            logger.debug(f"{i} FAILED! Trying again in {delay} second{'s' if tries == 1 else ''}")
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
