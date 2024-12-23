export default function GlobalContainer({children}: { children: React.ReactNode}) {
    return (
        <div className={"w-dvw h-dvh flex flex-col bg-gray-300"}>
            {children}
        </div>
    )
}
