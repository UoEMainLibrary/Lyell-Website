import React from 'react';
import Top from "../components/Header";

const ElsewhereBox = () => {
    return (
        <div className="row box bg-dark text-light p-3 mt-4 top-bar-gold">
            <div className="col-md-6">
                <div className="p-3" style={{height: '300px',}}>
                    <div className="header">
                        <h2>Header</h2>
                    </div>
                    <div className="content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                            vel risus id odio auctor convallis a ut purus.
                        </p>
                        <p>
                            Fusce vehicula vestibulum lacus, eu laoreet libero tincidunt
                            a.
                        </p>
                    </div>
                    <div className="button">
                        <button className="btn btn-primary">Go There</button>
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
        <div style={{backgroundColor: "rgb(70,70,70)"}}>
            <Top
                title={"About Charles Lyell"}
                imageURL={"https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~121185~458574/full/!500,500/0/default.jpg"}
                size={{height: "300px"}}
            />
            <div className="container pb-5">
                <ElsewhereBox/>
                <ElsewhereBox/>
                <ElsewhereBox/> 
            </div>

        </div>
    )
}
