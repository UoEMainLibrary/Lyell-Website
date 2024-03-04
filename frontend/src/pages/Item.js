import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {UV} from "../components/UniversalViewer";
import {fetchData} from "../api/ApiCall";


function IiifItem({objFull}) {
    const {id} = useParams();

    return (
        <div className="py-3 row">
            <div className="col-12 col-lg-9 p-0">
                <UV manifest={id}
                    parentWidth={"100"}/>
            </div>
            <div className="col-12 col-lg-3 bg-dark p-0 parent-container d-flex flex-column"
                 style={{height: "800px"}}>
                <Sidebar objFull={objFull}/>
            </div>

        </div>
    )

}

function Sidebar({objFull}) {
    const [showIndex, setShowIndex] = useState(false);
    const [contentWarning, setContentWarning] = useState(false)

    const handleIndexClick = () => {
        setShowIndex(true);
    };
    const handleInfoClick = () => {
        setShowIndex(false);
    };

    const infoStyle = {
        overflow: "scroll",
        overflowWrap: "break-word"
    }
    const buttonStyle = {
        border: "2px solid black",

    }
    const description = objFull["notes"][0]["content"]
        .replace(/<lb><\/lb>/g, "<br/>")
        .split('<br/>')

    const url = "https://archives.collections.ed.ac.uk" + objFull["uri"]
    let intro = false
    if (objFull["index intro"]) {
        if (objFull["index intro"].includes("When known, Lyell's abbreviations and contractions have been expanded")) {
            intro = true
        }
    }

    useEffect(() => {
        for (let i = 0; i < objFull["notes"].length; i++) {
            const dict = objFull["notes"][i];
            if (dict.hasOwnProperty("label") && dict["label"] === "Content warning") {
                setContentWarning(objFull["notes"][i]["content"].replace(/<emph render="underline">/g, "<b><u>").replace(/<\/emph>/g, "<\/b><\/u>"))
                console.log(contentWarning)
            }
        }
    })
    return (
        <>
            <div className="fixed-height" style={{borderBottom: "4px solid black", height: "50px"}}>
                <button href="/collections/explore" className="btn btn-info px-5 py-2 mx-2"
                        style={{border: "2px solid black"}} disabled={!showIndex} onClick={handleInfoClick}>Info
                </button>
                {objFull["index"] && (
                    <button href="/collections/explore" className="btn btn-info px-5 py-2 mx-2"
                            style={{border: "2px solid black"}} disabled={showIndex}
                            onClick={handleIndexClick}>Index</button>
                )}
            </div>
            {showIndex ? (
                <div className="p-4 bg-light flex-grow-1 overflow-auto" style={infoStyle}>
                    {!objFull["index intro"] || intro ? (
                        <>
                            <h5>Lyell's Own Index</h5>
                            {intro && objFull["index intro"] && (
                                <>
                                    <p>
                                        Find transcription details in the{' '}
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            catalogue
                                        </a>
                                        .
                                    </p>
                                </>
                            )}
                        </>
                    ) : (
                        <p>{objFull["index intro"]}</p>
                    )}

                    <br/>
                    {objFull["index"].map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            ) : (
                <div className="p-4 bg-light flex-grow-1 overflow-auto" style={infoStyle}>
                    <h5>Shelfmark</h5>
                    <p>{objFull["component_id"]}</p>
                    <br/>
                    <h5>Title</h5>
                    <p>{objFull["title"]}</p>
                    <br/>
                    <h5>Description</h5>
                    <p>{description.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}</p>
                    <br/>
                    <h5>Catalogue Entry</h5>
                    <p><a href={url} target="_blank">{url}</a></p>
                    <br/>
                    <h5>Repro Rights Statement</h5>
                    <p>University of Edinburgh</p>
                </div>
            )}
            {contentWarning && (
                <div className="p-2 flex-grow-1" style={{border: "2px solid black", backgroundColor: "#FBF5E4"}}>
                    <p className="mb-0">{objFull["warning"]}</p>
                </div>
            )}
        </>
    )
}


export default function Item() {
    const {id} = useParams();

    const [objFull, setObject] = useState([]);
    const [hasManifest, setHasManifest] = useState(undefined);

    // tidy up using Object.js caused issues so back to this
    useEffect(() => {
        fetchData("object/" + id).then(data => {
                let notes = data["notes"]
                data["index"] = false
                for (let i = 0; i < notes.length; i++) {
                    if (notes[i]["content"].includes("p.")) {
                        const formattedIndex = notes[i]["content"]
                            .replace(/<lb\/>/g, "<br/>")
                            .replace(/<lb><\/lb>/g, "<br/>")
                            .replace(/\n/g, '');
                        const lines = formattedIndex.split('<br/>');
                        data["index"] = lines
                    }
                    const content = notes[i]["content"];
                    const regex = /(The following table of content|This index is not|summary of the main elements|Summaries of pages|which was created using Transkribus)/;
                    if (regex.test(content)) {
                        data["index intro"] = content;
                    }
                    if (notes[i].hasOwnProperty("label") && notes[i]["label"] === "Content warning") {
                        data["warning"] = content.replace(/<emph render="underline">/g, "").replace(/<\/emph>/g, "")
                    }
                }
                setObject(data);
                setHasManifest(!!data["iiifmanifest"])

            }
        );
    }, []);


    const handleNavLinkClick = () => {
        let parts = id.split('-');
        let incrementedNumber = parseInt(parts[1]) + 1;
        window.location.href = "/collections/object/a1-" + incrementedNumber;
    };

    return (
        <div className="container-fluid bg-dark">
            <div className="row pb-2 mx-4">
                <button className="btn btn-info col col-md-2">
                    <NavLink className="nav-link" to="/collections/explore">Search</NavLink>
                </button>
                <button className="btn btn-info ms-4 col col-md-3">
                    <NavLink className="nav-link" onClick={handleNavLinkClick}>Next Notebook</NavLink>
                </button>
            </div>
            {hasManifest === true && objFull && <IiifItem objFull={objFull}/>}
            {hasManifest === false && objFull && <Sidebar objFull={objFull}/>}
        </div>
    )
}
