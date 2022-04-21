import React, { useState, useEffect } from "react";

import "../App.css";

import { URL } from "../constants";


export default function PostCard({title, content, image, firstName, lastName, createdAt}: {title: string; content: string; image: string, firstName: string; lastName: string; createdAt: Date}) {

    const MAX_LENGTH = 100;

    const [dateString, setDateString] = useState("");

    useEffect(() => {
        const date = new Date(createdAt);
        setDateString(date.toLocaleDateString());
    }, []);

    return (
        <div className="col">
            <div className="card shadow-sm">

                <img src={URL + "/post/image/" + image} className="card-img-top" alt="..." />

                <div className="card-body">
                    <p className="postcard-title">{title}</p>

                    {content.length > MAX_LENGTH 
                    ? 
                    <p className="card-text">{content.substring(0, MAX_LENGTH)}...</p> 
                    : 
                    <p className="card-text">{content}</p>}

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="postcard-timestamp">
                            {firstName + " " + lastName}
                            <br />
                            {dateString}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}