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
                size={{height: "200px", text: "50px"}}
            />
            <div className="container">
            <div className="pb-4 mb-4 ">
                <div className=" ">
                    <p className="pt-4 bold-text">The Charles Lyell Collection held by the University of Edinburgh
                        is one of the world’s most comprehensive collections on science in the nineteenth century, especially
                        geology. It comprises the tools Lyell developed and used to evidence and articulate his theories,
                        and to write his books. It is arranged according to its provenance. Here you can browse the collection
                        or learn more about it.  </p>
                </div>
                <ExploreButton/>
            </div>
            <div className=" py-auto mb-5">
                <div className="row center">
                    <HoverBox
                        info={{link: "/collections/about/overview", size: "small"}}
                        content={{
                            title: "Collection Overview",
                            detail: "",
                            image: shelf,
                            alt: "pencil drawing of Charles Lyell"
                        }}
                    />
                    <div className="col">
                        <div className="row justify-content-center g-1 g-lg-3">
                            <AltBox
                                page={{
                                    id: 1,
                                    title: "Notebooks",
                                    image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~121185~458574/full/!500,500/0/default.jpg",
                                    detail: "five series of Lyell’s original handwritten notebooks"
                                }}
                            />
                            <AltBox
                                page={{
                                    id: 2,
                                    title: "Specimens",
                                    image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84801~103462/full/!500,500/0/default.jpg",
                                    detail: "collected by Lyell to evidence his work"
                                }}
                            />
                        </div>
                        <div className="row justify-content-center g-1 g-lg-3 mt-2">
                            <AltBox
                                page={{
                                    id: 3,
                                    title: "Papers",
                                    image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~84062~103420/full/!500,500/0/default.jpg",
                                    detail: "including correspondence, notes, lectures and manuscripts"
                                }}
                            />
                            <AltBox
                                page={{
                                    id: 4,
                                    title: "Offprints",
                                    image: offPrintImg,
                                    detail: "articles and publications collected by Lyell"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
                </div>

        </div>
    )
}