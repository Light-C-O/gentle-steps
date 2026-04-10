'use client';
import {useState, useEffect} from "react";

import { db } from "@/data/firebase";
import {getAuth} from "firebase/auth";
import { collection, getDocs} from "firebase/firestore";

import Link from "next/link";

//components
import PaperBackground from "@/components/paper-background";

type Bookmark = {
    id:string;
    chapterId: string;
    sectionId: string;
    chapterTitle: string;
    sectionTitle: string;
    content: string[] | string;
    createdAt: any;
}

export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const auth = getAuth();

    useEffect(()=>{
        //display anything that has been bookmarked (stored in the database)
        const fetchBookmark = async () => {
            const user = auth.currentUser;

            //check user exists
            if(!user?.uid) return;

            const bookmarksRef = collection(db, "users", user.uid, "bookmarks");
            const snapshot = await getDocs(bookmarksRef);

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Bookmark[];

            setBookmarks(data);
        };
        fetchBookmark();
    },[]);

    return(
        <div className="flex justify-center mx-auto min-h-auto font-yomogi drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl min-h-[75vh]">
                <PaperBackground/>
                <div className="relative z-10 items-center justify-center h-full px-[8%] text-red-900 dark:text-gray-700 mt-10">
                    <div className="grid">
                        <div className="mb-6 justify-self-start border rounded-xl py-2 px-3 hover:bg-amber-100/50 dark:hover:bg-gray-300/50 cursor-pointer">
                            <Link href={"/chapters"} className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.857 15.962a.5.5 0 0 0 .243.68l9.402 4.193c1.496.667 3.047-.814 2.306-2.202l-3.152-5.904c-.245-.459-.245-1 0-1.458l3.152-5.904c.741-1.388-.81-2.87-2.306-2.202l-3.524 1.572a2 2 0 0 0-.975.932z"/><path fill="currentColor" d="M8.466 15.39a.5.5 0 0 1-.65.233l-4.823-2.15c-1.324-.59-1.324-2.355 0-2.945L11.89 6.56a.5.5 0 0 1 .651.68z" opacity="0.5"/></svg>
                            <div>View Chapters</div>
                            </Link>
                        </div>
                        <h1 className="text-3xl text-center font-bold mb-4">My Bookmarks</h1>
                        <div>
                            {/* a for each loop of the bookmarks docs */}
                            {bookmarks.map((bookmark) =>(
                                <Link key={bookmark.id} href={`/chapters/${bookmark.chapterId}#${bookmark.sectionId}`}>
                                    <div key={bookmark.id} className="mb-6 border p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-gray-300/50">
                                        <h2 className="font-bold">{bookmark.chapterTitle}</h2>
                                        <h3>{bookmark.sectionTitle}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}