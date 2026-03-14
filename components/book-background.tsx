'use client'
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function BooKBackground() {
    const { theme } = useTheme();
    const dark = theme === "dark";
    const [mounted, setMounted] = useState(false);
    

    useEffect(() => { setMounted(true) }, [])

    return (
        <img src={!mounted ? "/book.svg" : dark ? "/book2.svg" : "/book.svg"} className="absolute inset-0 w-full h-full object-fit rounded-2xl" alt="Book background" />

        // <img
        //     src={!mounted ? "/book.svg" : theme === "dark" ? "/book2.svg" : "/book.svg"}
        //     alt="background book"
        //     className="absolute w-full h-full object-cover rounded-2xl"
        // />
    )
}