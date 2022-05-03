import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import "../App.css";

import { URL } from "../constants";


export default function PostCard({ id, title, content, image, firstName, lastName, createdAt, owner, reloadPosts }: { id: number, title: string; content: string; image: string, firstName: string; lastName: string; createdAt: Date, owner: boolean, reloadPosts: any }) {

    const MAX_LENGTH = 250;

    const [dateString, setDateString] = useState("");

    useEffect(() => {
        const date = new Date(createdAt);
        setDateString(date.toLocaleDateString());
    }, []);

    const deletePost = () => {
        axios.delete(URL + "/post/" + id, { withCredentials: true })
            .then(res => {
                console.log(res);
                reloadPosts();
            })
            .catch(err => {
                console.log(err);
            });
    }

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
                            {
                                owner &&
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={deletePost}>Delete</button>
                            }
                            {
                                owner &&
                                <Link to={"/updatepost/" + id} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>
                            }
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