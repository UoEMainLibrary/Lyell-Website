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
                <p className="important-text lead py-3">Lyell’s <i>Principles of Geology</i>, planned since 1827 when he was aged 30 and published in 1830, was the culmination of his interests, education and travel. He would go on to dedicate his life to writing science and travel books.
                </p>
                <p>Charles Lyell lived, worked and published in an age distinguished by growing public interest in the sciences and by publishers keen to meet that interest. This was a period marked by the appearance of new scientific journals and literary periodicals, and by scientific societies. Publishers were keen to promote new ideas and theories, producing books in expensive quarto editions and in cheaper and more widely available octavo format, and they encouraged illustrations of different sorts to illuminate their texts. Lyell benefitted from and responded to these circumstances. He had a good working relationship in particular with the publisher John Murray who produced several editions of Lyell’s <i>Principles of Geology</i>, Lyell’s first and most influential book.</p>
                <p>This section presents a complete list of Lyell’s printed books published by John Murray, in chronological order, with links to initial and later editions online. For ease of reference, we have used an abbreviated version of his titles: </p>
                <ul className="bold-text mt-3" style={keyItemStyle}>
                        {Object.keys(textContent).map((bookName) => (
                            <li className="m-1 mb-2" key={bookName}>
                                <span onClick={() => handleKeyClick(bookName)}>{bookName}</span>
                            </li>
                        ))}
                    </ul>
                <p>Lyell’s writing process – edits, review, notes – features in a range of different formats throughout the Collection held at Edinburgh University – including Lyell’s own annotated copies of his publications, archival manuscripts, as well as detail recorded in the notebooks. Lyell’s lectures also document his writing techniques. See also: </p>
                <p>Annotated Published Works by Sir Charles Lyell, 1830-1874 <br/><a href="https://archives.collections.ed.ac.uk/repositories/2/archival_objects/199146">Annotated Published Works by Sir Charles Lyell, 1830-1874 | University of Edinburgh Archive and Manuscript Collections</a> </p>
                <p>Reviews of Published Works <br/><a href="https://archives.collections.ed.ac.uk/repositories/2/archival_objects/199225">Reviews of Published Works | University of Edinburgh Archive and Manuscript Collections </a> </p>
                <p>Lectures on Geology, 1832-1853<br/>
                    <a href="https://archives.collections.ed.ac.uk/repositories/2/archival_objects/21268">Lectures on Geology, 1832-1833 | University of Edinburgh Archive and Manuscript Collections </a><br/>
                    <a href="https://archives.collections.ed.ac.uk/repositories/2/archival_objects/199130">Lectures on Geology, 1842-1853 | University of Edinburgh Archive and Manuscript Collections </a> </p>

                <div>


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
