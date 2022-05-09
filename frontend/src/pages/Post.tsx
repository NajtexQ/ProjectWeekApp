import React from "react";
import { useParams } from "react-router-dom";

import PageTitle from "../components/PageTitle";

import useRequest from "../hooks/useRequest";

import { URL } from "../constants";

export default function Post() {

    let { id } = useParams();

    const { data } = useRequest("/post/" + id);

    const post: any = data;

    return (
        <div className="post-container">
            <PageTitle title={post.title} />
            <div>
                <img src={URL + "/post/image/" + post.image} className="post-image" alt={post.title} />
                <div className="post-content">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    )
}