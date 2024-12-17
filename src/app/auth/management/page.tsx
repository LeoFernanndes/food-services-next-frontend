'use client'

import UserProfiles from "./UserProfiles";
import CreateUserProfile from "./CreateUserProfile";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import TokenPairAuthentication from "../../utils/tokenRotation";

export default function Page() {
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [action, setAction] = useState('list')

    useEffect(() => {
        const authenticator = new TokenPairAuthentication()
        authenticator.isAuthneticated().then((isAuthenticated) => {
                if (!isAuthenticated) {
                    router.push('/')
                }
            }
        )

        async function loadLocalStorageData(){
            const userDataString = localStorage.getItem('authenticated_user')
            const userData = JSON.parse(userDataString)
            setUserData(userData)
        }
        loadLocalStorageData()
    }, []);

    if (userData && action == 'list'){

        return (
            <>
                <h1>{userData.username} account management</h1>
                <div>
                    <button onClick={async () => await router.push('/')}>Home</button>
                    <button onClick={() => setAction('create')}>New user profile</button>
                </div>
                <UserProfiles/>
            </>
        )
    } if (userData && action == 'create') {
        return (
            <>
                <h1>{userData.username} account management</h1>
                <h2>Create user</h2>
                <div>
                    <button onClick={async () => await router.push('/')}>Home</button>
                    <button onClick={() => setAction('list')}>Back</button>
                </div>
                <CreateUserProfile handleSetAction={setAction}></CreateUserProfile>
            </>
        )

    } else {
        return (
            <>
            </>
        )
    }

}