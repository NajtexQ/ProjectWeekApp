import React, { useEffect, useState } from "react";

import "../App.css";

export default function Footer() {

    const [year, setYear] = useState("");

    // Get current year
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        setYear(currentYear.toString())
    }, [currentYear]);

    return (
        <footer className="text-muted py-5">
            <div className="container footer">
                <p className="footer-copyright">&copy; Copyright {year}</p>
                <p className="footer-author">Made with <span role="img" aria-label="heart">❤️</span> by Najtex</p>
            </div>
        </footer>
    )
}