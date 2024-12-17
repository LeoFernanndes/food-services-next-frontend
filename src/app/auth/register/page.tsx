'use client'

import styles from './page.module.css'
import {useRouter} from "next/navigation";
import {useState} from "react";


interface formDataInterface {
    username: string,
    email: string,
    password1: string,
    password2: string
}

export default function Page() {

    const router = useRouter()
    const [formData, setFormData]: formDataInterface = useState({username: '', email: '', password1: '', password2: ''})

    const handleElementChange = (element: any): void => {
        const newState = {
            ...formData,
            [element.target.name]: element.target.value
        }
        setFormData(newState)
        console.log(newState)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const registerResponse =  await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: formData.username, email: formData.email, password: formData.password1})
        })
        if (registerResponse.status == 201) {
            console.log(registerResponse.status)
        } else {
            console.log(registerResponse.status)
        }
    }

    return (
        <>
            <form className={styles.container}>
                <label>Username</label>
                <input name={'username'} onChange={handleElementChange}/>
                <label>Email</label>
                <input name={'email'} onChange={handleElementChange}/>
                <label>Password</label>
                <input name={'password1'} onChange={handleElementChange}/>
                <label>Password confirmation</label>
                <input name={'password2'} onChange={handleElementChange}/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <button onClick={async () => await router.push('/')}>Home</button>
        </>
    )
}