import React, { useEffect, useState } from "react";
import axios from "axios";

import PostCard from "./PostCard";

import { URL } from "../constants";

export default function Posts() {

    const [posts, setPosts] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    const getUser = async () => {
        const res = await axios.get(URL + "/user/profile", { withCredentials: true })

        if (res.status === 200) {
            setUser(res.data);
            console.log(res.data);
        }
    }

    useEffect(() => {
        axios.get(URL + "/post/all", { withCredentials: true })
            .then(res => {

                if (res.data.length > 0) {
                    // Sort posts by date
                    res.data.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    });
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

        getUser();
    }, []);

    if (posts.length >=0) {

        return (
            <main>

                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                            {
                                posts.map((post) => {
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