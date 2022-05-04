import React, { useState } from "react";
import axios from "axios";
import { URL } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

import PageTitle from "../components/PageTitle";
import ProfileData from "../components/ProfileData";

export default function Profile() {
    const { isLoggedIn, setIsLoggedIn, logout } = useGlobalContext();

    const navigation = useNavigate();

    return (
        <div>
            <PageTitle title="Profile" />
            <ProfileData />
        </div>
    );
}
