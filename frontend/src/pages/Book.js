import React, {useState} from "react";
import Top from "../components/Header"
import pr_ft from "../images/principles_front.png"
import el_bd_l from "../images/Elements_binding_light.jpg"
import el_bd from "../images/Elements_binding.jpg"
import el_ft from "../images/Elements_front.jpg"
import textContent from "../content/books.json"
import links from "../content/booklinks.json"
import {Link} from "react-router-dom";


function BookInfo({textContent, image}) {
    return (
        <div className="row">
            <div className="col-12 col-lg-8 about-box py-3">
                <h3>{textContent.header}</h3><br/>
                <p dangerouslySetInnerHTML={{ __html: textContent.intro }}></p>
                {/*<p>Access to a digital first edition can be found at the Internet Archives here: <Link*/}
                {/*    to="https://archive.org/details/PrinciplesgeoloVol1Lyel/page/n13/mode/2up">https://archive.org/details/PrinciplesgeoloVol1Lyel/page/n13/mode/2up</Link>*/}
                {/*</p>*/}
                {/*<div>*/}
                {/*    {textContent["mainContent"].map((paragraph, index) => (*/}
                {/*        <p key={index}>{paragraph}</p>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
            <div className="row col col-lg-4">
                {image.map((img) => (
                    <img className="col col-sm-5 col-lg-12 mx-2 my-4" style={{maxWidth: "350px", height: "auto"}}
                         src={img}
                         alt="notebook cover"/>
                ))}

            </div>
        </div>
    )
}


function ToggleTable({data}) {
    const [selectedEdition, setSelectedEdition] = useState(Object.keys(data)[0]);

    const handleEditionClick = (edition) => {
        setSelectedEdition(edition);
    };

    return (
        <div className="">

            {Object.keys(data).map((edition) => (
                <button
                    key={edition}
                    onClick={() => handleEditionClick(edition)}
                    className={selectedEdition === edition ? 'btn bk-green m-1' : 'btn  btn-outline-secondary m-1'}
                >
                    {edition}
                </button>
            ))}


            {selectedEdition && (
                <table className="table mt-3" style={{maxWidth: "1000px"}}>
                    <thead>
                    <tr>
                        <th>Document</th>
                        <th>Source</th>
                        <th>Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data[selectedEdition].map((item, index) => (
                        <tr key={index}>
                            <td>{item.Document}</td>
                            <td style={{minWidth: "150px"}}>{item.Source}</td>
                            <td style={{wordWrap: "break-word", maxWidth: "300px"}}>
                                <a href={item.Link} style={{wordWrap: "break-word"}} target="_blank"
                                   rel="noopener noreferrer">
                                    {item.Link}
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}


function Books() {
    const images = {
        "Principles of Geology": ["https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~130438~471143/full/376,/0/default.jpg"],
        "Elements of Geology": ["https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~130437~471144/full/372,/0/default.jpg"],
        "American travelogues": [],
        "Antiquity of Man": [],
        "Life, Letters and Journals": []
    };


    const handleKeyClick = (bookName) => {
        // Scroll to the relevant section using a scroll function (scrollToSection)
        scrollToSection(bookName);
    };

    // Function to scroll to the relevant section
    const scrollToSection = (sectionName) => {
        const sectionElement = document.getElementById(sectionName);
        if (sectionElement) {
            sectionElement.scrollIntoView({behavior: 'smooth'});
        }
    };

    const keyItemStyle = {
        cursor: 'pointer', // Change cursor to pointer on hover
        marginLeft: "5%",
        textDecoration: "underline"
    };

    return (
        <div>
            <Top
                title={"Published books"}
                imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~130434~471147/full/1000,/0/default.jpg"}
                size={{height: "200px", text: "50px"}}
            />
            <div className="container" style={{maxWidth: "1000px"}}>
                <p className="important-text lead py-3"><em> Lyell’s Principles of Geology</em>, planned since 1827 when
                    he was aged 30 and published in 1830, was the culmination of his interests, education and travel. He
                    would go on to dedicate his life to writing education and travel books. </p>
                <p>A career in Geology would appear a natural progression from Lyell’s interest in natural history
                    study
                    as a boy – shared with his sisters, via his Classics degree at Oxford - where he also attended
                    Dr.
                    WIlliam Buckland’s lectures on mineralogy and geology, to his training as a Barrister in London.
                    Writing articles for the Quarterly Review gave Lyell the confidence that he could generate an
                    income
                    as an author – and geology would be his topic. </p>
                <p>The following section presents Lyell’s printed books in chronological order, with links to
                    versions
                    online. </p>
                <p className=" m-0">Special credit is due to Stephen A. Baldwin BSc (Open), PHC, FGS, FLS, FRI,
                    whose
                    comprehensive article Charles Lyell – a brief Bibliography (2013) details Lyell's literary
                    career. <br/>
                    Thanks also to Ms. Felicity MacKenzie, whose expertise has sourced digital versions to Lyell’s
                    works
                    online August 2023. </p>

                <div>
                    <ul className="bold-text mt-3" style={keyItemStyle}>
                        {Object.keys(textContent).map((bookName) => (
                            <li className="m-1 mb-2" key={bookName}>
                                <span onClick={() => handleKeyClick(bookName)}>{bookName}</span>
                            </li>
                        ))}
                    </ul>


                    {Object.keys(textContent).map((bookName) => (
                        <div className="my-5 top-bar-green" key={bookName} id={bookName}>
                            <BookInfo
                                textContent={textContent[bookName]}
                                image={images[bookName]}
                            />

                            {/* Assign an ID to each section based on bookName */}
                            <div>
                                <ToggleTable data={links[bookName]}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Books;
