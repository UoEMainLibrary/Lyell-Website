import json
import logging
import os
from datetime import datetime, date
from .arcspace import call_archive, simplify_data, TagsAgain
from .iiif import make_manifest_v2, get_luna_iiif
from .luna import get_item

logger = logging.getLogger(__name__)


def process_notebook(notebook):
    """
    main notebook process that takes a raw notebook from archivespace create an iiif manifest for it in the
    manifest folder if it has images and returns the notebook in the desired formate

    :param notebook: the raw notebook object given by archivesspace api

    :return: the notebook object in the desired formate
    """
    arcImproved = simplify_data(notebook)
    arcID = arcImproved["uri"].rsplit('/', 1)[-1]
    notebookNo = arcImproved["component_id"].rsplit('/', 1)[-1]
    lunaResponse = get_item(arcID, arcImproved["component_id"])
    arcImproved = expand_tags(arcImproved)

    if lunaResponse['pages']:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        manifestPath = os.path.join(current_dir, '..', 'app', 'data', 'manifests')

        meta, pages = get_luna_iiif(lunaResponse["pages"])
        pages.sort(key=lambda x: x["metadata"][0]["value"])
        manifest = make_manifest_v2(arcImproved, meta, pages)
        logger.info("making manifest file " + notebookNo)
        with open(manifestPath + '/manifest_A1-' + notebookNo + '.json', 'w') as outFile:
            json.dump(manifest, outFile, indent=4)
        arcImproved["thumbnail"] = get_thumbnail(manifest)
        arcImproved["iiifmanifest"] = 'data/manifest_A1-' + notebookNo + '.json'
    else:
        arcImproved["iiifmanifest"] = False

    return arcImproved


def process_notebook_noiiif(notebook):
    """
    alternative notbook processor that doesn't create an iiif file mainly for testing purposes
    works on the assumption an iiif file has already been created if that notebook has images

    :param notebook: the raw notebook object given by archivesspace api

    :return: the notebook object in the desired formate
    """
    arcImproved = simplify_data(notebook)
    arcID = arcImproved["uri"].rsplit('/', 1)[-1]
    lunaResponse = get_item(arcID, arcImproved["component_id"])
    notebookNo = arcImproved["component_id"].rsplit('/', 1)[-1]
    logger.info(str(arcImproved["component_id"]))
    arcImproved = expand_tags(arcImproved)
    if lunaResponse['pages']:
        arcImproved["iiifmanifest"] = 'data/manifest A1-' + notebookNo + '.json'
        with open('../data/manifests/manifest_A1-' + notebookNo + '.json', 'r') as file:
            manifest = json.load(file)
        arcImproved["thumbnail"] = get_thumbnail(manifest)
    else:
        arcImproved["iiifmanifest"] = False
    return arcImproved


def get_entire_search(params, page):
    result = call_archive('repositories/2/search', {'q': params, 'page': page, 'page_size': 999})
    if result['this_page'] != result['last_page'] and result['last_page'] != 0:
        page = result['this_page'] + 1
        nextresult = get_entire_search(params, page)
        for item in nextresult['results']:
            result['results'].append(item)
    return result


def search(params, page=1):
    logging.info("getting ArchivesSpace results for lyell")
    result = get_entire_search(params, page)
    notebooks = []
    print(result['total_hits'])
    if result['total_hits'] != 0:
        i = 1
        for response in result['results']:
            i = i + 1
            if response.get("component_id"):
                if "Coll-203/A1/" in response.get("component_id"):
                    notebooks.append(json.loads(response["json"]))
    notebookResult = {
        "title": "notebooks",
        "date": str(datetime.now()),
        "total_hits": len(notebooks),
        "results": notebooks
    }

    return notebookResult


def get_thumbnail(manifest):
    thumbnail = manifest["sequences"][0]["canvases"][0]["thumbnail"]["@id"]
    a = thumbnail.rsplit("/")
    for i in range(len(a)):
        if len(a[i]) > 0:
            if a[i][0] == "!":
                a[i] = "!512,512"
                continue
    thumbnail = "/".join(a)
    return thumbnail


def expand_tags(n):
    tags = TagsAgain()
    n["creators"] = tags.expand_tags(n["creators"], n["component_id"])
    n["linked_agents"] = tags.expand_tags(n["linked_agents"], n["component_id"])
    n["subjects"] = tags.expand_tags(n["subjects"], n["component_id"])
    return n


############################################################################################################

# Different methods for running the program including an initial setup running from a given file and test runs


class Updater:
    def __init__(self, mode):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.dataPath = os.path.join(current_dir, '..', 'app', 'data', 'all_notebooks.json')
        self.backupDataPath = os.path.join(current_dir, '..', 'app', 'data', 'backup_all_notebooks.json')
        self.updatedNotebooks = {
            "title": "notebooks",
            "date-created": str(date.today()),
            "results": []
        }

        if not os.path.exists(self.dataPath):
            if mode != "hr":
                logging.error(f"File '{self.dataPath}' does not exist, can not complete update")
                raise Exception("There is no exiting data try running as --hard-reset")
        else:
            try:
                with open(self.dataPath, 'r') as file:
                    self.exiting_notebook = json.load(file)
                    logger.info("Got file with exiting data successfully")
            except Exception as e:
                logger.error(f"An error occurred getting exiting data: {e}")

        if mode == "hr" or mode == "n":
            self.newRawData = search("creator:'Lyell'")
        else:
            logger.info("getting ArchivesSpace results for lyell")
            self.newRawData = call_archive("repositories/2/" + mode)

        match mode:
            case "hr":
                self.first_run()
            case "n":
                self.update_all()
            case _:
                self.update_individual(mode)
        with open(self.dataPath, 'w') as outFile:
            json.dump(self.updatedNotebooks, outFile, indent=4)
        today = datetime.now().weekday()
        if today == 0:
            if not self.exiting_notebook:
                self.exiting_notebook = self.updatedNotebooks
            with open(self.backupDataPath, 'w') as file:
                file.write(self.exiting_notebook)

    def first_run(self):
        for n in self.newRawData["results"]:
            logger.info("starting process on notebook " + n["component_id"])
            try:
                new = process_notebook(n)
                self.updatedNotebooks["results"].append(new)
            except Exception as e:
                logger.error(f"Failed to add notebook {n['component_id']}, {e}")

    def update_individual(self, shelfmark):
        for oldN in self.exiting_notebook["results"]:
            if shelfmark == oldN["component_id"]:
                self.updatedNotebooks["results"].append(process_notebook(self.newRawData))
                continue
            self.updatedNotebooks["results"].append(oldN)

    def update_all(self):
        for newN in self.newRawData["results"]:
            found = False
            for oldN in self.exiting_notebook["results"]:
                if newN["component_id"] == oldN["component_id"]:
                    found = True
                    sys_modified = datetime.strptime(newN["system_mtime"], "%Y-%m-%dT%H:%M:%SZ")
                    user_modified = datetime.strptime(newN["user_mtime"], "%Y-%m-%dT%H:%M:%SZ")
                    lastUpdated = datetime.strptime(self.exiting_notebook["date-created"], "%Y-%m-%d")
                    lastEdit = max(user_modified, sys_modified)
                    if lastUpdated > lastEdit:
                        logger.info(f"{oldN['component_id']} has no change, last edited {lastEdit}")
                        self.updatedNotebooks["results"].append(oldN)
                    else:
                        logger.info(f"last modified at {lastEdit}. Updating notebook...")
                        try:
                            self.updatedNotebooks["results"].append(process_notebook(newN))
                            logger.info("updated notebook " + oldN["component_id"])
                        except Exception as e:
                            logger.error(f"Failed to update notebook {newN['component_id']}, keeping old data. {e}")
                            self.updatedNotebooks["results"].append(oldN)
                    break
            if not found:
                logger.info("new notebook! " + oldN["component_id"])
                try:
                    self.updatedNotebooks["results"].append(process_notebook(newN))
                except Exception as e:
                    logger.error(f"Failed to add new notebook {newN['component_id']}. {e}")
