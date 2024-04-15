import React from 'react';
import Top from "../components/Header";
import topImg from "../images/corr_1.jpg"
import arrow from "../images/small_arrow.png"
import oxHisImg from "../images/LyellCollection.jpg"
import segImg from "../images/Sedgewick-montage.jpg"
import libScotImg from "../images/NationalLibScot-crop.jpg"
import minImg from "../images/Minnesota-WilsonNotebookcrop.png"


const HeaderWithArrow = ({text, link}) => {
    return (
        <div className="d-flex align-items-center hover-underline pb-3">
            <img
                src={arrow}
                alt="Arrow"
                style={{width: '40px', marginRight: '5px'}}
            />
            <h5 className="m-0">
                <a
                    href={link}
                    target="_blank"
                    className="text-dark"
                >
                    {text}
                </a>
            </h5>
        </div>
    );
};

function ElseSection({body, text, link, img, alt}) {
    return (
        <div className="box p-3 mt-4 top-bar-gold bg-light">
            <div style={{display: "flex", alignItems: "flex-start"}}>
                {/* Container for text */}
                <div style={{flex: 1}}>
                    <HeaderWithArrow text={text} link={link}/>
                    {body}
                </div>
                {img && (
                    <div style={{marginLeft: "20px"}}>
                        {/* Container for image */}
                        <img
                            style={{maxWidth: "200px", maxHeight: "200px"}}
                            className="my-3 mx-0"
                            src={img}
                            alt={alt}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}


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
                        <a href={content.link}>
                            <button className="btn btn-red btn-primary px-4 py-2">Go There</button>
                        </a>
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
    return (
        <div>
            <Top
                title={"Lyell Collections Elsewhere "}
                imageURL={topImg}
                size={{height: "250px"}}
            />

            <div className="container my-5" style={{maxWidth: "1000px"}}>
                <p>
                    Doing science in the nineteenth century, whether in the field, the laboratory, or the library, was a
                    collaborative affair. Like his contemporaries, Charles Lyell exchanged ideas and collected things
                    throughout his scientific life: information, geological specimens, artefacts, and advice. The result
                    of this network of &lsquo;able investigators&rsquo; is that Lyell material is held by different
                    institutions in Britain and overseas. <br/><br/>
                    This section provides links to Lyell-related material held by institutions and learned societies
                    other than the University of Edinburgh. Please do <a
                    href="https://www.ed.ac.uk/information-services/library-museum-gallery/heritage-collections"
                    target="_blank">get in
                    touch</a> if you wish to add material to this list. <br/>
                    <br/></p>
                <ElseSection
                    text="American Philosophical Society"
                    link="https://www.amphilsoc.org/"
                    body={
                        <p>
                            Researchers at the Library can study the <a
                            href="https://www.amphilsoc.org/history-science-collections" target="_blank">history of
                            science</a> sources held at APS from
                            astronomy to zoology, from genetics to quantum mechanics, from calculus to modern computing,
                            and including letters from <a
                            href="https://en.wikipedia.org/wiki/Charles_Darwin" target="_blank">Charles Darwin</a> (1809
                            – 1882) to Charles Lyell.
                        </p>
                    }
                />
                <ElseSection
                    text="Geological Society of London"
                    link="https://blog.geolsoc.org.uk/"
                    body={
                        <p>
                            Charles Lyell served as President of the Geological Society of London twice, from 1835 -
                            1837 and from 1849 – 1851; and as he was active within the Society so much and for so long,
                            Lyell material can be found in various series including

                            &bull; Forty-four letters from Lyell to Roderick Impey Murchison, 1825-1868:<br/>

                            &bull; Five letters from Lyell to Thomas George Bonney, 1872-1874:<br/>

                            &bull; Manuscript draft of Charles Lyell & Roderick Impey Murchison "On the Excavation of Valleys,
                            as illustrated by the Volcanic Rocks of Central France" [Aug 1828]:<br/>

                            &bull; Eleven portraits of Lyell, dating 1830s-1870s<br/>

                            &bull; Twenty-nine referee reports for other authors' papers submitted to be published in the
                            Society's journals, dating 1822-1841<br/>

                            &bull; Lyell's geological hammer:<br/>
                        </p>
                    }
                />
                <ElseSection
                    text="Natural History Museum, London"
                    link="https://blog.geolsoc.org.uk/"
                    body={
                        <p>
                            <a
                                href="https://data.nhm.ac.uk/dataset/?q=Lyell&sort=promoted+asc" target="_blank">The
                                Lyell Collection</a> at The Natural History Museum comprises gifts made by Lyell
                            himself,
                            his family and the Geological Society. It contains 1,735 specimens including fossils of
                            reptiles, mammals, fishes, plants, bryozoans, brachiopods, trilobites, echinoderms, worms
                            and molluscs, being the last ones the biggest part of the collection. These specimens
                            include the recent brachiopods that Charles Darwin collected from Tierra del Fuego or
                            Galapagos during his trip on board the Beagle and later given to Charles Lyell.
                        </p>
                    }
                />
                <ElseSection
                    text="National Library of Scotland"
                    link="https://www.nls.uk/"
                    img={libScotImg}
                    body={
                        <p>
                            The National Library of Scotland holds the business archive of Charles Lyell's publisher
                            John Murray. The John Murray Archive contains around 200 letters from Lyell as well as
                            ledgers which chart the publication history of his works.
                            <br/>
                            Details can be found on our online catalogue at: <a
                            href="https://manuscripts.nls.uk/repositories/2/resources/17586"
                            target="_blank">https://manuscripts.nls.uk/repositories/2/resources/17586</a>.
                            <br/>
                            For more information on visiting the Library see our website: <a
                            href="https://www.nls.uk/" target="_blank">https://www.nls.uk/</a>.
                        </p>
                    }
                />
                <ElseSection
                    text="National Museum of Scotland"
                    link="https://www.nms.ac.uk/explore-our-collections/collection-search-results/"
                    body={
                        <p>
                            Lyell related collections held at the National Museum of Scotland include this intriguing <a
                            href="https://www.nms.ac.uk/explore-our-collections/collection-search-results/table/617153"
                            target="_blank">table</a> and <a
                            href="https://www.nms.ac.uk/explore-our-collections/collection-search-results/calotype/219950"
                            target="_blank">Calotype
                            portrait</a> this from a calotype negative by David Octavius Hill and Robert Adamson, dated
                            1844 &ndash; 1848. <br/>
                        </p>
                    }
                />

                <ElseSection
                    text="National Museum of Wales"
                    link="https://museum.wales/curatorial/natural-sciences/archives/"
                    body={
                        <p>
                            The archives of the geology department of the National Museum of Wales hold letters dated
                            1831 -1854 from Lyell to <a href="https://museum.wales/curatorial/natural-sciences/archives/" target="_blank">Henry De la Beche (1796–1855)</a>. Summaries can be found in Sharpe, T.
                            & McCartney, P.J., 1998, The Papers of H.T. De la Beche (1796–1855) in the National Museum
                            of Wales. Geological Series No. 17, National Museum of Wales, Cardiff.
                        </p>
                    }
                />

                <ElseSection
                    text="Oxford University Museum of Natural History"
                    link="https://oumnh.ox.ac.uk/"
                    img={oxHisImg}
                    body={
                        <p>
                            The Charles Lyell fossils at Oxford University Museum of Natural History were donated by
                            Charles’ nephew, Sir Leonard Lyell, in 1903 and 1907. They comprise over 19,000 specimens,
                            primarily Cenozoic molluscs from Europe and North America, and can be viewed online <a
                            href="https://oumnh.ox.ac.uk/collections-online#/item/oum-narrative-84123"
                            target="_blank">here</a>. The
                            museum also holds four letters from Lyell to John Phillips, the Museum’s first Curator.
                        </p>
                    }
                />

                <ElseSection
                    text="University of Cambridge: Sedgewick Museum of Earth Sciences: Charles Lyell Collections"
                    link="https://www.darwinproject.ac.uk/"
                    img={segImg}
                    body={
                        <p>
                            The Sedgwick Museum of Earth Sciences is the oldest of the University of Cambridge museums,
                            founded
                            on the collection of Dr John Woodward (1665-1728) part of which was bequeathed to the
                            University in
                            1728. <br/>
                            Objects donated by Sir Charles Lyell include: <br/>
                            &bull; Anthozoans, Bryozoans, Cirriped and Scaphopods from North America. <br/>
                            &bull; Bivalves, Brachiopods, Echninoids and Gastropods from Europe &amp; North
                            America. <br/>
                            &bull; Bone (Bird), Insects preserved on thin mudstone slabs, and vertebrate teeth (shark)
                            from
                            Europe. <br/>
                            &bull; Chlorite and Quartz from Tasmania. <br/>
                            &bull; Geological hammer(s) <br/>
                            <br/>
                            Archives related to Charles Lyell include: <br/>
                            &bull; Correspondence between Sir Charles and Lady Lyell to <a
                            href="http://archiveshub.jisc.ac.uk/data/gb590-hghs" target="_blank">Thomas McKenny
                            Hughes</a> whilst he was
                            on
                            geological survey in North Yorkshire, 1869-1874. Also including an invitation to
                            Lyell&rsquo;s
                            funeral &amp; image of the abbey gravestone. <br/>
                            &bull; Notebooks of Thomas McKenny Hughes when he was in South of France with Sir Charles
                            and Lady
                            Lyell, 1872-1873
                        </p>
                    }
                />

                <ElseSection
                    text="University of Cambridge: Darwin Correspondence Project and Epsilon"
                    link="https://sedgwickmuseum.cam.ac.uk/"
                    body={
                        <p>
                            Since its foundation in 1974, the Darwin Correspondence Project has gathered, deciphered,
                            and researched over 15,000 letters, and provided the full texts of all known letters written
                            both by and to Charles Darwin – including those between Charles Lyell. Epsilon aims to
                            continue the legacy of DCP, enabling new research opportunities by bringing correspondence
                            data and transcriptions from multiple sources into a single cross-searchable digital
                            platform.
                        </p>
                    }
                />

                <ElseSection
                    text="University of Minnesota"
                    link="https://www.lib.umn.edu/collections/special/uarchives"
                    img={minImg}
                    body={
                        <p>
                            The Leonard G. Wilson papers at the University of Minnesota Archives include Wilson's
                            collected research in preparing his biographies of Sir Charles Lyell. The papers include
                            copies of Lyell's notebooks (1825-1874), Lyell and family correspondence (1796-1875), and
                            manuscripts of Wilson's writings on Lyell. To learn more about the Leonard Wilson papers,
                            please visit <a
                            href="https://eur02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.lib.umn.edu%2Fcollections%2Fspecial%2Fuarchives&data=05%7C02%7CPamela.McIntyre%40ed.ac.uk%7C326f9f84b4a7443b148108dc0e1b1e91%7C2e9f06b016694589878910a06934dc61%7C1%7C0%7C638400756855891733%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=wisvxw4zWxcaviQv%2FKSpblaal17Cp2PUBv2CAzPZETU%3D&reserved=0"
                            target="_blank">https://www.lib.umn.edu/collections/special/uarchives.</a>

                        </p>
                    }
                />

                <ElseSection
                    text="University of Oklahoma"
                    link="https://libraries.ou.edu/locations/history-science-collections"
                    body={
                        <p>
                            The University of Oklahoma History of Science Collections holds a small collection of
                            original Lyell letters as well as a number of transcriptions of other Lyell letters and
                            materials made by Martin Rudwick.
                        </p>
                    }
                />
            </div>

        </div>
    )
}
