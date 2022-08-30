import { Link } from "react-router-dom";

import React from 'react'

const Header = () => {
    return (
        <header className="w-100 d-flex flex-column justify-content-between align-items-center p-2">
            <h1 className="text-center">Redux Blog</h1>
            <nav className="w-100">
                <ul className="header-list w-100 d-flex justify-content-center align-items-center" style={{'gap': '50px'}}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='post'>Post</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header