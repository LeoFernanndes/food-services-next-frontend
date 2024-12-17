import {useRouter} from "next/navigation";


export function LoggedInHome({setIsAuth}){

    const router = useRouter()

    async function handleLogout() {
        localStorage.clear()
        setIsAuth(false)
    }

    return (
        <>
            <h1>Hello, Next.js!</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={async () => router.push('/auth/management')}>Account management</button>
        </>
    )
}

export function NotLoggedInHome(){

    const router = useRouter()

    return (
        <>
            <h1>Hello, Next.js!</h1>
            <button onClick={async () => await router.push('/auth/login')}>Login</button>
        </>
    )
}