import React, { } from "react";
import AddPost from "../components/AddPost";
import PageTitle from "../components/PageTitle";

import PostCard from "../components/PostCard";
import PostMap from "../components/PostMap";

import { URL } from "../constants";
import useRequest from "../hooks/useRequest";

export default function MyPosts() {

    const {
        data: posts,
        error,
        loading,
        reload
    } = useRequest("/post/my");
    posts.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const {data, error: userError, loading: userLoading, reload: userReload} = useRequest("/user/profile");
    const user: any = data;



    if (posts.length >=0) {

        return (
            <div>

                <PageTitle  title="My Posts" />


                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                            <AddPost />

                            <PostMap posts={posts} user={user} reload={reload} />

                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (<></>)
}