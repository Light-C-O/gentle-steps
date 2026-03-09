'use client';
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/data/firebase"
import {useState} from "react"

export default function NavBar(){
    const router = useRouter();

    //for hamburger menu, default false
    const [menuOpen, setMenuOpen] = useState(false);

    //what happend when a use wants to log out
    const handleLogout = async ()=> {
        try{
            await signOut(auth)
            // go back to auth page - logs out
            router.replace("/reviews")     
        } catch(error){
            console.error("Logout issue:", error)
        }
    }
    return ( 
        <nav className="">
            <div className="flex justify-between mt-10 text-center items-center pb-5 border-b-2 border-amber-300">
                <Link className="hover:underline underline-offset-2" href="/profile">View Profile</Link>
                <img src="/icon-512.png" width="50" height="50" alt="logo" />
                <button className="hover:underline underline-offset-2" onClick={handleLogout}>Log Out</button>
            </div>
            <div className="font-bold uppercase text-center py-2">Table of contents</div>
            <div className="mb-10 border-t-2 border-amber-300 pt-5">
                {/* for desktop */}
                <div className="hidden md:flex justify-between sm:mx-auto w-full">
                    <Link href="/chapters">Chapters</Link>
                    <Link href="/notes">My Notes</Link>
                    <Link href="/tracking">Tracking</Link>
                    <Link href="/checklists">Checklists</Link>
                    <Link href="/faqs">FAQs</Link>
                    <Link href="/reviews">Reviews</Link>
                </div>

                {/* for mobile - dropdown */}
                <div className="md:hidden">
                    <div className="flex justify-between mx-auto">
                        <Link href="/chapters">Chapters</Link>
                        {/* once you click the button it state become true */}
                        <div className="grid">
                            <button onClick={()=>setMenuOpen(!menuOpen)} className="flex justify-center items-center rounded-lg px-2 py-2 border border-amber-300 hover:bg-amber-100 active:bg-amber-200">
                                <img src="/hamburger.svg" width="24" height="24" alt="hamburger"/>
                            </button>
                            {menuOpen && (
                                <div className="mt-3 flex flex-col gap-3 text-center shadow-md rounded-md p-4 ">
                                    {/* <Link href="/chapters" onClick={()=>setMenuOpen(false)}>Chapters</Link> */}
                                    <Link href="/notes" onClick={()=>setMenuOpen(false)}>My Notes</Link>
                                    <Link href="/tracking" onClick={()=>setMenuOpen(false)}>Tracking</Link>
                                    <Link href="/checklists" onClick={()=>setMenuOpen(false)}>Checklists</Link>
                                    <Link href="/faqs" onClick={()=>setMenuOpen(false)}>FAQs</Link>
                                    <Link href="/reviews" onClick={()=>setMenuOpen(false)}>Reviews</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}