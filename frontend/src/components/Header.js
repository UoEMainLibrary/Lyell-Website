import React from 'react';

export default function Top({title, details, imageURL, size}) {
    const imageStyle = {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage:`url(${imageURL})`,
        height: size.height ? size.height : ""
    }

    let height = size.height ? 'py-5 bg-image set-img d-flex align-items-center' : 'py-5 bg-image set-img d-flex align-items-center image-fix'

    return (
      <div className={height} style={imageStyle}>
          <div className="mx-auto">
            <h1 className="text-center">{title}</h1>
            <p className="lead text-muted">{details}</p>
          </div>
      </div>
    );
}