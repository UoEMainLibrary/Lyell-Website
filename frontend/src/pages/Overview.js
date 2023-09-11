import React from "react";
import {Link} from "react-router-dom";
import Top from "../components/Header";
import HoverBox from "../components/HoverBox"
import AltBox from "../components/TransparentBox";
import ExploreButton from "../components/ExploreButton";
import shelf from "../images/books on shelves.jpeg"
import offPrintImg from "../images/book_2.png"
import header from "../images/lightheader.jpg"

export default function Items() {
    return (
        <div className=" ">
            <Top
                title={"Collections"}
                imageURL={header}
                size={{height:"200px", text:"50px"}}
            />
            <div className="bg-light text-center container">
                <p className="text-center py-4 bold-text">The Sir Charles Lyells Collection held by the UOE is made up
                    of a numbers of constituent collections, brought together over a span of nearly 100 years, forming
                    one of the most comprehensive collections relating to nineteenth century science in the world.
                    Browse the collection or learn more about it. </p>

            </div>
            <ExploreButton/>
            <div className="container py-auto mb-5">
                <div className="row center">
                    <HoverBox
                        info={{link: "/about", size: "small"}}
                        content={{
                            title: "Collection Overview",
                            detail: "",
                            image: shelf,
                            alt: "pencil drawing of Charles Lyell"
                        }}
                    />
                    <div className="col m-auto">
                        <div className="row justify-content-center g-1 g-lg-3">
                            <AltBox
                                page={{
                                    id: 1,
                                    title: "Notebooks",
                                    image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~121185~458574/full/!500,500/0/default.jpg",
                                    detail: "The entire collection of scientific notebooks"
                                }}
                            />
                            <AltBox
                                page={{
                                    id: 2,
                                    title: "Specimens",
                                    image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84801~103462/full/!500,500/0/default.jpg",
                                    detail: "Discover how the collection came together"
                                }}
                            />
                        </div>
                        <div className="row justify-content-center g-1 g-lg-3 mt-2">
                            <AltBox
                                page={{
                                    id: 3,
                                    title: "Papers",
                                    image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84062~103420/full/!500,500/0/default.jpg",
                                    detail: "Discover how the collection came together"
                                }}
                            />
                            <AltBox
                                page={{
                                    id: 4,
                                    title: "Off Prints",
                                    image: offPrintImg,
                                    detail: ""
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}