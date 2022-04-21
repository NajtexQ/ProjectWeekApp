import React from "react";
import ReactDOM from "react-dom";


export default function PostCard({title, content}: {title: string; content: string}) {

    const MAX_LENGTH = 100;

    return (
        <div className="col">
            <div className="card shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

                <div className="card-body">
                    <p className="postcard-title">{title}</p>

                    {content.length > MAX_LENGTH 
                    ? 
                    <p className="card-text">{content.substring(0, MAX_LENGTH)}...</p> 
                    : 
                    <p className="card-text">{content}</p>}

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-muted">9 mins</small>
                    </div>
                </div>
            </div>
        </div>
    )
}