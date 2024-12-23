'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter} from "next/navigation";
import TokenPairAuthentication from "../../utils/tokenRotation";
import LocalStorageOperations from "../../../localStorage/storageOpetarations";

export default function Page() {
    const authenticator = new TokenPairAuthentication()
    const router = useRouter();
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [authenticated, setAuthenticated] = useState(false)

    const localStorageOperations = new LocalStorageOperations()

    const handleUsernameInputChange = (event) => {
        setUsernameInput(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPasswordInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        sendData()
    }

    useEffect(() => {
        async function checkIsAuthenticated(){
            if (localStorageOperations.getIsAuthenticated()){
                return router.push('/')
            }
        }
        checkIsAuthenticated()
    })

    async function sendData() {
        const localStorageOperations = new LocalStorageOperations()
        const authenticated = await authenticator.authenticateTokenPair(usernameInput, passwordInput)
        if (authenticated) {
            const authToken = localStorageOperations.getAuthRefreshToken()
            const userResponse = await fetch('http://localhost:8000/auth/me/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken.access_token}`
                }
            })
            const userData = await userResponse.json()

            localStorageOperations.setAuthenitcatedUser(userData)
            setAuthenticated(true)
            // router.push('/')
            router.refresh()
        } else {
            setUsernameInput('')
            setPasswordInput('')
        }
    }

    return (
        <div className="h-full w-full flex justify-center items-center">
            <form className="w-56">
                <div className="flex justify-center items-center mb-4">
                    <span className="text-xl font-semibold">Login</span>
                </div>
                <div className="flex flex-col w-full items-center mb-4">
                    <label>Username</label>
                    <input className="rounded-md w-full text-center" type={'text'} placeholder="username" value={usernameInput} onChange={handleUsernameInputChange}/>
                </div>
                <div className="flex flex-col w-full items-center mb-4">
                    <label>Password</label>
                    <input className="rounded-md w-full text-center" type={'password'} placeholder="*******" value={passwordInput} onChange={handlePasswordInputChange}/>
                </div>
                <div className="flex w-full justify-around mt-8">
                    <button className="w-1/3 h-7 bg-gray-700 rounded-md hover:bg-gray-500 text-gray-200" onClick={handleSubmit}>Login</button>
                    <button className="w-1/3 h-7 bg-gray-700 rounded-md hover:bg-gray-500 text-gray-200"><Link href={'/auth/register'}>Register</Link></button>
                </div>
            </form>
        </div>
    )
}