import React from 'react';
import Top from "../components/Header";
import topImg from "../images/corr_1.jpg"

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
        <div>
            <Top
                title={"Lyell Collections Elsewhere "}
                imageURL={topImg}
                size={{height: "250px"}}
            />

            <div className="container" style={{maxWidth: "1000px"}}>
                <p>
                Doing science in the nineteenth century, whether in the field, the laboratory, or the library, was a collaborative affair. Like his contemporaries, Charles Lyell exchanged ideas and collected things throughout his scientific life: information, geological specimens, artefacts, and advice. The result of this network of &lsquo;able investigators&rsquo; is that Lyell material is held by different institutions in Britain and overseas. <br />
                This section provides links to Lyell-related material held by institutions and learned societies other than the University of Edinburgh. Please do <a href="https://www.ed.ac.uk/information-services/library-museum-gallery/heritage-collections">get in touch</a> if you wish to add material to this list. <br />
                 <br /></p>
                <h5><a href="https://www.amphilsoc.org/">American Philosophical Society</a></h5>
                 <br />
                <h5>Geological Society of London</h5>
                 <br />
                <h5>Natural History Museum, London</h5>
                 <br />
                <h5>National Library of Scotland</h5>
                 <br />
                <p>The National Library of Scotland holds the business archive of Charles Lyell's publisher John Murray. The John Murray Archive contains around 200 letters from Lyell as well as ledgers which chart the publication history of his works. <br />
                Details can be found on our online catalogue at: <a href="https://manuscripts.nls.uk/repositories/2/resources/17586">https://manuscripts.nls.uk/repositories/2/resources/17586</a><br />
                For more information on visiting the Library see our website: <a href="https://www.nls.uk/">https://www.nls.uk/</a><br />
                 <br />
                <h5><a href="https://www.nms.ac.uk/explore-our-collections/collection-search-results/">National Museum of Scotland</a></h5>
                Lyell related collections held at the National Museum of Scotland include this intriguing <a href="https://www.nms.ac.uk/explore-our-collections/collection-search-results/table/617153">table</a> and <a href="https://www.nms.ac.uk/explore-our-collections/collection-search-results/calotype/219950">Calotype portrait</a>this from a calotype negative by David Octavius Hill and Robert Adamson, dated 1844 &ndash; 1848. <br />
                 <br />
                <h5><a href="https://museum.wales/curatorial/natural-sciences/archives/">National Museum of Wales</a> </h5>
                The archives of the geology department of the National Museum of Wales hold letters dated 1831 -1854 from Lyell to Henry De la Beche (1796&ndash;1855). Summaries can be found in Sharpe, T. &amp; McCartney, P.J., 1998, The Papers of H.T. De la Beche (1796&ndash;1855) in the National Museum of Wales. Geological Series No. 17, National Museum of Wales, Cardiff. <br />
                 <br />
                 <br />
                <h5><a href="https://oumnh.ox.ac.uk/">Oxford University Museum of Natural History</a> </h5>
                 <br />
                The Charles Lyell fossils at Oxford University Museum of Natural History were donated by Charles&rsquo; nephew, Sir Leonard Lyell, in 1903 and 1907. They comprise over 19,000 specimens, primarily Cenozoic molluscs from Europe and North America, and can be <a href="https://oumnh.ox.ac.uk/collections-online#/item/oum-narrative-84123">viewed online here</a>. The museum also holds four letters from Lyell to John Phillips, the Museum&rsquo;s first Curator <br />
                 <br />
                <h5><a href="https://www.darwinproject.ac.uk/">University of Cambridge: Sedgewick Museum of Earth Sciences: Charles Lyell Collections</a> </h5>
                Since its foundation in 1974, the Darwin Correspondence Project has gathered, deciphered, and researched over 15,000 letters, and provided the full texts of all known letters written both by and to Charles Darwin &ndash; including those between Charles Lyell. &#400;psilon aims to continue the legacy of DCP, enabling new research opportunities by bringing correspondence data and transcriptions from multiple sources into a single cross-searchable digital platform. <br />
                 <br />
                <h5><a href="https://sedgwickmuseum.cam.ac.uk/">University of Cambridge: Darwin Correspondence Project and Epsilon</a></h5>
                The Sedgwick Museum of Earth Sciences is the oldest of the University of Cambridge museums, founded on the collection of Dr John Woodward (1665-1728) part of which was bequeathed to the University in 1728. <br />
                Objects donated by Sir Charles Lyell include: <br />
                &bull; Anthozoans, Bryozoans, Cirriped and Scaphopods from North America. <br />
                &bull; Bivalves, Brachiopods, Echninoids and Gastropods from Europe &amp; North America. <br />
                &bull; Bone (Bird), Insects preserved on thin mudstone slabs, and vertebrate teeth (shark) from Europe. <br />
                &bull; Chlorite and Quartz from Tasmania. <br />
                &bull; Geological hammer(s) <br />
                 <br />
                Archives related to Charles Lyell include: <br />
                &bull; Correspondence between Sir Charles and Lady Lyell to <a href="http://archiveshub.jisc.ac.uk/data/gb590-hghs">Thomas McKenny Hughes</a> whilst he was on geological survey in North Yorkshire, 1869-1874. Also including an invitation to Lyell&rsquo;s funeral &amp; image of the abbey gravestone. <br />
                &bull; Notebooks of Thomas McKenny Hughes when he was in South of France with Sir Charles and Lady Lyell, 1872-1873. <br />
                 <br />
                 <br />
                <h5><a href="https://www.lib.umn.edu/collections/special/uarchives">University of Minnesota</a></h5>
                 <br />
                The Leonard G. Wilson papers at the University of Minnesota Archives include Wilson's collected research in preparing his biographies of Sir Charles Lyell. The papers include copies of Lyell's notebooks (1825-1874), Lyell and family correspondence (1796-1875), and manuscripts of Wilson's writings on Lyell. To learn more about the Leonard Wilson papers, please visit <a href="https://eur02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.lib.umn.edu%2Fcollections%2Fspecial%2Fuarchives&data=05%7C02%7CPamela.McIntyre%40ed.ac.uk%7C326f9f84b4a7443b148108dc0e1b1e91%7C2e9f06b016694589878910a06934dc61%7C1%7C0%7C638400756855891733%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=wisvxw4zWxcaviQv%2FKSpblaal17Cp2PUBv2CAzPZETU%3D&reserved=0">https://www.lib.umn.edu/collections/special/uarchives.</a> <br />
                 <br />
                 <br />
                <h5><a href="https://libraries.ou.edu/locations/history-science-collections">University of Oklahoma</a></h5>
                The University of Oklahoma History of Science Collections holds a small collection of original Lyell letters as well as a number of transcriptions of other Lyell letters and materials made by Martin Rudwick. <br />
                </p>
            </div>

        </div>
    )
}
