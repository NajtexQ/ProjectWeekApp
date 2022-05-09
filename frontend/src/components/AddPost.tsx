import React from "react";

import { FiPlusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AddPost() {
    return (
        <div className="add-post-container">
            <Link to="/createpost" style={{ width: "100%", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <FiPlusSquare className="add-post-icon" />
                <p className="add-post-text">Add Post</p>
            </Link>
        </div>
    )
}