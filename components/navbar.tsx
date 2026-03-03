'use client';
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/data/firebase"
import Button from "@/components/button"

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
            <div className="flex justify-between mt-10 mb-2 text-center items-center pb-5 border-b-2 border-amber-300">
                <Link className="hover:underline underline-offset-2" href="/profile">View Profile</Link>
                <div className="font-bold uppercase">Table of contents</div>
                <button className="hover:underline underline-offset-2" onClick={handleLogout}>Log Out</button>

            </div>
            <div className="mb-10 border-t-2 border-amber-300 pt-5">
                <div className="mx-auto flex justify-between">
                    <Link href="/chapters">Chapters</Link>
                    <Link href="/notes">My Notes</Link>
                    <Link href="/tracking">Tracking</Link>
                    <Link href="/checklists">Checklists</Link>
                    <Link href="/faqs">FAQs</Link>
                    <Link href="/reviews">Reviews</Link>
                </div>
            </div>
        </nav>
    )
}