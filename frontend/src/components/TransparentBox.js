import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function AltBox({page, handleClick}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    const boxStyle = {
        position: 'relative',
        backgroundColor: isHovered ? 'rgb(94, 94, 94)' : 'transparent',
        transition: 'background-color 0.3s ease',
        cursor: isHovered ? 'pointer' : 'default',
    };

    const imageContainerStyle = {
        borderLeft: isHovered ? '5px solid goldenrod' : '5px solid black',
        position: 'relative',
        overflow: 'hidden',
        height: '200px',
    };

    const imageStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: isHovered ? '420px' : '400px',
        width: '100%',
        objectFit: 'cover',
        transition: 'height 0.3s ease',
    };

    const overlayStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const textStyle = {
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
    };
    const link = "/collections/about/" + page.title.toLowerCase()
    return (
        <div className="col mt-0">
            <Link to={link}>
                <div
                    className="text-white"
                    style={boxStyle}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >
                    <div style={imageContainerStyle}>
                        <img
                            className="card-img-bottom"
                            style={imageStyle}
                            src={page.image}
                        />
                        <div style={overlayStyle}>
                            <div style={textStyle}>
                                <h2>{page.title}</h2>
                                <p>{page.detail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}