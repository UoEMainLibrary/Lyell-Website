import React from 'react';
import {useParams} from "react-router-dom";
import AltBox from "./TransparentBox";
import offPrintImg from "../images/offprint.jpg";
import overviewImg from "../images/LyellNotebooks_Spines_213-232.jpg"

export default function InfoNav() {
    const {id} = useParams()
    return (
        <div className="collectionNav row mb-4">
            {id !== "overview" ?
                <div className="col">
                    <AltBox
                        page={{
                            id: 5,
                            title: "overview",
                            image: overviewImg,
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

            {id !== "offprints" ?
                <div className="col">
                    <AltBox
                        page={{
                            id: 4,
                            title: "OffPrints",
                            image: offPrintImg,
                        }}
                    />
                </div> : null}

        </div>
    )
}