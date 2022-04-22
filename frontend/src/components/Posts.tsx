import React, { useEffect, useState } from "react";
import axios from "axios";

import PostCard from "./PostCard";

import { URL } from "../constants";

export default function Posts() {

    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        axios.get(URL + "/post/all", { withCredentials: true })
            .then(res => {

                if (res.data.length > 0) {
                    setPosts(res.data);
                }

                else {
                    setPosts([]);
                }
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (posts.length >=0) {

        return (
            <main>

                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                            {
                                posts.map((post) => {
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