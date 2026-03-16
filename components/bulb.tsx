'use client'
import { useTheme } from "next-themes"

export default function BulbButton() {

    const { theme, setTheme } = useTheme()
    console.log(theme)

    return(
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="cursor-pointer border-2 border-transparent hover:border-amber-700 rounded-full w-20 h-20">
            <img src="/transparent _logo.png" width="50" height="50" alt="logo" className="rounded-full h-full w-full object-cover" />
        </button>
    )
}
