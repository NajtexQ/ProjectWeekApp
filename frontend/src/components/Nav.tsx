import React, { useContext, useState } from 'react';
import axios from 'axios';

import { URL } from '../constants';

import '../styles/Nav.css';

import { Link, useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalContext';

import { AiFillCaretDown } from 'react-icons/ai';

export default function Nav() {

    const { isLoggedIn, setIsLoggedIn, logout } = useGlobalContext();

    console.log("Current log:", isLoggedIn);

    const navigation = useNavigate();

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Posts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">About</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {
                            !isLoggedIn ?

                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </> :
                                <li className="nav-item relative">
                                    <a className="nav-link" onClick={() => {
                                        setShowProfileDropdown((prev) => !prev);
                                    }} >
                                        Profile 
                                        <AiFillCaretDown className="icon" />
                                    </a>
                                    {showProfileDropdown && <div className="dropdown">
                                        <div className="dropdown-content">
                                            <Link to="/profile">Profile</Link>
                                            <Link to="/settings">Settings</Link>
                                            <Link to="/logout" onClick={logout}>Logout</Link>
                                        </div>
                                    </div>}
                                </li>}
                    </ul>
                </div>
            </nav>
        </header>
    );

}