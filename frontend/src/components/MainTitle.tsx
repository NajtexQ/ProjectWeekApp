import React from "react";
import { Link } from "react-router-dom";

export default function Title() {
    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Welcome to <strong>The Wall</strong></h1>
                    <p className="lead text-muted">The best way to share your thoughts.</p>
                    <p>
                    <Link to={"/createpost"} type="button" className="btn btn-primary my-2">Create post</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}