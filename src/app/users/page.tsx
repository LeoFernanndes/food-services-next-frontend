'use client'

import { useEffect, useState } from "react";
import { User } from "../../localStorage/types";

export default function Page() {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        async function fetchUsers(){
            const usersResponse = await fetch('http://localhost:8000/users/')
            const users = await usersResponse.json()
            setUsers(users)
            console.log(users)
        }
        fetchUsers()
    }, []);

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.username}</li>
            ))}
        </ul>
    )
}