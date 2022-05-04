import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { URL } from "../constants";

interface GlobalContextInterface {
    isLoggedIn: boolean;
    userData: any;
    setIsLoggedIn: (value: boolean) => void;
    register: (data: any) => void;
    login: (data:any) => void;
    logout: () => void;
}

const Context = createContext<GlobalContextInterface>({
    isLoggedIn: false,
    userData: {},
    setIsLoggedIn: () => { },
    register: () => { },
    login: () => { },
    logout: () => { }
});

const { Provider } = Context


function GlobalContextProvider({ children }: { children: React.ReactNode }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const navigation = useNavigate();

    function checkLogin() {
        axios.get(URL + "/user/profile", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setIsLoggedIn(true);
                    setUserData(res.data);
                }
                else {
                    setIsLoggedIn(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const register = async (data: any) => {

        const loginData = {
            email: data.email,
            password: data.password
        };

        const res = await axios.post(URL + "/auth/register", data);

        console.log(res);

        if (res.status === 201) {
            login(loginData);
        }
    }

    const login = async (data:any) => {

        console.log(data);

        const res = await axios.post(URL + "/auth/login", data, { withCredentials: true });

        console.log(res);

        if (res.status === 201) {
            navigation({
                pathname: "/"
            })

            setIsLoggedIn(true);
        }
    }

        const logout = async () => {
            const res = await axios.post(URL + "/auth/logout", {}, { withCredentials: true });

            if (res.status === 201) {
                navigation({
                    pathname: "/login"
                })
                setIsLoggedIn(false);
            }
        }

        useEffect(() => {
            checkLogin();
        }, [isLoggedIn]);

        const value = {
            isLoggedIn,
            userData,
            setIsLoggedIn,
            register,
            login,
            logout
        };

        return (
            <Provider value={value}>
                {children}
            </Provider>
        )
    }

    const useGlobalContext = () => useContext(Context)

    export { GlobalContextProvider, useGlobalContext }