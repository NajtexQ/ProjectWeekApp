import axios from "axios";
import { useState, useEffect } from "react";

import { URL } from "../constants";

// useRequest hook
export default function useRequest(url: string, options: any = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
}) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const doRequest = async () => {
        setLoading(true);
        try {
            const response = await axios(URL + url, options);
            setData(response.data);
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        doRequest();
    }, []);

    const reload = () => {
        doRequest();
    };

    return { data, error, loading, reload };
}