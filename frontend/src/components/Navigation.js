import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { NavLink } from 'react-router-dom';
import next from '../images/next.png';
import logoSml from '../images/logo-stacked.svg';

const Navbar = () => {
    useEffect(() => {
        const handleHover = () => {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseover', () => {
                    dropdown.classList.add('show');
                    dropdown.querySelector('.dropdown-menu').classList.add('show');
                });
                dropdown.addEventListener('mouseout', () => {
                    dropdown.classList.remove('show');
                    dropdown.querySelector('.dropdown-menu').classList.remove('show');
                });
            });

            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location = toggle.href;
                });
            });
        };

        handleHover();

        return () => {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.removeEventListener('mouseover', handleHover);
                dropdown.removeEventListener('mouseout', handleHover);
            });

            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            dropdownToggles.forEach(toggle => {
                toggle.removeEventListener('click', handleHover);
            });
        };
    }, []);

    const dropdownStyle = {
        color: 'white',
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bold-text">
            <div className="container-fluid">
                <NavLink to="/">
                    <img
                        src={logoSml}
                        alt="Edinburgh uni Logo"
                        className="logo mx-md-3"
                    />
                </NavLink>

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

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/publications">
                                Publications
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink
                                className="nav-link dropdown-toggle text-light"
                                to="/collections"
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
                                    <NavLink className="dropdown-item" to="/collections/about/overview">
                                        Overview
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/collections/about/notebooks">
                                        Notebooks
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/collections/about/specimens">
                                        Specimens
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/collections/about/offprints">
                                        Offprints
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/collections/about/papers">
                                        Papers
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/elsewhere">
                                Lyell elsewhere
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/acknowledgements">
                                Acknowledgements
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="d-flex align-items-center text-center">
                    <NavLink className="navbar-text" style={{ textDecoration: "none" }} to="/">
                        Charles Lyell
                    </NavLink>
                    <NavLink to="/">
                        <img
                            style={{ height: '50px' }}
                            src={next}
                            alt="Logo"
                            className="logo mx-3"
                        />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
