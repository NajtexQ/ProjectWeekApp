import React from "react";
import ReactDOM from "react-dom";

import PostCard from "./PostCard";

export default function Posts() {
    return (
        <main>

            <div className="album py-5 bg-light">
                <div className="container">

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                        <PostCard
                            title="My first tweet!"
                            content="Heheheheheheh"
                        />
                        
                    </div>
                </div>
            </div>

        </main>
    )
}