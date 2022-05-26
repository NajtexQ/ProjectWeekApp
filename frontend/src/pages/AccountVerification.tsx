import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { URL } from "../constants";


export default function AccountVerification() {

    const [isVerified, setIsVerified] = useState(false);

    const { uuid } = useParams();


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

        {uuid && verifyAccount();}
    }, [])

    return (
        <div>
            <PageTitle title="Your account has been verified!" />
        </div>
    );
}