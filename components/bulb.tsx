'use client'
import { useTheme } from "next-themes"

type BulbProps ={
    onClick?: ()=> void;
}

export default function BulbButton({onClick} : BulbProps) {

    const { theme, setTheme } = useTheme()
    console.log(theme)

    return(
        <div onClick={() =>{onClick?.(); setTheme(theme === "dark" ? "light" : "dark")}}
            className="cursor-pointer border-2 border-transparent rounded-l w-10 h-10 flex items-center justify-center mt-10">
            {theme === "dark"? <DisabledMoonIcon/> : <EnabledSunIcon/> }
        </div>
    )
}

// Enabled-filled
function EnabledSunIcon() {
	return (
        <svg xmlns="http://www.w3.org/2000/svg" className= "w-20 h-20" viewBox="0 0 24 24"><g fill="none"><g fill="currentColor" clip-path="url(#SVGHcSWxdhd)"><path d="M12 20a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m-7.071-2.343a1 1 0 1 1 1.414 1.414l-1.414 1.414a1 1 0 0 1-1.414-1.414zm12.728 0a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 0 1-1.414 1.414l-1.414-1.414a1 1 0 0 1 0-1.414M12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12m-9 5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm20 0a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zM3.515 3.515a1 1 0 0 1 1.414 0l1.414 1.414a1 1 0 1 1-1.414 1.414L3.515 4.929a1 1 0 0 1 0-1.414m15.556 0a1 1 0 0 1 1.414 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414zM12 0a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1"/></g><defs></defs></g></svg>
    );
}

// Disabled-unfilled
function DisabledMoonIcon() {
	return (
    <svg xmlns="http://www.w3.org/2000/svg" className= "w-20 h-20" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11.712 3.45a.75.75 0 0 0-.668-1.197c-5.414.494-8.436 4.752-8.764 9.105c-.328 4.361 2.037 8.975 7.451 10.166c5.686 1.25 11.472-2.837 12.016-8.646a.75.75 0 0 0-1.189-.676c-2.837 2.069-6.08 1.316-8.136-.724c-2.054-2.039-2.8-5.239-.71-8.028"/></svg>
    );
}