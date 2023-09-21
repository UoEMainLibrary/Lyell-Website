import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { NavLink } from 'react-router-dom';
import next from '../images/next.png';

const Navbar = () => {
  const dropdownStyle = {
    color: 'white',
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bold-text">
      <div className="container-fluid">
        <NavLink to="/">
        <img
          style={{ height: '50px' }}
          src={next}
          alt="Logo"
          className="logo mx-3"
        />
        </NavLink>
        <NavLink className="navbar-text" style={{textDecoration: "none"}} to="/">
          Charles Lyell
        </NavLink>

        {/* Toggle button for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/books">
                Books
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle text-light"
                to="/collection"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Collection
              </NavLink>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                style={dropdownStyle}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink className="dropdown-item" to="/collections">
                    Collections
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/collections/about/notebooks"
                  >
                    Notebooks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/collections/about/specimens"
                  >
                    Specimens
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/collections/about/off prints"
                  >
                    Off Prints
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/collections/about/papers"
                  >
                    Papers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/collections"
                  >
                    explore
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/elsewhere">
                Lyell elsewhere
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
