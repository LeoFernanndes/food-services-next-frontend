export default async function Page() {
    const usersResponse = await fetch('http://localhost:8000/users')
    const users = await usersResponse.json()
    console.log(users)
    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.username}</li>
            ))}
        </ul>
    )
}