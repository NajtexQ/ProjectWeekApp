import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { URL } from "../constants";

import "./Register.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigate();

    const currentYear = new Date().getFullYear();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };
        console.log(data);

        const res = await axios.post(URL + "/auth/login", data, { withCredentials: true });

        console.log(res);

        if (res.status === 201) {
            navigation({
                pathname: "/"
            })
        }
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

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" />
                        Remember me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; {currentYear}</p>
            </form>
        </main>
    )
}