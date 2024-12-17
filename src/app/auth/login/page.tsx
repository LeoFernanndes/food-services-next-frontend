'use client'

import { useRouter} from "next/navigation";
import React, { useState } from 'react';
import TokenPairAuthentication from "../../utils/tokenRotation";

export default function Page() {
    const authenticator = new TokenPairAuthentication()
    const router = useRouter();
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [authenticated, setAuthenticated] = useState(false)

    const handleUsernameInputChange = (event) => {
        setUsernameInput(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPasswordInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Clicked')
        sendData()
    }

    authenticator.isAuthneticated().then(bool => {
        if (bool == true) {
            router.push('/')
        }
    })

    async function sendData() {
        const authenticated = await authenticator.authenticateTokenPair(usernameInput, passwordInput)
        if (authenticated) {

            const userResponse = await fetch('http://localhost:8000/auth/me/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authenticator.retrieveTokenDataFromLocalStorage().access_token}`
                }
            })
            const userData = await userResponse.json()
            localStorage.setItem('authenticated_user', JSON.stringify(userData))
            router.push('/')
        } else {
            setUsernameInput('')
            setPasswordInput('')
        }
    }

    return (
        <>
            <form>
                <label>Username</label>
                <input type={'text'} value={usernameInput} onChange={handleUsernameInputChange}/>
                <label>Password</label>
                <input type={'password'} value={passwordInput} onChange={handlePasswordInputChange}/>
            </form>
            <button onClick={handleSubmit}>Login</button>
            <button onClick={async () => await router.push('/auth/register')}>Register</button>
        </>
    )
}