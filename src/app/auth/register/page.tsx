'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LocalStorageOperations from "../../../localStorage/storageOpetarations";

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({username: '', email: '', password1: '', password2: ''})
    const localStorageOperations = new LocalStorageOperations();
    
    useEffect(() => {
        async function checkIsAuthenticated(){
            if (localStorageOperations.getIsAuthenticated()){
                return router.push('/')
            }
        }
        checkIsAuthenticated()
    })

    const handleElementChange = (element: any): void => {
        const newState = {
            ...formData,
            [element.target.name]: element.target.value
        }
        setFormData(newState)
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
        <div className="flex h-full justify-center items-center">
            <div className="">
                <form>
                    <div className="flex flex-col items-center mb-6">
                        <span className="text-xl font-semibold">Register</span>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <label>Username</label>
                        <input className="rounded-md" name={'username'} onChange={handleElementChange}/>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <label>Email</label>
                        <input className="rounded-md" name={'email'} onChange={handleElementChange}/>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <label>Password</label>
                        <input className="rounded-md" name={'password1'} onChange={handleElementChange}/>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <label>Password confirmation</label>
                        <input className="rounded-md" name={'password2'} onChange={handleElementChange}/>
                    </div>
                    <div className="flex justify-around mt-8">
                        <button className="bg-gray-800 rounded-md h-8 w-2/5 text-gray-200 hover:bg-gray-600" onClick={handleSubmit}>Submit</button>
                        <button className="bg-gray-800 rounded-md h-8 w-2/5 text-gray-200 hover:bg-gray-600"><Link href={'/'}>Back</Link></button>
                    </div>
                </form>
            </div>
        </div>
    )
}