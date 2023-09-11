import React, {useState} from "react";
import Top from "../components/Header"
import pr_ft from "../images/principles_front.png"
import el_bd from "../images/Elements_binding_light.jpg"
import textContent from "../content/books.json"
import links from "../content/booklinks.json"
import {Link} from "react-router-dom";


function BookInfo({textContent, image}) {
    console.log(textContent)
    return (
        <div>
            <div className="">
                <div className="about-box py-3">
                    <img className="about2-img float-end me-4" style={{width: "350px"}} src={image}
                         alt="notebook cover"/>
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
                <div>


                </div>
            </div>
        </div>
    )
}


function ToggleTable({data}) {
    const [selectedEdition, setSelectedEdition] = useState(null);

    const handleEditionClick = (edition) => {
        setSelectedEdition(edition);
    };
    console.log(data)

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
                <table>
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
                            <td>{item.Source}</td>
                            <td>
                                <a href={item.Link} target="_blank" rel="noopener noreferrer">
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
        "Principles of Geology": pr_ft,
        "Elements of Geology": el_bd
    }
    return (
        <div>
            <Top
                title={"Published works"}
                imageURL={el_bd}
                size={{height: "200px", text: "50px"}}
            />

            {Object.keys(textContent).map((bookName) => (
                <div className="my-5 container">
                    <BookInfo
                        textContent={textContent[bookName]}
                        image = {images[bookName]}
                    />

                    <ToggleTable
                        data={links[bookName]}
                    />
                </div>
                ))}


        </div>
    )
}

export default Books;