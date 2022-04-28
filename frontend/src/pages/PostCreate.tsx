import React, { SyntheticEvent, useState } from "react";
import axios from "axios";

import { URL } from "../constants";

import "./Register.css";

export default function PostCreate() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const Submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        await axios.post(URL + "/post/create", {
            title: title,
            content: content,
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <main className="form-signin">
            <form onSubmit={Submit}>
                <h1 className="h3 mb-3 fw-normal">Create new post!</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="email" placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="email">Title</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="password" placeholder="Content"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <label htmlFor="password">Content</label>
                </div>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Create post</button>
            </form>
        </main>
    )
}