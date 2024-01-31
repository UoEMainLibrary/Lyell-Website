import React, {useEffect, useState} from 'react';
import Top from "../components/Header";
import TextButton from "../components/TextButton"

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
        <div className="my-5" style={{marginLeft: "5%", marginRight:"5%"}}>

            <div className="row align-items-center top-bar-red pt-3">
                <div className={`col-lg-5 order-2 order-lg-2 pt-3`} >
                    <img src={img} alt="Image" className="" style={imageStyle}/>
                </div>
                <div className={`col-lg-7 order-1 order-lg-1`}>
                    <h2 className="pb-5 text-center">{content.head}</h2>
                    {content.body.map((paragraph, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                    ))}
                </div>
            </div>
        </div>
    );
};

function Biography({content, img}) {
    return(
        <div className="my-5" style={{marginLeft: "5%", marginRight:"5%"}}>
        <div className="row align-items-center top-bar-red pt-3">
            <div style={{textAlign: "justify"}}>
                <h2 className="pb-5 text-center">{content.head}</h2>
                <div>
                <img style={{float: "left", width: "100%", maxWidth:"500px"}}
                     className="m-3"
                    src={img}
                     alt="sketch of kirnnordy house"></img>
            </div>
                {content.body.map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
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
                    <p className="important-text lead py-3">Sir Charles Lyell (1797-1875) was a Scottish-born natural scientist whose geological work and publications prompted new and lasting understanding of the Earth’s history.
                    </p>

                    <Section
                        content={aboutT}
                        img={lyellImgp}
                    />
                    <Biography
                        content={aboutH}
                        img={kinnordys}
                    />
                    <div  style={{marginLeft: "5%", marginRight:"5%"}}  className="parallax"></div>
                    <div className="my-5" style={{marginLeft: "5%", marginRight:"5%"}}>
                        <TextButton/>
                        <p></p><p><a href="https://en.wikipedia.org/wiki/Charles_Lyell"  target="_blank">Charles Lyell - Wikipedia</a> </p>
                        <p>Portraits of <a href="https://www.npg.org.uk/collections/search/person/mp02832/sir-charles-lyell-1st-bt"  target="_blank">Charles</a> and <a href="https://www.npg.org.uk/collections/search/person/mp58565/mary-elizabeth-ne-horner-lady-lyell"  target="_blank">Mary</a> Lyell <a href="https://www.npg.org.uk/collections/search/person/mp02832/sir-charles-lyell-1st-bt"  target="_blank"> Sir Charles Lyell, 1st Bt - Person - National Portrait Gallery (npg.org.uk)</a> </p>
                        <p><a href="https://www.npg.org.uk/collections/search/person/mp58565/mary-elizabeth-ne-horner-lady-lyell"  target="_blank">Mary Elizabeth (née Horner), Lady Lyell - Person - National Portrait Gallery (npg.org.uk)</a> </p>
                    </div>
                </div>
            </div>
        </div>
    );
}