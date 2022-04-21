import React, { SyntheticEvent, useState } from "react";
import ReactDOM from "react-dom";

import "./Register.css";

export default function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const currentYear = new Date().getFullYear();

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm
        };
        console.log(data);
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="firstName" placeholder="First name"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="firstName">First name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="lastName" placeholder="Last name"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="lastName">Last name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Last name</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">Confirm password</label>
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