import React from "react";
import bio from "../content/A Brief Bibliography of Charles Lyell.pdf";

export default function PDFdownload() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = "https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~120547~457518/full/!96,96/0/default.jpg";
        link.download = 'https://images.is.ed.ac.uk/luna/servlet/iiif/UoEsha~5~5~120547~457518/full/!96,96/0/default.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
  return (
      <button onClick={handleDownload}> download </button>
  )
}