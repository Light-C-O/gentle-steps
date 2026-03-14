'use client';
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/data/firebase"
import {useState} from "react"
import BulbButton from "@/components/bulb";


export default function NavBar(){
    const router = useRouter();
    const pathname = usePathname();

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
        <nav className="text-red-900 dark:dark:text-gray-700">
            <div className="flex justify-between mt-10 text-center items-center pb-5 border-b-2 border-amber-300">
                
                <Link className="hover:underline underline-offset-2" href="/profile">View Profile</Link>
                <BulbButton/>
                <button className="hover:underline underline-offset-2" onClick={handleLogout}>Log Out</button>
            </div>
            <div className="font-bold uppercase text-center py-2">Table of contents</div>
            <div className="mb-10 border-t-2 border-amber-300 pt-5">
                {/* for desktop */}
                <div className="hidden sm:flex justify-between sm:mx-auto w-full">
                    <Link href="/chapters" className={pathname === "/chapters" ? "border-b-2  border-amber-300 px-4 font-bold" : "hover:border-b-2 border-gray-300 px-4"} >Chapters</Link>
                    <Link href="/notes" className={pathname === "/notes" ? "border-b-2 border-amber-300 px-4 font-bold" : "hover:border-b-2 border-gray-300 px-4"} >Notes</Link>
                    <Link href="/tracking" className={pathname === "/tracking" ? "border-b-2 border-amber-300 px-4 font-bold" : "hover:border-b-2 border-gray-300 px-4"}>Tracking</Link>
                    <Link href="/checklists" className={pathname === "/checklists" ? "border-b-2 border-amber-300 px-4 font-bold" : "hover:border-b-2 border-gray-300 px-4"}>Checklists</Link>
                    <Link href="/faqs" className={pathname === "/faqs" ? "border-b-2 border-amber-300 px-4 font-bold" : "hover:border-b-2 border-gray-300 px-4"}>FAQs</Link>
                </div>

                {/* for mobile - dropdown */}
                <div className="sm:hidden">
                    <div className="flex justify-between mx-auto">
                        <Link className="hover:border-b-2 border-amber-300 focus:border-amber-300" href="/chapters">Chapters</Link>
                        {/* once you click the button it state become true */}
                        <div className="grid">
                            <button onClick={()=>setMenuOpen(!menuOpen)} className="flex justify-center items-center rounded-lg px-2 py-2 border border-amber-300 hover:bg-amber-100 active:bg-amber-200 focus:bg-amber-200 relative">
                                <img src="/hamburger.svg" width="24" height="24" alt="hamburger"/>
                            </button>
                            {menuOpen && (
                                <div className="flex flex-col text-center rounded-md absolute right-20 top-34 border border-amber-300 bg-amber-50">
                                    <Link className="p-2 hover:bg-amber-200" href="/notes" onClick={()=>setMenuOpen(false)}>Notes</Link>
                                    <Link className="p-2 hover:bg-amber-200" href="/tracking" onClick={()=>setMenuOpen(false)}>Tracking</Link>
                                    <Link className="p-2 hover:bg-amber-200" href="/checklists" onClick={()=>setMenuOpen(false)}>Checklists</Link>
                                    <Link className="p-2 hover:bg-amber-200" href="/faqs" onClick={()=>setMenuOpen(false)}>FAQs</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}