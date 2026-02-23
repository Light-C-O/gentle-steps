import Link from "next/link"

export default function NavBar(){
    return (
        
        <nav className="">
            <header className="text-center">Table of contents</header>
            <div className=" py-2  ">
                <div className="mx-auto flex justify-between">
                    <Link href="/chapters">Chapters</Link>
                    <Link href="/notes">My Notes</Link>
                    <Link href="/tracking">Tracking</Link>
                    <Link href="/checklists">Checklists</Link>
                    <Link href="/faqs">FAQ</Link>
                </div>
            </div>
        </nav>
    )
}