import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import {NavLink} from "react-router-dom"; // Import Bootstrap JavaScript
import next from '../images/next.png'

const Navbar = () => {
  const dropdownStyle = {
    color: "white"
  };
  return (
    <nav className="navbar navbar-dark bg-dark bold-text">
      <div className="container-fluid">
        <div className="navbar-left ps-2">
          <img style={{height: "50px"}} src={next} alt="Logo" className="logo mx-3" />
          <NavLink className="navbar-text" to="/">Charles Lyell</NavLink>
        </div>
        <div className="navbar-right">
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/books">Books</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/elsewhere">Lyell elsewhere</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle text-light"
                href="/collection"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Collection
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-dark" style={dropdownStyle} aria-labelledby="navbarDropdown">
                <li><NavLink className="dropdown-item" to="/collections/explore">Browse</NavLink></li>
                <li><NavLink className="dropdown-item" to="/collections">About</NavLink></li>
                <li><NavLink className="dropdown-item" to="/collections/about/notebooks">Notebooks</NavLink></li>
                <li><NavLink className="dropdown-item" to="/collections/about/specimins">Specimins</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
