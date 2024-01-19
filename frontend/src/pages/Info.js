import React from "react";
import Top from "../components/Header"
import {useParams, useNavigate} from "react-router-dom";
import data from "../content/info.json"
import notebook from "../content/notebooks.json"
import papers from "../content/papers.json"
import specimens from "../content/specimens.json"
import AltBox from "../components/TransparentBox";
import ExploreButton from "../components/ExploreButton"
import lyell_2 from "../images/lyell_landscape.jpg";
import offPrintImg from "../images/book_2.png";
import textContent from "../content/books.json";

function InfoNav() {
    const {id} = useParams()
    return (
        <div className="row mb-4">
            {id !== "overview" ?
                <div className="col">
                    <AltBox
                        page={{
                            id: 5,
                            title: "overview",
                            image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~121185~458574/full/!500,500/0/default.jpg",
                        }}
                    /></div> : null}

            {id !== "notebooks" ?
                <div className="col">
                    <AltBox
                        page={{
                            id: 1,
                            title: "Notebooks",
                            image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~121185~458574/full/!500,500/0/default.jpg",
                        }}
                    /></div> : null}

            {id !== "specimens" ?
                <div className="col">
                    <AltBox
                        page={{
                            id: 2,
                            title: "Specimens",
                            image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84801~103462/full/!500,500/0/default.jpg",
                        }}
                    /></div> : null}

            {id !== "papers" ?
                <div className="col">
                    <AltBox
                        page={{
                            id: 3,
                            title: "Papers",
                            image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84062~103420/full/!500,500/0/default.jpg",
                        }}
                    /></div> : null}

            {id !== "off prints" ?
                <div className="col">
                    <AltBox
                        page={{
                            id: 4,
                            title: "Off Prints",
                            image: offPrintImg,
                        }}
                    />
                </div> : null}

        </div>
    )
}


function OldContent({image, data, head}) {
    return (
        <div>
            <div className="container">
                <div className="py-3 row justify-content-center">
                    <div className="col-12 col-lg-6" style={{maxWidth: "800px"}}>
                        <h1 className="mt-4 pb-3">{head}</h1>
                        {data.map((t, index) => (
                            <p key={index}>{t}</p>
                        ))}
                        <ExploreButton/>
                    </div>
                    <div className="col-12 col-lg-4 pt-5">
                        <img className="  ms-4" style={{height: "300px", width: "300px", objectFit: "cover"}}
                             src={image} alt="notebook cover"/>
                    </div>
                    <div className="col-12 col-lg-10">
                        <InfoNav/>
                    </div>
                </div>

            </div>
        </div>
    )
}


function Content({image, data, head, nav = false}) {
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
      <div className="container">
                <div className="py-3 row justify-content-center">
                    <div className="col-12 col-lg-6" style={{maxWidth: "800px"}}>
                        {nav && <div><h2>Papers – including correspondence, notes, lectures and manuscripts </h2>
                            <p>Lyell’s papers held at the University of Edinburgh comprise two main tranches - the original collection of material donated in 1927 by Lady Lyell of Kinnordy, and a second tranche accepted under the UK Government's 'Acceptance in Lieu of Inheritance Tax' scheme in 2020. The term ‘Papers’ is taken from the original deposit from the family to the University and serves as a description of several series of archival records, including correspondence to and from Lyell, and other records kept by his team for prosperity – some organised into folders by theme – that evidence his work and achievements. The physical arrangement reflects the order in which the material was received from Sotheby's. </p>
                        </div>}
                        {renderBigHeaders()}
                        <ExploreButton/>
                    </div>
                    <div className="col-12 col-lg-4 pt-5">
                        {nav &&
                            <ul>
                              {Object.entries(data).map(([bigHeader, subHeaders]) => (
                                <li className="m-1 mb-2" style={{ listStyleType: "none" }} key={bigHeader}>
                                  <span onClick={() => handleHeaderClick(bigHeader)} style={{ fontSize: "1.2em", color: "blue", cursor: "pointer" }}>{bigHeader}</span>
                                  {bigHeader !== "Papers arranged by theme, and miscellaneous" && (
                                    <ul>
                                      {Object.keys(subHeaders).map((subHeader) => {
                                        // Splitting the subheader by comma and taking the first part
                                        const subHeaderText = subHeader.split(',')[0].trim();
                                        subHeader = "sub_" + subHeader
                                        return (
                                          <li className="ml-2" style={{ listStyleType: "none" }} key={subHeader}>
                                            <span onClick={() => handleHeaderClick(subHeader)} style={{ fontSize: "1.2em", color: "blue", cursor: "pointer" }}>{subHeaderText}</span>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          }
                        <img className="ms-4" style={{height: "300px", width: "300px", objectFit: "cover"}}
                             src={image} alt="notebook cover"/>
                    </div>
                    <div className="col-12 col-lg-10">
                        <InfoNav/>
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
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~127573~468171/0,0,5693,6000/712,/0/default.jpg"}
                    size={{height: "200px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~88870~398194/full/400,/0/default.jpg"}
                    data={notebook}
                    head={"Notebooks"}
                />
            </div>
        )
    } else if (id === "papers") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~83972~103414/full/!1300,1300/0/default.jpg"}
                    size={{height: "200px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~83972~103414/full/!1300,1300/0/default.jpg"}
                    data={papers}
                    head={"Papers"}
                    nav={true}
                />
            </div>
        )
    } else if (id === "off prints") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    size={{height: "200px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    data={data}
                    head={"offprints"}
                />
            </div>
        )
    } else if (id === "specimens") {
        return (
            <div>
                <Top
                    title={""}
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~127573~468171/0,0,5693,6000/712,/0/default.jpg"}
                    size={{height: "200px"}}
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
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~127573~468171/0,0,5693,6000/712,/0/default.jpg"}
                    size={{height: "200px"}}
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