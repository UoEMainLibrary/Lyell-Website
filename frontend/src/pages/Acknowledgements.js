import React from 'react';
import aboutText from "../content/about.json";
import Top from "../components/Header";
import lyellImgp from "../images/N48p12&13C.jpg";

export default function About() {
    const aboutT = aboutText.aboutmain
    const aboutH = aboutText.history
    return (
        <div>
            <Top
                title={"Acknowledgements"}
                imageURL={lyellImgp}
                size={{height: "250px"}}
            />

            <div className="container my-5" style={{maxWidth: "1000px"}}>
                <h1></h1>
                <p>The work undertaken on the Charles Lyell collections now housed with the University of Edinburgh’s Heritage Collections and available via this website, would not have been possible without the generosity and hard work of many people. The University of Edinburgh extends thanks to all the many donors and supporters who assisted financially in the campaign in 2019 to acquire the Lyell Notebooks for the nation and who helped support the Charles Lyell access project (2019 – 2024). We particularly acknowledge the support of: </p>
                <p>
                    <a href="https://nhmf.org.uk/" target="_blank">The National Heritage Memorial Fund </a> <br/><br/>
                    The Murray Family  <br/><br/>
                    <a href="https://www.fnl.org.uk/" target="_blank">Friends of the National Libraries  </a><br/><br/>
                    <a href="https://friendsofeul.wordpress.com/" target="_blank">The Friends of Edinburgh University Library </a><br/><br/>
                    <a href="https://www.sedimentologists.org/" target="_blank">The Institute of Sedimentologists  </a><br/><br/>
                </p>
                <p>
                    Thank you to all the volunteers – in particular Drew Coleman, Beverly Gordon, Ella Fornari, Caryl Dreiblatt and Bob Burrell – and those University of Edinburgh students who supported the transcription of the notebook indexes and added detail to the lists of correspondents.<br/><br/>
                    We acknowledge with particular thanks the expertise received from Professor James Secord, Felicity MacKenzie, and the late Stuart Baldwin (1930-2021). <br/><br/>
                    The work of the Heritage Collections team and others associated with the Charles Lyell access project has been guided by the Charles Lyell Advisory Board which continues to promote the Lyell collections:  <br/><br/>
                    Professor Emeritus Charles W. J. Withers (University of Edinburgh),<br/><br/>
                    Dr Rebekah Higgitt (National Museums Scotland),  <br/><br/>
                    Dr  Hermione Cockburn (Dynamic Earth),  <br/><br/>
                    Professor Emeritus Richard Fortey (Natural History Museum, London),  <br/><br/>
                    Professor Aileen Fyfe (University of St Andrews),  <br/><br/>
                    Professor Richard Herrington (Natural History Museum, London),  <br/><br/>
                    Dr Eliza Howlett (Oxford Museum of Natural History),  <br/><br/>
                    Professor Sandra Kemp (University of Lancaster),  <br/><br/>
                    Professor Ralph O'Connor (University of Aberdeen),  <br/><br/>
                    Professor Emeritus James A. Secord (University of Cambridge), Dr Anthony Loveland (Geological Society of London),  <br/><br/>
                    Professor John Underhill (University of Aberdeen),  <br/><br/>
                    Valerie-Ann Lutz (American Philosophical Society).
                </p>
            </div>
        </div>
    );
}