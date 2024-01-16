import React from 'react';
import Top from "../components/Header";

function ElsewhereBox({content}) {
    return (
        <div className="row box bg-dark text-light p-3 mt-4 top-bar-gold">
            <div className="col-md-6">
                <div className="p-3" style={{height: '300px',}}>
                    <div className="header">
                        <h2>{content.header}</h2>
                    </div>
                    <div className="content">
                        <p>
                            {content.intro}
                        </p>
                    </div>
                    <div className="button">
                        <a href={content.link}><button className="btn btn-red btn-primary px-4 py-2">Go There</button></a>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="images">
                    <img
                        src="https://oumnh.ox.ac.uk/sites/default/files/oumnh/images/media/charles_lyell_gastropods.jpg"
                        alt="Image 1"
                        className="img-fluid"
                        style={{width: '50%'}}
                    />
                    <img
                        src="https://oumnh.ox.ac.uk/sites/default/files/oumnh/images/media/charles_lyell_mollusca_3.jpg"
                        alt="Image 2"
                        className="img-fluid"
                        style={{width: '50%'}}
                    />
                </div>
            </div>
        </div>
    );
};


export default function Elsewhere() {
    let allcontent = {
  "National Museum of Scotland": {
    "header": "National Museum of Scotland",
    "intro": "Lyell related collections held at the National Museum of Scotland include this intriguing table and this Calotype portrait from a calotype negative by David Octavius Hill and Robert Adamson, dated 1844 – 1848.",
    "link": ""
  },
  "National Museum of Wales": {
    "header": "National Museum of Wales",
    "intro": "The archives of the geology department of the National Museum of Wales hold letters dated 1831 -1854 from Lyell to Henry De la Beche (1796–1855). Summaries can be found in Sharpe, T. & McCartney, P.J., 1998, The Papers of H.T. De la Beche (1796–1855) in the National Museum of Wales. Geological Series No. 17, National Museum of Wales, Cardiff. ",
    "link": "https://museum.wales/curatorial/natural-sciences/archives/"
  },
        "Oxford University Museum of Natural History": {
    "header": "Oxford University Museum of Natural History",
    "intro": "The Charles Lyell fossils at Oxford University Museum of Natural History were donated by Charles’ nephew, Sir Leonard Lyell, in 1903 and 1907.  They comprise over 19,000 specimens, primarily Cenozoic molluscs from Europe and North America, and can be viewed online here.  The museum also holds four letters from Lyell to John Phillips, the Museum’s first Curator ",
            "link": "https://oumnh.ox.ac.uk/"
  },
        "Darwin Correspondence": {
    "header": "University of Cambridge: Darwin Correspondence Project and Epsilon  ",
    "intro": "Since its foundation in 1974, the Darwin Correspondence Project has gathered, deciphered, and researched over 15,000 letters, and provided the full texts of all known letters written both by and to Charles Darwin – including those between Charles Lyell. Ɛpsilon aims to continue the legacy of DCP, enabling new research opportunities by bringing correspondence data and transcriptions from multiple sources into a single cross-searchable digital platform.",
    "link": "https://www.darwinproject.ac.uk/"
  },
  "Sedgewick Museum of Earth Sciences": {
    "header": "University of Cambridge: Sedgewick Museum of Earth Sciences: Charles Lyell Collections  ",
    "intro": "The Sedgwick Museum of Earth Sciences is the oldest of the University of Cambridge museums, founded on the collection of Dr John Woodward (1665-1728) part of which was bequeathed to the University in 1728.",
    "link": "https://sedgwickmuseum.cam.ac.uk/"
  },
        "University of Oklahoma": {
    "header": "University of Oklahoma",
    "intro": "The University of Oklahoma History of Science Collections holds a small collection of original Lyell letters as well as a number of transcriptions of other Lyell letters and materials made by Martin Rudwick.",
    "link": "https://libraries.ou.edu/locations/history-science-collections"
  }
}
    return (
        <div style={{backgroundColor: "rgb(70,70,70)"}}>
            <Top
                title={"About Charles Lyell"}
                imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~83972~103414/full/!1300,1300/0/default.jpg"}
                size={{height: "300px"}}
            />
            <div className="bg-light container">
                <p className=" py-4 bold-text">Doing science in the nineteenth century, whether in the field,
                    the laboratory, or the library, was a collaborative affair. Like his contemporaries, Charles Lyell
                    exchanged ideas and collected things throughout his scientific life: information, geological specimens,
                    artefacts, and advice. The result of this network of ‘able investigators’ is that Lyell material is
                    held by different institutions in Britain and overseas.<br/><br/>
                    This section provides links to Lyell-related material held by institutions and learned societies other
                    than the University of Edinburgh. Please do <a href="https://www.ed.ac.uk/information-services/library-museum-gallery/heritage-collections">get in touch</a> if you wish to add material to this list. </p>

            </div>
            <div className="container pb-5">
                <ElsewhereBox
                    content={allcontent["National Museum of Scotland"]}
                />
                <ElsewhereBox
                    content={allcontent["National Museum of Wales"]}
                />
                <ElsewhereBox
                    content={allcontent["Oxford University Museum of Natural History"]}
                />
                <ElsewhereBox
                    content={allcontent["Darwin Correspondence"]}
                />
                <ElsewhereBox
                    content={allcontent["University of Oklahoma"]}
                />
                <ElsewhereBox
                    content={allcontent["Sedgewick Museum of Earth Sciences"]}
                />
            </div>

        </div>
    )
}
