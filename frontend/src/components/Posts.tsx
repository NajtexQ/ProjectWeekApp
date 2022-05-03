import React, { useEffect, useState } from "react";
import axios from "axios";

import PostCard from "./PostCard";

import { URL } from "../constants";
import useRequest from "../hooks/useRequest";

export default function Posts() {

    const {
        data: posts,
        error,
        loading,
        reload
    } = useRequest("/post/all");
    posts.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const {data, error: userError, loading: userLoading, reload: userReload} = useRequest("/user/profile");
    const user: any = data;



    if (posts.length >=0) {

        return (
            <main>

                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                            {
                                posts.map((post: any) => {
                                    let owner = false;
                                    if (user) {
                                        if (user && user.id === post.user.id) {
                                            owner = true;
                                        }
                                    }
                                    return (
                                        <PostCard
                                            key={post.id}
                                            id={post.id ? post.id : 0}
                                            title={post.title ? post.title : ""}
                                            content={post.content ? post.content : ""}
                                            image={post.image ? post.image : ""}
                                            firstName={post.user.firstName ? post.user.firstName : ""}
                                            lastName={post.user.lastName ? post.user.lastName : ""}
                                            createdAt={post.createdAt ? post.createdAt : ""}
                                            owner={owner}
                                            reloadPosts={reload}
                                        />
                                    )
                                }
                                )
                            }

                        </div>
                    </div>
                </div>

            </main>
        )
    }

    return (<></>)
}