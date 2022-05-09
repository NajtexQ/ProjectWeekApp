import React from "react";

import { useGlobalContext } from "../context/GlobalContext";
import PostCard from "./PostCard";

export default function PostMap(
    {
        posts,
        user,
        reload
    }: {
        posts: any;
        user: any;
        reload: () => void;
    }
) {
    return (
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
                    likes={post.likes ? post.likes : 0}
                    likedByMe={post.likedByUser ? post.likedByUser : false}
                    owner={owner}
                    reloadPosts={reload}
                />
            )
        }
        )
    )
    
}