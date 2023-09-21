import React from "react";
import Top from "../components/Header"
import {useParams, useNavigate} from "react-router-dom";
import data from "../content/info.json"
import AltBox from "../components/TransparentBox";
import ExploreButton from "../components/ExploreButton"
import lyell_2 from "../images/lyell_landscape.jpg";
import offPrintImg from "../images/book_2.png";

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


function Content({image, data, head}) {
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
                    data={data.notebooks}
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
                    data={data.notebooks}
                    head={"Papers"}
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
                    data={data.notebooks}
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
                    data={data.notebooks}
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
                    data={data.overview}
                    head={"Overview"}
                />
            </div>
        )
    } else {

        navigate('/');
    }
}

export default Info;