import React, {useEffect, useState} from 'react';
import Top from "../components/Header";

import lyellImg from "../images/lyell_landscapeC.jpg";
import lyellImgp from "../images/lyell_4.jpg"
import kinnordys from "../images/Kinnordy House cropped.jpeg"
import aboutText from "../content/about.json"

function Section({content, img}) {
    const imageStyle = {
        maxWidth: "100%"
    }

    return (
        <div className="my-5">

            <div className="row align-items-center top-bar-red pt-3">
                <div className={`col-lg-3 col-md-4 order-2 order-md-1 pt-3`}>
                    <img src={img} alt="Image" className="" style={imageStyle}/>
                    <figcaption>Charles Lyell Collection, University of Edinburgh Heritage Collections reference
                        Coll-203/B21/2
                    </figcaption>
                </div>
                <div className={`col order-1 order-md-2`}>
                    <h2 className="pb-5 text-center">{content.head}</h2>
                    {content.body.map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{__html: paragraph}}></p>
                    ))}
                </div>
            </div>
        </div>
    );
};

function Biography({content, img}) {
    return (
        <div className="my-5">
            <div className="row align-items-center top-bar-red pt-3">
                <div>
                    <div style={{overflow: "auto"}}>
                        <div className="mb-3 ms-lg-3" style={{float: "right"}}>
                            <img style={{width: "100%", maxWidth: "500px"}}
                                 className="mt-3 mx-0 "
                                 src={img}
                                 alt="sketch of kirnnordy house"></img>
                            <figcaption style={{maxWidth: "500px", border: "1px solid rgba(0, 0, 0, 0.1)", padding: "5px 5px"}}>Kinnordy House, Forfarshire, the birthplace of
                                Charles Lyell as illustrated in Life, Letters and Journals of Sir Charles Lyell, Bart,
                                edited by his sister-in-law, Mrs. Katherine Lyell (London: John Murray, 1881). Heritage
                                Collections, Edinburgh University reference SD 6162
                            </figcaption>
                    </div>
                        <div>
                            <h2 className="pb-2">{content.head}</h2>
                            {content.body.map((paragraph, index) => (
                                <p key={index} dangerouslySetInnerHTML={{__html: paragraph}}></p>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


export default function About() {
    const aboutT = aboutText.aboutmain
    const aboutH = aboutText.history
    return (
        <div>
            <Top
                title={"About Charles Lyell"}
                imageURL={lyellImg}
                size={{height: "300px"}}
            />

            <div className="my-5">
                <div className="container py-4">
                    <p className="important-text lead py-3">Sir Charles Lyell (1797-1875) was a Scottish-born natural
                        scientist whose geological work and publications prompted new and lasting understanding of the
                        Earth’s history.
                    </p>

                    <Section
                        content={aboutT}
                        img={lyellImgp}
                    />
                    <Biography
                        content={aboutH}
                        img={kinnordys}
                    />
                    <div className="parallax"></div>
                    <figcaption>Large-scale map of Kirriemuir, Angus, Scotland, with hand-coloured geological strata.
                    </figcaption>
                </div>
            </div>
        </div>
    );
}