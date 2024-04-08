import React from 'react';
import {NavLink} from 'react-router-dom';

const MyNavbar = ({id, title}) => {
    // Function to handle wrapping around the id
    let parts = id.split('-');
    id = parseInt(parts[1])
    const handleWrapAround = (newId) => {
        if (newId < 1) return 10;
        if (newId > 10) return 1;
        return newId;
    }

    const prevId = handleWrapAround(id > 1 ? id - 1 : 10);
    const nextId = handleWrapAround(id < 10 ? id + 1 : 1);

    return (
        <nav className="px-3 navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#172b4d'}}>
            <h2><a className="navbar-brand" href="#home">Scientific {title}</a></h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/collections/explore">Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to={`/collections/object/a1-${prevId}`}>Prev</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to={`/collections/object/a1-/${nextId}`}>Next</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default MyNavbar;
