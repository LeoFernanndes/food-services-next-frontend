import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import TokenPairAuthentication from "../../app/utils/tokenRotation";

const UserProfile = () => {
    const router = useRouter();
    const {id} = router.query;
    const [userData, setUserData] = useState()
    const [tokenData, setTokenData] = useState()
    const [userProfile, setUserProfile] = useState({'first_name': '', 'last_name': '', 'age': '', 'profile_picture': ''});

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userData = JSON.parse(localStorage.getItem('authenticated_user'))
            setUserData(userData)
            const tokenData = JSON.parse(localStorage.getItem('token_data'))
            setTokenData(tokenData)
            const userProfileResponse = await fetch(`http://localhost:8000/users/${userData.id}/user-profiles/${id}`)
            const userProfile = await userProfileResponse.json()
            setUserProfile(userProfile)
        }
        fetchUserProfile();
    }, [router.query]);

    const handleElementChange = (element: any): void => {
        const newState = {
            ...userProfile,
            [element.target.name]: element.target.value
        }
        setUserProfile(newState)
        console.log(newState)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const updateResponse =  await fetch(`http://localhost:8000/users/${userData.id}/user-profiles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenData.access_token}`
            },
            body: JSON.stringify({first_name: userProfile.first_name, last_name: userProfile.last_name, age: userProfile.age, profile_picture: userProfile.profile_picture})
        })
        if (updateResponse.status == 200) {
            console.log(updateResponse.status)
            router.push('/auth/management')
        } else {
            console.log(updateResponse.status)
        }
    }

    return (
        <>
            <h2>{id}</h2>
            <form>
                <div>
                    <label>First name</label>
                    <input defaultValue={userProfile.first_name} onChange={handleElementChange} name={'first_name'}/>
                </div>
                <div>
                    <label>Last name</label>
                    <input defaultValue={userProfile.last_name} onChange={handleElementChange} name={'last_name'}/>
                </div>
                <div>
                    <label>Age</label>
                    <input defaultValue={userProfile.age} onChange={handleElementChange} name={'age'}/>
                </div>
                <div>
                    <label>Profile picture</label>
                    <input defaultValue={userProfile.profile_picture} onChange={handleElementChange} name={'profile_picture'}/>
                </div>
            </form>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={() => router.push('/auth/management')}>Back</button>
        </>
    )
}

export default UserProfile;