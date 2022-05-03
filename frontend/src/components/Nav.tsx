import React, { useContext } from 'react';
import axios from 'axios';

import { URL } from '../constants';

import '../styles/Nav.css';

import { Link, useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalContext';

export default function Nav() {

    const { isLoggedIn, setIsLoggedIn, logout} = useGlobalContext();

    console.log("Current log:", isLoggedIn);

    const navigation = useNavigate();

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
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => {
                                        logout();
                                    }} >Logout</a>
                                </li>}
                    </ul>
                </div>
            </nav>
        </header>
    );

}