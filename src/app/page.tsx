'use client'

import {useRouter} from "next/navigation";
import TokenPairAuthentication from "./utils/tokenRotation";
import {useEffect, useState} from "react";
import {LoggedInHome, NotLoggedInHome} from "./home";

export default function Page() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function checkAuth(){
            const authenticator = new TokenPairAuthentication()
            const isAuth = await authenticator.isAuthneticated()
            setIsAuthenticated(isAuth)
        }
        checkAuth()
    }, []);

    const setParentIsAuthenticated = (bool) => {
        setIsAuthenticated(bool)
    }

    if(isAuthenticated){
        return(<LoggedInHome setIsAuth={setParentIsAuthenticated}></LoggedInHome>)
    } else {
        return (<NotLoggedInHome></NotLoggedInHome>)
    }

}