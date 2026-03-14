import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "@/components/navbar";


import { Chapter } from "@/types/chapter";
import SearchChapter from "@/components/searchchapter";
import BulbButton from "@/components/bulb";
import PaperBackground from "@/components/paper-background";

// This is the page that shows the list of chapters


export default async function ChapterPage() {
    const querySnapshot = await getDocs(collection(db, "chapters"));

    const chapters = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
})) as Chapter[];

    return (
    <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
        <div className="relative w-[90vw] max-w-3xl">
            <PaperBackground/>
            <div className="relative items-center justify-center h-full px-[8%]">
                <div><NavBar/></div>
                <SearchChapter chapters={chapters} />
            </div>
        </div>
    </main>
    );
}