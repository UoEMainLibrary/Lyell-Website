import React, {useEffect, useState} from "react";
import {NavLink, useParams, useNavigate, useLocation} from "react-router-dom";
import {UV} from "../components/UniversalViewer";
import {fetchData} from "../api/ApiCall";
import ItemNav from "../components/ItemNav";
import nextArrow from "../images/small_arrow.png"
import prevArrow from "../images/small_arrow-left.png"

function IiifItem({objFull}) {
    const {id} = useParams();
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('header'); // Adjust this selector according to your header's structure
        if (header) {
            setHeaderHeight(header.clientHeight);
        }
    }, []);

    const componentHeight = `calc(100vh - 70px)`;

    return (
        <div className="py-3 row">
            <div className="col-12 col-xl-9 p-0 d-flex flex-column">
                <NavigationButtons id={id} title={objFull["title"]}/>
                <div className="flex-grow-1" style={{backgroundColor: "black", height: "700px"}}>
                    <UV manifest={id}
                        parentWidth={"100"}/>
                </div>
            </div>
            <div className="col-12 col-xl-3 bg-dark p-0 parent-container d-flex flex-column"
                 style={{height: componentHeight}}>
                <Sidebar objFull={objFull}/>
            </div>
        </div>
    )

}

function PlainItem({objFull}) {
    const {id} = useParams();
    return (
        <div className="py-3 row">
            <NavigationButtons id={id} title={objFull["title"]}/>
            <Sidebar objFull={objFull}/>
        </div>
    )
}

function Sidebar({objFull}) {
    const location = useLocation();
    const [showIndex, setShowIndex] = useState(false);
    const [contentWarning, setContentWarning] = useState(false)
    useEffect(() => {
        setShowIndex(false);
    }, [location]);
    const handleIndexClick = () => {
        setShowIndex(true);
    };
    const handleInfoClick = () => {
        setShowIndex(false);
    };
    console.log(objFull)

    const infoStyle = {
        overflow: "scroll",
        overflowWrap: "break-word"
    }
    const buttonStyle = {
        border: "2px solid black",

    }
    let b = ""
    objFull["notes"].forEach((i) => {
        if (i["type"] === "scopecontent") {
            if (i["desc"] === "dis") {
                b = i["content"]
            }
        }
    });
    const description = b
        .replace(/<lb><\/lb>/g, "<br/>")
        .split('<br/>')

    const url = "https://archives.collections.ed.ac.uk" + objFull["uri"]
    let intro = false
    if (objFull["index intro"]) {
        if (objFull["index intro"].includes("When known, Lyell's abbreviations and contractions have been expanded") || objFull["index intro"].includes("indicates the misspelling of a word is deliberate") || objFull["index intro"].includes("Abbreviations have been expanded where possible")) {
            intro = true
        }
    }

    useEffect(() => {
        for (let i = 0; i < objFull["notes"].length; i++) {
            const dict = objFull["notes"][i];
            if (dict.hasOwnProperty("label") && dict["label"] === "Content warning") {
                setContentWarning(objFull["notes"][i]["content"].replace(/<emph render="underline">/g, "<b><u>").replace(/<\/emph>/g, "<\/b><\/u>"))
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
                                        <a href={url} target="_blank" rel="">
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
                    <h5>Title</h5>
                    <p>{objFull["title"]}</p>
                    {contentWarning && (
                        <div
                            style={{backgroundColor: "#FBF5E4"}}>
                            <p>{objFull["warning"]}</p>
                        </div>
                    )}
                    <h5>Dates</h5>
                    <p>{objFull["dates"]["expression"]}</p>
                    <br/>
                    <h5>Description</h5>
                    {description.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                    <br/>
                    <h5>Catalogue Entry</h5>
                    <p><a href={url} target="_blank">{url}</a></p>
                    <br/>
                    <h5>Shelfmark</h5>
                    <p>{objFull["component_id"]}</p>
                </div>
            )}
        </>
    )
}

function NavigationButtons({id, title}) {
    const navigate = useNavigate();
    const [sets, setSets] = useState(null);

    useEffect(() => {
        async function fetchDataAsync() {
            const data = await fetchData("index");
            setSets(data);
        }

        fetchDataAsync();
    }, []);

    async function getNextOrPrevValue(increase) {
        if (!sets) return null;
        const [prefix, numStr] = id.split('-');
        let num = parseInt(numStr, 10);
        const keys = Object.keys(sets).sort((a, b) => parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10));
        let currentIndex = keys.indexOf(prefix.toUpperCase());

        const increment = () => {
            if (num < sets[keys[currentIndex]]) {
                num++;
            } else {
                currentIndex = (currentIndex + 1) % keys.length;
                num = 1;
            }
            return `${keys[currentIndex]}-${num}`;
        };

        const decrement = () => {
            if (num > 1) {
                num--;
            } else {
                currentIndex = (currentIndex - 1 + keys.length) % keys.length;
                num = sets[keys[currentIndex]]; // Start from the end of the previous key's range
            }
            return `${keys[currentIndex]}-${num}`;
        };

        return increase ? increment() : decrement();
    }

    const handleNextClick = async () => {
        const next = await getNextOrPrevValue(true);
        if (next) {
            navigate("/collections/object/" + next);
        }
    };

    const handlePrevClick = async () => {
        const prev = await getNextOrPrevValue(false);
        if (prev) {
            navigate("/collections/object/" + prev);
        }
    };

    return (
        <div className="text-center fixed-height">
            <div
                className="text-light d-flex flex-column flex-md-row justify-content-between align-items-center custom-bg-color p-2">
                <h2 className="mb-3 mb-md-0">{title}</h2>
                <div className="d-flex flex-wrap">
                    <div className="btn mx-1 mx-lg-3 custom-btn mb-2 mb-md-0" onClick={handlePrevClick}>
                        <NavLink className="nav-link d-flex align-items-center" to="#">
                            <img src={prevArrow} alt="Previous" className="me-3" style={{width: "35px"}}/>
                            Previous
                        </NavLink>
                    </div>
                    <div className="btn mx-1 mx-lg-3 custom-btn mb-2 mb-md-0">
                        <NavLink className="nav-link" to="/collections/explore">Back to Search</NavLink>
                    </div>
                    <div className="btn mx-1 mx-lg-3 custom-btn mb-2 mb-md-0" onClick={handleNextClick}>
                        <NavLink className="nav-link d-flex align-items-center" to="#">
                            Next
                            <img src={nextArrow} alt="Next" className="ms-3" style={{width: "35px"}}/>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Item() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [objFull, setObject] = useState([]);
    const [hasManifest, setHasManifest] = useState(undefined);

    // tidy up using Object.js caused issues so back to this
    useEffect(() => {
        fetchData("object/" + id).then(data => {
                let notes = data["notes"]
                data["index"] = false
                for (let i = 0; i < notes.length; i++) {
                    if (notes[i]["desc"] === "index") {
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
    }, [id]);

    return (
        <div className="container-fluid bg-dark item-box">
            {hasManifest === true && objFull && <IiifItem objFull={objFull}/>}
            {hasManifest === false && objFull && <PlainItem objFull={objFull}/>}
        </div>
    )
}
