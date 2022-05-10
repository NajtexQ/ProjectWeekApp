import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Modal from "@mui/material/Modal"

import { AiOutlineLike, AiFillLike, AiOutlineClose } from "react-icons/ai";

import "../App.css";
import "../styles/PostModal.css";

import { URL } from "../constants";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { width } from "@mui/system";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '60%',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    backgroundColor: '#fff',
};


export default function PostCard({ id, title, content, image, firstName, lastName, createdAt, likes, likedByMe, owner, reloadPosts }: { id: number, title: string; content: string; image: string, firstName: string; lastName: string; createdAt: Date, likes: number, likedByMe: boolean, owner: boolean, reloadPosts: any }) {

    const MAX_LENGTH = 250;

    const [dateString, setDateString] = useState("");
    const [numberOfLikes, setNumberOfLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(likedByMe);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ border: 'none', boxShadow: 'none', outline: 'none' }}>

                        <Box sx={style}>

                            <div className="modal-container">

                                <div className="modal-image-container">

                                    <img src={URL + "/post/image/" + image} alt="post-image" className="modal-image" />

                                </div>
                                <div className="modal-content-container">
                                    <div>
                                        <div className="modal-content-box">
                                            <h2 className="modal-title">{title}</h2>
                                            <p className="modal-content-text">{content}</p>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="modal-footer-left">
                                                {
                                                    isLiked
                                                        ?
                                                        <AiFillLike className="filled-like" onClick={unlikePost} />
                                                        :
                                                        <AiOutlineLike className="empty-like" onClick={likePost} />
                                                }
                                                <p className="like-number">{numberOfLikes}</p>
                                            </div>
                                            <div className="modal-footer-right">
                                                <p className="modal-footer-text">{firstName} {lastName}</p>
                                                <p className="modal-footer-text">{dateString}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>

                        <AiOutlineClose onClick={() => setIsModalOpen(false)} className="modal-close" />

                    </Box>

                </Modal>

                <Link to={"/post/" + id}>
                    <img src={URL + "/post/image/" + image} className="card-img-top" alt="..." />
                </Link>

                <div className="card-body">

                    <p className="postcard-title" onClick={() => setIsModalOpen(true)}>{title}</p>

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