'use client'

import TokenPairAuthentication from "../../utils/tokenRotation";
import {useRouter} from "next/navigation";

import {tokenData} from "../../utils/types";
import {useEffect, useState} from "react";


export default function UserProfiles() {
    const [userData, setUserData] = useState()
    const [tokenData, setTokenData] = useState()
    const [userProfiles, setUserProfiles] = useState()
    const [userProfilesCount, setUserProfilesCount] = useState(0)

    useEffect(() => {
        async function listUserProfiles(userId: number, access_token: string) {
            const userProfilesResponse = await fetch(`http://localhost:8000/users/${userId}/user-profiles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                }
            })
            const userProfilesJson = await userProfilesResponse.json()
            setUserProfiles(userProfilesJson)
            setUserProfilesCount(userProfilesJson.lenght)
        }
        const userData = JSON.parse(localStorage.getItem('authenticated_user'))
        setUserData(userData)
        const tokenData = JSON.parse(localStorage.getItem('token_data'))
        setTokenData(tokenData)
        listUserProfiles(userData.id, tokenData.access_token)
    }, []);

    const router = useRouter()
    const authenticator = new TokenPairAuthentication()
        authenticator.isAuthneticated().then((isAuthenticated) => {
            if (!isAuthenticated) {
                router.push('/')
            }
        }
    )

    const handleDelete = (profileId) => {
        const authenticator = new TokenPairAuthentication()
        authenticator.isAuthneticated().then((isAuthenticated) => {
                if (!isAuthenticated) {
                    router.push('/')
                } else {
                    const userProfilesResponse = fetch(`http://localhost:8000/users/${userData.id}/user-profiles/${profileId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenData.access_token}`
                        }
                    }).then(response => {
                        if (response.status == 204){
                            const newValue = userProfilesCount - 1
                            setUserProfilesCount(newValue)
                        }
                    })
                }
            }
        )
    }

    return (
        <>
            <ul>
                {userProfiles && userProfiles.map((userProfile) => (
                    <div key={userProfile.id}>
                        <li>{userProfile.id}</li>
                        <li>{userProfile.first_name}</li>
                        <li>{userProfile.last_name}</li>
                        <li>{userProfile.age}</li>
                        <button onClick={() => router.push(`/profiles/${userProfile.id}`)}>update</button>
                        <button onClick={() => handleDelete(userProfile.id)}>Delete</button>
                    </div>

                ))}
            </ul>
        </>
    )
}