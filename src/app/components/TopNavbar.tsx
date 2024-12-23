'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { AuthenticatedUserType } from "../../localStorage/types"
import LocalStorageOperations from "../../localStorage/storageOpetarations"


export default function TopNavbar() {
    
    const [isAuth, setIsAuth] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUserType>();

    const router = useRouter()

    useEffect(() => {
        async function checkIsAuth(){
            const localStorageOperations = new LocalStorageOperations()
            const isAuth = localStorageOperations.getIsAuthenticated();
            setIsAuth(isAuth)
            setAuthenticatedUser(localStorageOperations.getAuthenticatedUser())
        }
        checkIsAuth()
    }, [])

    const handleLogout = () => {
        const localStorageOpetations = new LocalStorageOperations()
        setIsAuth(false)
        localStorageOpetations.clear()
    }

    if (isAuth) {
        return (
            <div className="bg-gray-700 h-full flex justify-center">
                <div className="flex w-11/12 justify-between items-center">
                    <div className="w-40 flex justify-center items-center">
                        <span className="text-gray-200">Hello, {authenticatedUser?.username}</span>
                    </div>
                    <div className="w-40 h-8 bg-gray-800 rounded-md flex justify-center items-center">
                        <button className="text-gray-200 w-full h-full" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="bg-gray-700 h-full flex justify-center">
                <div className="flex w-11/12 justify-between items-center">
                    <div className="w-40 flex justify-center items-center">
                        <span className="text-gray-200">Unauthenticated</span>
                    </div>
                    <div className="w-52 h-9 flex justify-between items-center">
                        <div className="w-24 h-8 bg-gray-800 rounded-md flex justify-center items-center"><button className="text-gray-200 w-full h-full" onClick={async () => router.push('/auth/login')}>Login</button></div>
                        <div className="w-24 h-8 bg-gray-800 rounded-md flex justify-center items-center"><button className="text-gray-200 w-full h-full" onClick={async () => router.push('/auth/register')}>Register</button></div>
                    </div>      
                </div>
            </div>
        )
    }
}