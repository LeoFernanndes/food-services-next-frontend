import {useRouter} from "next/navigation";
import TokenPairAuthentication from "../../utils/tokenRotation";
import {useEffect, useState} from "react";

export default function CreateUserProfile({handleSetAction}){

    const [tokenData, setTokenData] = useState();
    const [userData, setUserData] = useState();
    const [formData, setFormData] = useState();



    const router = useRouter()
    const authenticator = new TokenPairAuthentication()
    authenticator.isAuthneticated().then((isAuthenticated) => {
            if (!isAuthenticated) {
                router.push('/')
            }
        }
    )

    useEffect(() => {
        const tokenData = JSON.parse(localStorage.getItem('token_data'))
        setTokenData(tokenData)
        const userData = JSON.parse(localStorage.getItem('authenticated_user'))
        setUserData(userData)
    }, []);

    const handleElementChange = (element: any): void => {
        const newState = {
            ...formData,
            [element.target.name]: element.target.value
        }
        setFormData(newState)
        console.log(newState)
    }

    const handleCreate = () => {
        const createUserProfileResponse = fetch(`http://localhost:8000/users/${userData.id}/user-profiles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenData.access_token}`
            },
            body: JSON.stringify(formData)
        }).then(response => {
            if (response.status == 201) {
                handleSetAction('list')
            }
        })
    }

    return (
        <>
            <form>
                <div>
                    <label>First name</label>
                    <input name={'first_name'} onChange={handleElementChange}/>
                </div>
                <div>
                    <label>Last name</label>
                    <input name={'last_name'} onChange={handleElementChange}/>
                </div>
                <div>
                    <label>Age</label>
                    <input name={'age'} onChange={handleElementChange}/>
                </div>
                <div>
                    <label>Profile picture</label>
                    <input name={'profile_picture'} onChange={handleElementChange}/>
                </div>
            </form>
            <button onClick={handleCreate}>Create</button>
        </>
    )
}