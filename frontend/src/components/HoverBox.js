import React, { useState } from 'react';
import {Link} from 'react-router-dom'


export default function Boxes({info, content}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };

    const boxStyle = {
        backgroundColor: isHovered ? 'rgb(94, 94, 94)' : 'rgb(37, 37, 37)',
        transition: 'background-color 0.3s ease',
        cursor: isHovered ? 'pointer' : 'default',
        borderLeft: '5px solid goldenrod',
    };

    const imageContainerStyle = {
        overflow: 'hidden',
        height: '355px',
    };

    const imageStyle = {
        height: isHovered ? '620px' : '600px',
        objectFit: 'cover',
        transition: 'height 0.3s ease',
    };

    let height = info.size ? 'col-12 col-md-4' : 'col-12 col-md-6'

    return (
        <div className={height}>
            <Link to={info.link} style={{textDecoration: 'none'}}>
                <div
                    className="text-white"
                    style={boxStyle}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >
                    <div className="px-3 pt-3">
                        <h2>{content.title}</h2>
                        <p>{content.detail}</p>
                    </div>
                    <div style={imageContainerStyle}>
                        <img
                            className="card-img-bottom"
                            style={imageStyle}
                            src={content.image}
                            alt={content.alt}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
}