import React from "react";
import {Link} from "react-router-dom";
import Top from "../components/Header";
import HoverBox from "../components/HoverBox"
import lyell_2 from "../images/lyell_landscapeC.jpg"


export default function Home() {

    return (
        <div className="">
            <Top
                title={"Charles Lyell"}
                imageURL={lyell_2}
                size={{text:"70px"}}
            />
            <div className="container py-5 ">
                <p className="important-text lead py-3">This website facilitates access and research into the work of Scottish-born geologist Sir Charles Lyell (1797 - 1875) providing links to his printed books, the principal collection at the University of Edinburgh and Lyell related content elsewhere.
                </p>
            </div>
            <div className="album py-5 bg-dark">
                <div className="container">
                    <div className="row justify-content-center g-3 g-lg-5">
                        <HoverBox
                            info={{link: "/about"}}
                            content={{
                                title: "About Charles Lyell",
                                detail: "Learn more Charles Lyell, his work, travel and findings.",
                                image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~82507~103329/full/!1000,1000/0/default.jpg",
                                alt: "pencil drawing of Charles Lyell"
                            }}
                        />
                        <HoverBox
                            info={{link: "/collections"}}
                            content={{
                                title: "Notebooks, Manuscripts, Offprints and Specimens.",
                                detail: "Discover the collections held by the University of Edinburgh",
                                image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~85421~382687/full/!1000,1000/0/default.jpg",
                                alt: "archive shelf"
                            }}
                        />
                    </div>
                    <div className="row justify-content-center g-3 g-lg-5 mt-3">
                        <HoverBox
                            info={{link: "/Publications"}}
                            content={{
                                detail: "brief introduction to the books not sure what to put here",
                                image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~130439~471142/0,2000,6000,5000/750,/0/default.jpg",
                                alt: "Book Cover",
                                title: "Publications"
                            }}
                        />
                        <HoverBox
                            info={{link: "/elsewhere"}}
                            content={{
                                title: "Lyell elsewhere",
                                detail: "brief summary of items and location",
                                image: "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEcar~4~4~46658~102417/full/1000,/0/default.jpg",
                                alt: "Book Cover"
                            }}
                        />

                    </div>
                </div>
            </div>
            {/*<div className="txt-center py-5">*/}
            {/*    <h4>guide to the collection in person</h4>*/}
            {/*    <Link to='/collections/explore' className='btn-mobile'>*/}
            {/*        <button type="button" className="btn btn-red btn-labeled btn-info px-5 py-2 mt-3">*/}
            {/*            Library guide*/}
            {/*        </button>*/}
            {/*    </Link>*/}
            {/*</div>*/}
        </div>
    )
};
