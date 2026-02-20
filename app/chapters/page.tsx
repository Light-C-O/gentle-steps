import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "@/components/navbar";

import Link from "next/link";

// This is the page that shows the list of chapters


export default async function ChapterPage() {
    const querySnapshot = await getDocs(collection(db, "chapters"));

    const chapters = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
}));

    return (
    <main className="p-8">
        <div>
            <NavBar/>
        </div>
        <h1 className="text-3xl font-bold mb-6">Chapters</h1>


        {chapters.map((chapter: any) => (
        <Link href={`/chapters/${chapter.id}`} key={chapter.id}>
            <div key={chapter.id} className="mb-6 p-4 border rounded-xl">
                <h2 className="text-xl font-semibold">{chapter.title}</h2>
                <p className="text-gray-600">{chapter.summary}</p>
            </div>
        </Link>
        ))}
        <Link href="/" className="bg-amber-400 hover:bg-indigo-600 text-2xl text-gray-900 px-4 py-4 rounded-2xl">
        Go Back 
        </Link> 
    </main>
    );
}