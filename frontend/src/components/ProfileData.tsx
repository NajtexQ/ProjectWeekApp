import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

import { URL } from "../constants";

import "../styles/Profile.css";
import { AiOutlineLogout } from "react-icons/ai";

export default function ProfileData() {

    const { logout } = useGlobalContext();

    const [isLocked, setIsLocked] = useState(true);

    const { userData } = useGlobalContext();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const setUserStates = () => {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
    };

    const accountDelete = async () => {
        const res = await axios.delete(URL + "/user/" + userData.id, { withCredentials: true });

        if (res.status === 200) {
            logout();
        }
    };

    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isLocked) {
            setIsLocked(false);
        }

        else {

            const data = {
                firstName,
                lastName,
                email
            };

            const res = await axios.put(URL + "/user/" + userData.id, data, { withCredentials: true });

            if (res.status === 200) {
                setIsLocked(true);
            }
        }
    }

    const cancelSubmit = () => {
        setIsLocked(true);
        setUserStates();
    }

    useEffect(() => {
        setUserStates();

    }, [userData]);

    return (
        <div className="profile-box">
            <div className="profile-data-container">
                <div className="profile-data">
                    <form onSubmit={submitHandler}>
                        <div className="component">
                            <a className="label">First name:</a>
                            <input className="input" type="text" onChange={(e) => setFirstName(e.target.value)} disabled={isLocked} value={firstName} />
                        </div>
                        <div className="component">
                            <a className="label">Last name:</a>
                            <input className="input" type="text" onChange={(e) => setLastName(e.target.value)} disabled={isLocked} value={lastName} />
                        </div>
                        <div className="component">
                            <a className="label">Email:</a>
                            <input className="input" type="email" onChange={(e) => setEmail(e.target.value)} disabled={isLocked} value={email} />
                        </div>
                        <div className="button-container">
                            <button className="button" type="submit">{isLocked ? "Edit" : "Save"}</button>
                            {!isLocked && <button className="button" onClick={cancelSubmit}>Cancel</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="btn-container">
                <button className="delete-account-btn" onClick={accountDelete}>Delete account</button>
            </div>
        </div>
    );
}