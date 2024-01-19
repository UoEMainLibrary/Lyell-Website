import React from 'react';
import Top from "../components/Header";
import lyellImg from "../images/lyell_landscape.jpg";
import lyellImgp from "../images/lyell_4.jpg"
import kinnordy from "../images/Kinnordy-House.jpeg";
import kinnordys from "../images/Kinnordy.jpg";
import forfar from "../images/Forfarshire large map.jpeg";
import aboutText from "../content/about.json"

function Section({content, img, landscape}) {
    const imageStyle = {
        maxHeight: "500px",
        width: landscape ? "100%" : "auto"
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
            <div>
                <h2 className="pb-5 text-center">{content.head}</h2>
                {content.body.map((paragraph, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                ))}
            </div>
        </div>
            </div>
    )
}
const ImageGrid = () => {
  return (
    <div className="my-5" style={{marginLeft: "5%", marginRight:"5%"}}>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <img
            src={kinnordy}
            alt="Image 1"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <img
            src={forfar}
            alt="Image 2"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <img
            src={kinnordys}
            alt="Image 3"
            className="img-fluid rounded"
          />
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
                    <p className="important-text lead py-3">Sir Charles Lyell (1797-1875) was a Scottish-born natural scientist whose geological work and publications prompted new and lasting understanding of the Earth’s history.
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
                    <Biography
                        content={aboutH}
                        img={""}
                    />
                    <ImageGrid/>
                    <div className="my-5" style={{marginLeft: "5%", marginRight:"5%"}}>
                    <p>For a list of further references, please see Stephen Baldwin’s comprehensive bibliography
                        <br/><a href="https://en.wikipedia.org/wiki/Charles_Lyell">Charles Lyell - Wikipedia</a> </p>
                    <p>Portraits of <a href="https://www.npg.org.uk/collections/search/person/mp02832/sir-charles-lyell-1st-bt">Charles</a> and <a href="https://www.npg.org.uk/collections/search/person/mp58565/mary-elizabeth-ne-horner-lady-lyell">Mary</a> Lyell <a href="https://www.npg.org.uk/collections/search/person/mp02832/sir-charles-lyell-1st-bt"> Sir Charles Lyell, 1st Bt - Person - National Portrait Gallery (npg.org.uk)</a> </p>
                    <p><a href="https://www.npg.org.uk/collections/search/person/mp58565/mary-elizabeth-ne-horner-lady-lyell">Mary Elizabeth (née Horner), Lady Lyell - Person - National Portrait Gallery (npg.org.uk)</a> </p>
                    </div>
                </div>
            </div>
        </div>
    );
}