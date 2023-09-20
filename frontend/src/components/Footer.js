import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <footer className="py-5 bg-dark text-light mt-auto">
        <div className="container">
          <div className="row">
          <div className="col-md-4">
            <p>
              <img src="https://collections.ed.ac.uk/theme/stcecilia/images/UoETransparentWhite.png" alt="Logo" className="footer-logo" />
            </p>
            <p>University of Edinburgh</p>
          </div>
          <div className="col-md-3">
            <h4></h4>


            <div className="d-flex flex-column">
              <a href="#" className="text-light mb-2 text-decoration-none">Privacy & Cookies</a>
              <a href="#" className="text-light mb-2 text-decoration-none">Licensing & Copyright</a>
              <a href="#" className="text-light text-decoration-none">Accessibility</a>
            </div>
          </div>
          <div className="col-md-3">
            <h4>Resources</h4>
            <div className="d-flex flex-column">
              <a href="https://archives.collections.ed.ac.uk/agents/people/86" className="text-light mb-2 text-decoration-none">Collection in ArchivesSpace</a>
              <a href="#" className="text-light mb-2 text-decoration-none">Guide to seeing the collection in person</a>
              <a href="#" className="text-light text-decoration-none">Example link</a>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
}