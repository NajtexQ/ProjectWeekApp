import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SuccessfullVerify from "../components/account-verification/SuccessfullVerify";
import VerifyRequest from "../components/account-verification/VerifyRequest";
import PageTitle from "../components/PageTitle";
import { URL } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";


export default function AccountVerification() {

    const { isLoggedIn } = useGlobalContext();

    const [isVerified, setIsVerified] = useState(false);

    const { uuid } = useParams();

    const navigate = useNavigate();

    const verifyAccount = async () => {

        axios.get(`${URL}/auth/verify/${uuid}`)
            .then(res => {
                setIsVerified(true);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        if (!isLoggedIn) {
            {uuid && verifyAccount();}
            return;
        }
    }, [])

    return (
        <div>
            {isLoggedIn && <SuccessfullVerify />}
            {!isLoggedIn && uuid && <VerifyRequest />}
        </div>
    );
}