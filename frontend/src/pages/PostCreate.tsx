import React, { SyntheticEvent, useState } from "react";
import axios from "axios";

import { URL } from "../constants";

import "../styles/PostCreate.css";
import { useNavigate } from "react-router-dom";

const MAX_CONTENT_LENGTH = 1000;

export default function PostCreate() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File>();

    const navigate = useNavigate();

    const Submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image as any);

        const res = await axios.post(
            URL + "/post/create",
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

        if (res.status === 201) {
            navigate("/");
        }
    }

    console.log(title, content, image);

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
                    <textarea
                        className="form-control"
                        id="content"
                        placeholder="Content"
                        maxLength={MAX_CONTENT_LENGTH}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <label htmlFor="content">Content</label>
                </div>
                <div id="the-count">
                    <span id="current">{content.length}</span>
                    <span id="maximum">/ {MAX_CONTENT_LENGTH}</span>
                </div>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                        if (e.target.files) {
                            setImage(e.target.files[0]);
                        }
                    }}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Create post</button>
            </form>
        </main>
    )
}