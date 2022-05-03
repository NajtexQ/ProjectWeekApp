import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../context/GlobalContext";

import { URL } from "../constants";

import "../styles/Register.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useGlobalContext();

    const navigation = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            email,
            password
        };

        await login(data);
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please log in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">Do not have an account yet? <Link to="/register">Register</Link></p>
            </form>
        </main>
    )
}