import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import "../App.css";

import { URL } from "../constants";


export default function PostCard({ id, title, content, image, firstName, lastName, createdAt, likes, likedByMe, owner, reloadPosts }: { id: number, title: string; content: string; image: string, firstName: string; lastName: string; createdAt: Date, likes: number, likedByMe: boolean, owner: boolean, reloadPosts: any }) {

    const MAX_LENGTH = 250;

    const [dateString, setDateString] = useState("");
    const [numberOfLikes, setNumberOfLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(likedByMe);

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

    const likePost = async () => {
        await axios.post(URL + "/like/add/" + id, {}, { withCredentials: true })
            .then(res => {
                console.log(res);
                setNumberOfLikes(numberOfLikes + 1);
                setIsLiked(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const unlikePost = async () => {
        await axios.delete(URL + "/like/delete/" + id, { withCredentials: true })
            .then(res => {
                console.log(res);
                setNumberOfLikes(numberOfLikes - 1);
                setIsLiked(false);
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
                        <p className="card-text">{content}</p>
                    }

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

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="like-group">

                            {
                                isLiked
                                    ?
                                    <AiFillLike className="filled-like" onClick={unlikePost} />
                                    :
                                    <AiOutlineLike className="empty-like" onClick={likePost} />
                            }

                            <p className="like-number">{numberOfLikes}</p>
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