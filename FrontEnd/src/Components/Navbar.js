import React from 'react';
import { Link } from "react-router-dom"

const Navbar = () => {

    return(
        <header>
            <div className="navbarContainer">
                <Link to="/">
                    <h1>Bible Post</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar