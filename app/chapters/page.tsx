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
    <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
        <div className="relative w-[90vw] max-w-3xl">
            <img src="/paper2.svg" alt="background paper" className="absolute w-full h-full object-cover rounded-2xl"/>
            <div className="relative items-center justify-center h-full px-[8%]">
                <div><NavBar/></div>
                <h1 className="text-3xl font-bold mb-6">Chapters</h1>
                <div className="md:grid grid-cols-2 gap-4 mb-4">
                    {chapters.map((chapter: any) => (
                        <Link href={`/chapters/${chapter.id}`} key={chapter.id}>
                            <div className="flex items-stretch">
                                <div key={chapter.id} className="mb-6 w-full items-center border rounded-xl hover:shadow-[inset_-5px_8px_50px_10px_#46464620] md:mb-0 p-4 md:h-auto md:items-center align-middle">
                                    <small>Chapter {chapter.order}</small>
                                    <h2 className="text-xl font-semibold">{chapter.title}</h2>

                                    {/* mobile */}
                                    <p className="text-gray-600 md:hidden">{chapter.overview}</p>
                                    
                                    {/* bigger than mobile */}
                                    <p className="hidden md:block">
                                        {/* if the length in more than 40 characters, shorten it to 40 characters and leave a trail */}
                                        {chapter.overview?.length > 40 ? `${chapter.overview.substring(0, 40)}...`: chapter.overview}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    
                    ))}
                </div>
            </div>
        </div>
    </main>
    );
}