import React from "react";
import {Outlet} from "react-router-dom";

function Collections() {
    return (
        <div className="home">
            <Outlet/>
        </div>
    );
}

export default Collections;