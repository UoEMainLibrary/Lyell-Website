import React from "react";
import Top from "../components/Header"
import {useNavigate, useParams} from "react-router-dom"
import CollectionsNav from "../components/CollectionsNav"
import Sidebar from "../components/Sidebar";
import data from "../content/info.json"
import notebook from "../content/notebooks.json"
import papers from "../content/papers.json"
import specimens from "../content/specimens.json"
import offprints from "../content/offprints.json"

import notebookImg from "../images/105p89.jpg"
import specImg from "../images/CockburnSpec2largCrop.jpg"
import paperImg from "../images/Papers2best.jpg"
import offImg from "../images/offprints-image.png"
import overviewImg from "../images/PrinciplesGeologySpines.jpg"
import diagram from "../images/MicrosoftTeams-image.png"

function extractStartText(str) {
    if (str.endsWith("}") && str.startsWith("{") && str.includes(":")) {
        return str.split(":")[0].substr(1);
    }
    return str;
}


function Content({image, data, nav = false, col = false, nb = false}) {

    const renderParagraphs = (paragraphs) => {
        return paragraphs.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{__html: replaceLinks(paragraph)}}/>
        ));
    };

    const renderSubHeaders = (subHeaders) => {
        return Object.entries(subHeaders).map(([subHeader, paragraphs]) => {
            let headerId = extractStartText(subHeader)
            headerId = headerId.replace(/\s+/g, '_').split(',')[0].trim();
            return (
                <div key={subHeader} id={headerId}>
                    <h4 dangerouslySetInnerHTML={{__html: replaceLinks(subHeader)}}/>
                    {renderParagraphs(paragraphs)}
                </div>
            );
        });

    };

    const renderBigHeaders = () => {
        return Object.entries(data).map(([bigHeader, subHeaders]) => {
            const bigHeaderId = bigHeader.replace(/\s+/g, '_').split(',')[0].trim();

            return (
                <div key={bigHeader} id={bigHeaderId}>
                    <h2 className="mt-4 pb-3">{bigHeader}</h2>
                    {renderSubHeaders(subHeaders)}
                </div>
            );
        });
    };

    const replaceLinks = (text) => {
        return text.replace(
            /{([^']+):'([^']+)'}/g,
            (match, text, link) => `<a href="${link}" target="_blank">${text}</a>`
        );
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="row" style={{maxWidth: "1300px"}}>
                <div className="col-12 col-lg-1">

                </div>
                {nav ?
                    <div className="col-12 col-lg-3 order-lg-1">
                        {nb ?
                            <Sidebar
                                content={[
                                    {type: "button"},
                                    {header: "Page Content", content: {data}, type: "text-nav"},
                                    {header: "Collection Pages", type: "page-nav"}
                                ]}
                            /> : <Sidebar
                                content={[
                                    {header: "Page Content", content: {data}, type: "text-nav"},
                                    {header: "Collection Pages", type: "page-nav"}
                                ]}
                            />}
                    </div>
                    :
                    <div className="col-12 col-lg-3 order-lg-1">
                        {nb ?
                            <Sidebar
                                content={[
                                    {type: "button"},
                                    {header: "Collection Pages", type: "page-nav"}
                                ]}
                            /> : <Sidebar
                                content={[
                                    {header: "Collection Pages", type: "page-nav"}
                                ]}
                            />}
                    </div>
                }
                <div className="body-d col-12 col-lg-7 order-lg-0">
                    {col && <div className="mt-4"><h2>Papers, Correspondence, notes, lectures and manuscripts</h2>
                        <p>Lyell’s papers held at the University of Edinburgh comprise two main tranches - the original
                            collection of material donated in 1927 by Lady Lyell of Kinnordy, and a second tranche
                            accepted under the UK Government's 'Acceptance in Lieu of Inheritance Tax' scheme in 2020.
                            The term ‘Papers’ is taken from the original deposit from the family to the University and
                            serves as a description of several series of archival records, including correspondence to
                            and from Lyell, and other records kept by his team for prosperity – some organised into
                            folders by theme – that evidence his work and achievements. The physical arrangement
                            reflects the order in which the material was received from Sotheby's. </p>
                    </div>}
                    {renderBigHeaders()}
                </div>


                <div className="col-12 col-lg-12 order-lg-4">
                    <CollectionsNav/>
                </div>
            </div>

        </div>
    );
}


function Info() {
    const navigate = useNavigate();
    const {id} = useParams();

    if (id === "notebooks") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={notebookImg}
                    size={{height: "250px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~88870~398194/full/400,/0/default.jpg"}
                    data={notebook}
                    head={"Notebooks"}
                    nav={true}
                    id={"notebooks"}
                    nb={true}
                />
            </div>
        )
    } else if (id === "papers") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={paperImg}
                    size={{height: "250px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~83972~103414/full/!1300,1300/0/default.jpg"}
                    data={papers}
                    head={"Papers"}
                    nav={true}
                    col={true}
                    id={"papers"}
                />
            </div>
        )
    } else if (id === "offprints") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={offImg}
                    size={{height: "250px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    data={offprints}
                    head={"Offprints"}
                    id={"offprints"}
                />
            </div>
        )
    } else if (id === "specimens") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={specImg}
                    size={{height: "250px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84801~103462/full/717,/0/default.jpg"}
                    data={specimens}
                    head={"Specimens"}
                    id={"specimens"}
                />
            </div>
        )
    } else if (id === "overview") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={overviewImg}
                    size={{height: "250px"}}
                />
                <Content
                    image={diagram}
                    data={data}
                    head={"Overview"}
                    id={"overview"}
                    nb={true}
                />
            </div>
        )
    } else {

        navigate('/');
    }
}

export default Info;