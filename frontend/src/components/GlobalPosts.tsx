import React, { } from "react";

import PostCard from "./PostCard";
import PostMap from "./PostMap";

import { URL } from "../constants";
import useRequest from "../hooks/useRequest";

export default function GlobalPosts() {

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

                            <PostMap posts={posts} user={user} reload={reload} />

                        </div>
                    </div>
                </div>

            </main>
        )
    }

    return (<></>)
}