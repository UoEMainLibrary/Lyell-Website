import react, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {UV} from "../components/UniversalViewer";
import {fetchData} from "../api/ApiCall";


function IiifItem({objFull}) {
    const {id} = useParams();
    const [showIndex, setShowIndex] = useState(false);

    const handleIndexClick = () => {
        setShowIndex(true);
    };
    const handleInfoClick = () => {
        setShowIndex(false);
    };

    const infoStyle = {
        height: "750px",
        overflow: "scroll",
        overflowWrap: "break-word"
    }

    return (
        <div className="py-3 bg-dark">
            <div className="row">
                <div className="col-12 col-lg-9 p-0">
                    <UV manifest={id}
                        parentWidth={"100"}/>
                </div>
                <div className="col-12 col-lg-3 bg-dark p-0">
                    <div style={{borderBottom: "4px solid black", height: "50px"}}>
                        <div href="/collections/explore" className="btn btn-info px-5 py-2 mx-2"
                             style={{border: "2px solid black"}} onClick={handleInfoClick}>Info
                        </div>
                        {objFull["index"] && (
                            <div href="/collections/explore" className="btn btn-info px-5 py-2 mx-2"
                                 style={{border: "2px solid black"}} onClick={handleIndexClick}>Index</div>
                        )}
                    </div>
                    {showIndex ? (
                        <div className="p-4 bg-light sideInfo" style={infoStyle}>
                            <h5>Index Section</h5>
                            {objFull["index"].map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 bg-light sideInfo" style={infoStyle}>
                            <h5>Shelfmark</h5>
                            <p>{objFull["component_id"]}</p>
                            <br/>
                            <h5>Title</h5>
                            <p>{objFull["title"]}</p>
                            <br/>
                            <h5>Description</h5>
                            <p>{objFull["notes"][0]["content"]}</p>
                            <br/>
                            <h5>Catalogue Entry</h5>
                            <p>https://archives.collections.ed.ac.uk{objFull["uri"]}</p>
                            <br/>
                            <h5>Repro Rights Statement</h5>
                            <p>University of Edinburgh</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )

}

function PlainItem({objFull}) {
    return (
        <div className="bg-dark">
            <div style={{borderBottom: "4px solid black", height: "55px"}}>
                <a href="/collections/explore" className="btn btn-labeled btn-info px-5 py-2 mt-2 mx-2"
                   style={{border: "2px solid black"}}>Info</a>
            </div>
            <div className="p-4 bg-light">
                <h5>Shelfmark</h5>
                <p>{objFull["component_id"]}</p>
                <br/>
                <h5>Title</h5>
                <p>{objFull["title"]}</p>
                <br/>
                <h5>Description</h5>
                <p> {objFull["notes"][0]["content"]}</p>
                <br/>
                <h5>Catalogue Entry</h5>
                <p>https://archives.collections.ed.ac.uk{objFull["uri"]}</p>
                <br/>
                <h5>Repro Rights Statement</h5>
                <p>University of Edinburgh</p>

            </div>

        </div>
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
                    if (notes[i]["content"].includes("</lb>") || notes[i]["content"].includes("<lb/>")) {
                        const formattedIndex = notes[i]["content"]
                            .replace(/<lb\/>/g, "<br/>")
                            .replace(/<lb><\/lb>/g, "<br/>")
                            .replace(/\n/g, '');
                        const lines = formattedIndex.split('<br/>');
                        data["index"] = lines
                    }
                }
                setObject(data);
                setHasManifest(!!data["iiifmanifest"])

            }
        );
    }, []);

    return (
        <>
            {hasManifest === true && objFull && <IiifItem objFull={objFull}/>}
            {hasManifest === false && objFull && <PlainItem objFull={objFull}/>}
        </>
    )
}
