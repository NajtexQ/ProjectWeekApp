import React, { useState } from "react";
import axios from "axios";
import { URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

import PageTitle from "../components/PageTitle";

export default function Profile() {
    const { isLoggedIn, setIsLoggedIn, logout } = useGlobalContext();

    const navigation = useNavigate();

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    return (
        <>
            <PageTitle title="Profile" />
        </>
    );
}
