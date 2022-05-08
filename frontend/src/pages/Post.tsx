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
        <div>
            <PageTitle title={post.title} />
            <div className="post-container">
                <img src={URL + "/post/image/" + post.image} className="post-image" alt={post.title} />
            </div>
        </div>
    )
}