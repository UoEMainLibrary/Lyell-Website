import React from "react";
import {NavLink} from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <footer className="py-5 bg-dark text-light mt-auto">
        <div className="container">
          <div className="row">
          <div className="col-md-4">
            <p>
              <a href="https://www.ed.ac.uk/">
              <img src="https://collections.ed.ac.uk/theme/stcecilia/images/UoETransparentWhite.png" alt="Logo" className="footer-logo" />
              </a>
            </p>
            <p>Unless explicitly stated otherwise, all material is copyright © 2024 <a href="https://www.ed.ac.uk/">University of Edinburgh</a></p>
          </div>
          <div className="col-md-3">
            <h4></h4>


            <div className="d-flex flex-column pb-3 pb-md-0">
              <NavLink className="nav-link text-light" to="/">Home</NavLink>
              <NavLink className="nav-link text-light" to="/about">About</NavLink>
              <NavLink className="nav-link text-light" to="/publications">Publications</NavLink>
              <NavLink className="nav-link text-light" to="/collections">Collection</NavLink>
              <NavLink className="nav-link text-light" to="/elsewhere">Lyell elsewhere</NavLink>
              <NavLink className="nav-link text-light" to="/acknowledgements">Acknowledgements</NavLink>
            </div>
          </div>
          <div className="col-md-3">
            <h4>Resources</h4>
            <div className="d-flex flex-column">
              <a href="https://archives.collections.ed.ac.uk/agents/people/86" target="__blank" className="text-light text-decoration-none">Collection in ArchivesSpace</a>
              <a href="https://www.ed.ac.uk/about/website/privacy" target="__blank" className="text-light text-decoration-none">Privacy & Cookies</a>
              <a href="https://www.ed.ac.uk/information-services/library-museum-gallery/crc/services/copying-and-digitisation/image-licensing/takedown-policy" target="__blank" className="text-light text-decoration-none">Takedown Policy</a>
              <a href="https://library.ed.ac.uk/heritage-collections/using-the-collections/digitisation" target="__blank" className="text-light text-decoration-none">Licensing & Copyright</a>
              <NavLink className="nav-link text-light" to="/Accessibility">Accessibility</NavLink>
            </div>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
}