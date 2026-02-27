'use client';
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/data/firebase"

export default function NavBar(){
    const router = useRouter();

    //what happend when a use wants to log out
    const handleLogout = async ()=> {
        try{
            await signOut(auth)
            //go back to auth page - logs out
            router.replace("/")     
        } catch(error){
            console.error("Logout issue:", error)
        }
    }
    return (
        
        <nav className="">
            <header className="text-center">Table of contents</header>
            <div className=" py-2  ">
                <div className="mx-auto flex justify-between">
                    <Link href="/chapters">Chapters</Link>
                    <Link href="/notes">My Notes</Link>
                    <Link href="/tracking">Tracking</Link>
                    <Link href="/checklists">Checklists</Link>
                    <Link href="/faqs">FAQs</Link>
                    <Link href="/reviews">Reviews</Link>
                </div>
                <button onClick={handleLogout} className="hover: underline underline-offset-2">Log Out</button>
            </div>
        </nav>
    )
}