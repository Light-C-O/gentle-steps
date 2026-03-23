'use client';
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/data/firebase"
import {useState} from "react"
import BulbButton from "@/components/bulb";
import ProfileButton from "./profile-button";
import LogoIcon from "./logo";


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
            router.replace("/reviews");
            alert("You are now logged out!")
        } catch(error){
            console.error("Logout issue:", error)
        }
    }
    return ( 
        <nav className="text-red-900 dark:dark:text-gray-700">
            
            <div className="flex justify-end"><BulbButton/></div>
            
            <div className="flex justify-between mt-5 text-center items-center pb-5 border-b-2 border-amber-300">
                <ProfileButton enabled={false}/>
                <LogoIcon/>
                <button className="cursor-pointer border hover:font-semibold hover:shadow-[inset_5px_-5px_30px_5px_#46464620] p-2 rounded-lg" onClick={handleLogout}>Log Out</button>
            </div>
            <div className="font-bold uppercase text-center py-2">Table of contents</div>
            <div className="mb-10 border-t-2 border-amber-300 pt-5">
                {/* for desktop */}
                <div className="hidden sm:flex justify-items-stretch justify-center sm:mx-auto w-full">
                    <Link href="/chapters" className={pathname === "/chapters" ? "border-b-2  border-amber-300 px-8 font-bold" : "hover:border-b-2 rounded-tl-lg border-gray-300 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] px-8"} >Chapters</Link>
                    <Link href="/notes" className={pathname === "/notes" ? "border-b-2 border-amber-300 px-8 font-bold" : "hover:border-b-2 border-gray-300 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] px-8"} >Notes</Link>
                    <Link href="/tracking" className={pathname === "/tracking" ? "border-b-2 border-amber-300 px-8 font-bold" : "hover:border-b-2 border-gray-300 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] px-8"}>Tracking</Link>
                    <Link href="/checklists" className={pathname === "/checklists" ? "border-b-2 border-amber-300 px-8 font-bold" : "hover:border-b-2 border-gray-300 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] px-8"}>Checklists</Link>
                    <Link href="/faqs" className={pathname === "/faqs" ? "border-b-2  border-amber-300 px-8 font-bold" : "hover:border-b-2 rounded-tr-lg border-gray-300 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] px-8"}>FAQs</Link>
                </div>

                {/* for mobile - dropdown */}
                <div className="sm:hidden">
                    <div className="flex justify-between items-center mx-auto">
                        <Link className={pathname === "/chapters" ? "border-b-2  border-amber-300 px-8 font-bold" : "hover:border-b-2 rounded-tl-lg border-gray-300 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] px-8"} href="/chapters">Chapters</Link>
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