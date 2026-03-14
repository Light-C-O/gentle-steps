'use client'
import { useTheme } from "next-themes"

export default function BulbButton() {

    const { theme, setTheme } = useTheme()
    console.log(theme)

    return(
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-red-500">
            Toggle
        </button>
    )
}
