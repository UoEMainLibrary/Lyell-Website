import React from "react";
import Top from "../components/Header"
import {useParams, useNavigate} from "react-router-dom";
import ExploreButton from "../components/ExploreButton"
import CollectionsNav from "../components/CollectionsNav"
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





function Content({image, data, head, nav = false, col= false}) {
  const renderParagraphs = (paragraphs) => {
    return paragraphs.map((paragraph, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: replaceLinks(paragraph) }} />
    ));
  };

  const renderSubHeaders = (subHeaders) => {
    return Object.entries(subHeaders).map(([subHeader, paragraphs]) => {
        const headerId = subHeader.replace(/\s+/g, '_');
        const subHeaderId = "sub_" + headerId
        return (
            <div key={subHeader} id={subHeaderId}>
                <h4>{subHeader}</h4>
                {renderParagraphs(paragraphs)}
            </div>
        );
    });

  };

  const renderBigHeaders = () => {
      return Object.entries(data).map(([bigHeader, subHeaders]) => {
        const bigHeaderId = bigHeader.replace(/\s+/g, '_');

        return (
          <div key={bigHeader} id={bigHeaderId}>
            <h2 className="mt-4 pb-3">{bigHeader}</h2>
            {renderSubHeaders(subHeaders)}
          </div>
        );
      });
    };

  const replaceLinks = (text) => {
    // Replace {text:'link'} with a working <a> tag
    return text.replace(
      /{([^']+):'([^']+)'}/g,
      (match, text, link) => `<a href="${link}">${text}</a>`
    );
  };

  const handleHeaderClick = (header) => {
        // Scroll to the relevant section using a scroll function (scrollToSection)
      const headerId = header.replace(/\s+/g, '_')
        scrollToSection(headerId);
    };

    // Function to scroll to the relevant section
    const scrollToSection = (sectionName) => {
        const sectionElement = document.getElementById(sectionName);
        if (sectionElement) {
            sectionElement.scrollIntoView({behavior: 'smooth'});
        }
    };

  return (
      <div className="container d-flex justify-content-center">
                <div className="row"  style={{maxWidth: "1300px"}}>
                    <div className="col-12 col-lg-1 pt-5">

                    </div>
                    {nav &&
                        <div className="col-12 col-lg-3  order-lg-1 sidebar">

                            <ul className="pl-3 pt-1">
                                {Object.entries(data).map(([bigHeader, subHeaders]) => (

                                    <li className="m-1 mb-2" style={{listStyleType: "none"}} key={bigHeader}>
                                        <span onClick={() => handleHeaderClick(bigHeader)} style={{
                                            color: "blue",
                                            cursor: "pointer"
                                        }}>{bigHeader.split(',')[0].trim()}</span>
                                        {bigHeader !== "Papers arranged by theme, and miscellaneous" && (
                                            <ul>
                                                {Object.keys(subHeaders).map((subHeader) => {
                                                    // Splitting the subheader by comma and taking the first part
                                                    const subHeaderText = subHeader.split(',')[0].trim();
                                                    subHeader = "sub_" + subHeader
                                                    return (
                                                        <li className="ml-2" style={{listStyleType: "none"}}
                                                            key={subHeader}>
                                                            <span onClick={() => handleHeaderClick(subHeader)} style={{
                                                                color: "blue",
                                                                cursor: "pointer"
                                                            }}>{subHeaderText}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {!col && <ExploreButton/>}
                        </div>
                    }
                    {!nav &&
                        <div className="col-12 col-lg-3  order-lg-1"></div>}
                    <div className="col-12 col-lg-7 order-lg-0">
                        {col && <div><h2>Papers – including correspondence, notes, lectures and manuscripts </h2>
                            <p>Lyell’s papers held at the University of Edinburgh comprise two main tranches - the original collection of material donated in 1927 by Lady Lyell of Kinnordy, and a second tranche accepted under the UK Government's 'Acceptance in Lieu of Inheritance Tax' scheme in 2020. The term ‘Papers’ is taken from the original deposit from the family to the University and serves as a description of several series of archival records, including correspondence to and from Lyell, and other records kept by his team for prosperity – some organised into folders by theme – that evidence his work and achievements. The physical arrangement reflects the order in which the material was received from Sotheby's. </p>
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
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84801~103462/full/717,/0/default.jpg"}
                    data={data}
                    head={"Overview"}
                />
            </div>
        )
    } else {

        navigate('/');
    }
}

export default Info;