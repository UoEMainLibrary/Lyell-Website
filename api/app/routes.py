from flask import request
from flask_cors import cross_origin

from app import app
from app.models import TagHandler, create_search, get_item_from_shelfmark, date_filter, remove_sets, series_count
import json


@app.route('/')
@app.route('/api')
def index():
    return "Hello, World!"


@app.route('/api/manifest/<obj_id>')
@cross_origin()
def get_manifest(obj_id):
    with open("app/data/manifests/manifest_" + obj_id.capitalize() + ".json", "r") as file:
        obj = json.loads(file.read())
    return obj


@app.route('/api/object/<obj_id>')
def get_object(obj_id):
    shelfmark = "Coll-203/" + obj_id.replace("-", "/")
    print(shelfmark)
    obj = get_item_from_shelfmark(shelfmark)
    return obj


@app.route('/api/search', methods=['GET'])
def get_request():
    query = request.args.get('search')
    allTags = request.args.getlist('tag')
    dates = request.args.get('date')
    sets = request.args.get('sets')
    tags = {}
    try:
        with open("app/data/all_notebooks.json", "r") as file:
            obj = json.loads(file.read())
    except Exception as e:
        obj = {"results": []}
    obj["results"].sort(key=lambda x: int(x["component_id"].rsplit('/', 1)[-1]))
    tagMan = TagHandler()

    if allTags:
        for tag in allTags:
            k, v = tag.rsplit(":")
            if k in tags:
                tags[k].append(v)
                continue
            tags.update({k: [v]})
        obj["results"] = tagMan.tag_filter(tags)
        obj["filter_tags"] = tags
    if sets:
        obj["results"] = remove_sets(sets, obj["results"])
    if dates:
        obj["results"] = date_filter(dates, obj["results"])
    if query:
        obj["query_params"] = query
        obj["results"] = create_search(query, obj["results"])

    obj["tags"] = tagMan.get_tags(obj["results"])
    obj["amounts"] = series_count(obj["results"])
    obj["total"] = len(obj["results"])
    # Call the search function with the query
    return obj


@app.route('/api/index')
@cross_origin()
def get_index():
    i = get_request()
    return i["amounts"]
