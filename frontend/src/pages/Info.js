import React from "react";
import Top from "../components/Header"
import {useParams, useNavigate } from "react-router-dom";
import data from "../content/info.json"
import ExploreButton from "../components/ExploreButton"
import lyell_2 from "../images/lyell_landscape.jpg";

function Content({image, data, head}){
    return (
        <div>
        <div className="container my-5">
            <div className="py-3 row">
                <div className="col">
                    <h2 className="text-center">{head}</h2>
                {data.map((t, index) => (
                    <p key={index}>{t}</p>
                ))}
                </div>
                <img className="col-12 col-lg-4 ms-4 mt-5" style={{height: "400px", width: "auto"}} src={image} alt="notebook cover"/>
            </div>
            <ExploreButton/>
        </div>
        </div>
    )
}


function Info() {
    const navigate = useNavigate();
    const { id } = useParams();
    if (id === "notebooks"){
        return(
            <div>
                <Top
                    title={""}
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~127589~468155/full/1052,/0/default.jpg"}
                    size={{height:"200px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~88870~398194/full/400,/0/default.jpg"}
                    data={data.notebooks}
                    head={"Notebooks"}
                />
            </div>
        )
    }
    else if (id ==="papers"){
        return(
            <div>
                <Top
                    title={""}
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    size={{height:"200px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    data={data.notebooks}
                    head={"Papers"}
                />
            </div>
        )
    }
    else if (id === "off prints"){
        return(
            <div>
                <Top
                    title={""}
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    size={{height:"200px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    data={data.notebooks}
                    head={"offprints"}
                />
            </div>
        )
    }
    else if (id === "specimens"){
        return(
            <div>
                <Top
                    title={""}
                    imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    size={{height:"200px"}}
                />
                <Content
                    image={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}
                    data={data.notebooks}
                    head={"Specimens"}
                />
            </div>
        )
    } else {

        navigate('/');
    }
}

export default Info;