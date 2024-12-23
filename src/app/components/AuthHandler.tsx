'use client';

import { useEffect, useState } from "react";
import LocalStorageOperations from "../../localStorage/storageOpetarations";
import TokenPairAuthentication from "../utils/tokenRotation";

export default function AuthHandler({children}: { children: React.ReactNode}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        async function checkAuth(){
            const localStorageOperations = new LocalStorageOperations()
            const authenticator = new TokenPairAuthentication()
            const isAuth = await authenticator.isAuthneticated()
            localStorageOperations.setIsAuthenticated(isAuth)
            setIsAuthenticated(isAuth)
            console.log('Auth use effect triggered')
            console.log(isAuth)
            console.log(localStorage.getItem('authenticated_user'))
        }
        checkAuth()
    }, []);

    return (
        <>
            {children}
        </>
    )
}
