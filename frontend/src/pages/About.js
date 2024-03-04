import React, {useEffect, useState} from 'react';
import Top from "../components/Header";

import lyellImg from "../images/lyell_landscapeC.jpg";
import lyellImgp from "../images/lyell_4.jpg"
import kinnordys from "../images/Kinnordy House cropped.jpeg"
import aboutText from "../content/about.json"

function Section({content, img}) {
    const imageStyle = {
        maxHeight: "500px",
        maxWidth: "100%"
    }

    return (
        <div className="my-5" style={{marginLeft: "5%", marginRight: "5%"}}>

            <div className="row align-items-center top-bar-red pt-3">
                <div className={`col-lg-5 order-2 order-lg-2 pt-3`}>
                    <img src={img} alt="Image" className="" style={imageStyle}/>
                </div>
                <div className={`col-lg-7 order-1 order-lg-1`}>
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
        <div className="my-5" style={{marginLeft: "5%", marginRight: "5%"}}>
            <div className="row align-items-center top-bar-red pt-3">
                <div style={{textAlign: "justify"}}>
                    <h2 className="pb-5 text-center">{content.head}</h2>
                    <div>
                        <img style={{float: "left", width: "100%", maxWidth: "500px"}}
                             className="my-3 mx-0 mx-md-3"
                             src={img}
                             alt="sketch of kirnnordy house"></img>
                    </div>
                    {content.body.map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{__html: paragraph}}></p>
                    ))}
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
                    <div style={{marginLeft: "5%", marginRight: "5%"}} className="parallax"></div>
                </div>
            </div>
        </div>
    );
}