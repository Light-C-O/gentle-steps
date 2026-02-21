import Link from "next/link"

export default function NavBar(){
    return (
        
        <nav className="">
            <header className="text-center">Table of contents</header>
            <div className=" py-2  ">
                <div className="mx-auto flex justify-evenly">
                    <Link href="/chapters">Chapters</Link>
                    <Link href="/checklists">Checklists</Link>
                    <Link href="/faqs">FAQ</Link>
                    <Link href="/resources">Resources</Link>
                    <Link href="/tracking">Tracks</Link>
                    <Link href="/notes">Notes</Link>
                </div>
            </div>
        </nav>
    )
}