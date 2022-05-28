import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SuccessfullVerify from "../components/account-verification/SuccessfullVerify";
import VerifyRequest from "../components/account-verification/VerifyRequest";
import PageTitle from "../components/PageTitle";
import { URL } from "../constants";
import { useGlobalContext } from "../context/GlobalContext";


export default function AccountVerification({ route }: { route: any }) {

    const { isLoggedIn } = useGlobalContext();

    const [successfullVerify, setSuccessfullVerify] = useState(false);

    const { uuid } = useParams();

    const navigate = useNavigate();


    const { verifyReq } = route.params;

    const verifyAccount = async () => {

        axios.get(`${URL}/auth/verify/${uuid}`)
            .then(res => {
                setSuccessfullVerify(true);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
            return;
        }

        if (uuid) {
            verifyAccount();
        }

        console.log(verifyReq);
    }, [])

    return (
        <div>
            {successfullVerify ? <SuccessfullVerify /> : <VerifyRequest />}
        </div>
    );
}