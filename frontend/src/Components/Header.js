import React from 'react';

export default function Top({title, details, imageURL, size}) {
    const imageStyle = {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage:`url(${imageURL})`,
        height: size.height ? size.height : "500px"
    }

    return (
      <div className="mb-3 py-5 bg-image set-img d-flex align-items-center" style={imageStyle}>
          <div className="mx-auto">
            <h1 style={{fontSize: size.text ? size.text : ""}}>{title}</h1>
            <p className="lead text-muted">{details}</p>
          </div>
      </div>
    );
}