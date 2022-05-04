import React from "react";

export default function PageTitle({ title }: { title: string }) {
    return (
        <div className="page-title">
            <h1>{title}</h1>
        </div>
    );
}