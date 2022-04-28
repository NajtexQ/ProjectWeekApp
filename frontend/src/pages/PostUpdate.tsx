import React, { SyntheticEvent, useState, useEffect } from "react";
import { NavigationType, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { URL } from "../constants";

import "./Register.css";

export default function PostUpdate() {

    const navigation = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    let { id } = useParams();

    const Submit = async (e:SyntheticEvent) => {
        e.preventDefault();
        await axios.put(URL + "/post/"+id, {
            title: title,
            content: content,
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigation("/");
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getPost = async () => {
        const res = await axios.get(URL + "/post/" + id, { withCredentials: true });

        if (res.status === 200) {
            setTitle(res.data.title);
            setContent(res.data.content);
            setImage(res.data.image);

            console.log(res.data);
        }
        else {
            navigation({
                pathname: "/",
            })
        }
    }

    useEffect(() => {
        getPost();
    }, []);
        

    return (
        <main className="form-signin">
            <form onSubmit={Submit}>
                <h1 className="h3 mb-3 fw-normal">Update post!</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="email" placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="email">Title</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="password" placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <label htmlFor="password">Content</label>
                </div>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Update</button>
            </form>
        </main>
    )
}