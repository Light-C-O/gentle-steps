import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "@/components/navbar";


import { Chapter } from "@/types/chapter";
import SearchChapter from "@/components/searchchapter";
import PaperBackground from "@/components/paper-background";

// This is the page that shows the list of chapters


export default async function ChapterPage() {
    const querySnapshot = await getDocs(collection(db, "chapters"));

    const chapters = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
})) as Chapter[];

    return (
    <main className="flex items-center justify-center mx-auto min-h-screen font-sans overflow-hidden drop-shadow-xl/50">
        <div className="relative w-[90vw] max-w-3xl">
            <PaperBackground/>
            <div className="relative items-center justify-center h-full px-[8%]  text-red-900 dark:text-gray-700">
                <div><NavBar/></div>
                <SearchChapter chapters={chapters} />
            </div>
        </div>
    </main>
    );
}