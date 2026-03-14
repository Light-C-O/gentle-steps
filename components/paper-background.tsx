'use client'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function PaperBackground() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    return (
        <img
            src={!mounted ? "/paper.svg" : theme === "dark" ? "/paper2.svg" : "/paper.svg"}
            alt="background paper"
            className="absolute w-full h-full object-cover rounded-2xl"
        />
    )
}