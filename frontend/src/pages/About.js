import React from 'react';
import Top from "../components/Header";
import lyellImg from "../images/lyell_landscape.jpg";
import lyellImgp from "../images/lyell_4.jpg"
import kinnordy from "../images/Kinnordy.jpg";
import aboutText from "../content/about.json"

function Section({content, img, landscape}) {
    const imageStyle = {
        maxHeight: "500px",
        width: landscape ? "100%" : "auto"
    }

    return (
        <div className="my-5" style={{marginLeft: "10%"}}>

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
                    <p className="text-center important-text lead py-3">Learn more about Sir Charles Lyell and his work, from his travels to his findings
                    </p>

                    <Section
                        content={aboutT}
                        img={lyellImgp}
                    />
                    <div  className="my-5 text-center" style={{marginLeft: "10%", backgroundColor: "whitesmoke", padding: "10px", maxWidth: "900px"}}>
                        <p className="" style={{fontSize: "20px", fontWeight: "450"}}>The science of geology is enormously indebted to Lyell - more so, as I believe, than to any other man who ever lived. <br/>
                        </p>
                        <p>  - Charles DarwinFrancis Darwin, ed., The Life and Letters of Charles Darwin, (1887)   </p>
                    </div>
                    <Section
                        content={aboutH}
                        img={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEcar~4~4~46658~102417/full/1000,/0/default.jpg"}
                        landscape={true}
                    />
                    {/*<Section*/}
                    {/*    content={aboutH}*/}
                    {/*    img={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~119644~453885/full/!1000,1000/0/default.jpg"}*/}
                    {/*/>*/}

                </div>
            </div>
        </div>
    );
}