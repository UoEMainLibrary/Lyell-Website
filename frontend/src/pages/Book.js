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
                <p>{textContent.intro}</p>
                <p>Access to a digital first edition can be found at the Internet Archives here: <Link
                    to="https://archive.org/details/PrinciplesgeoloVol1Lyel/page/n13/mode/2up">https://archive.org/details/PrinciplesgeoloVol1Lyel/page/n13/mode/2up</Link>
                </p>
                <br/><h5>{textContent.conclusion}</h5>
                <div>
                    {textContent["mainContent"].map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
            <div className="row col col-lg-4">
                {image.map((img) => (
                    <img className="col col-sm-5 col-lg-12 mx-2 my-4" style={{maxWidth: "350px", height: "auto"}} src={img}
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
        <div>
            <div>

                {Object.keys(data).map((edition) => (
                    <button
                        key={edition}
                        onClick={() => handleEditionClick(edition)}
                        className={selectedEdition === edition ? 'btn bk-green m-1' : 'btn  btn-outline-secondary m-1'}
                    >
                        {edition}
                    </button>
                ))}
            </div>

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
                                <a href={item.Link} style={{wordWrap: "break-word"}} target="_blank" rel="noopener noreferrer">
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
        "Principles of Geology": ["https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~130438~471143/full/376,/0/default.jpg", pr_ft],
        "Elements of Geology": ["https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~130437~471144/full/372,/0/default.jpg", el_ft],
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
        <div >
            <Top
                title={"Published works"}
                imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~130434~471147/full/1000,/0/default.jpg"}
                size={{height: "200px", text: "50px"}}
            />
            <div className="container">
            <p className="lead py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique.
                A pellentesque sit amet porttitor eget dolor. Pellentesque elit eget gravida cum sociis natoque penatibus.
                Sed pulvinar proin gravida hendrerit lectus a. Lorem ipsum dolor sit amet consectetur. </p>
            {/* Display a list of keys */}
            <ul className="bold-text" style={keyItemStyle}>
                {Object.keys(textContent).map((bookName) => (
                    <li className="m-1 mb-3" key={bookName} onClick={() => handleKeyClick(bookName)}>
                        {bookName}
                    </li>
                ))}
            </ul>
                <p className="text-center m-0">Information on the books taken from A brief Bibliography of Charles Lyell by Stuart Baldwin<br/>List of books with links compiled by Ms Felicity MacKenzie</p>

            {Object.keys(textContent).map((bookName) => (
                <div className="my-5 top-bar-green" key={bookName}  id={bookName}>
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
    );
}

export default Books;
