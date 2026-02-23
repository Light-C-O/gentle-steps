'use client';
import {useState, useEffect} from "react";
import { db } from "@/data/firebase";
import {getAuth} from "firebase/auth";
import { collection, getDocs} from "firebase/firestore";
import Button from "@/components/button";
import NavBar from "@/components/navbar";

type Bookmark = {
    id:string;
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
            if(!user) return;

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
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Bookmarks</h1>

            {/* a for each loop of the bookmarks docs */}
            {bookmarks.map((bookmark) =>(
                <div key={bookmark.id} className="mb-6 border p-4 rounded">
                    <h2>{bookmark.chapterTitle}</h2>
                    <h3>{bookmark.sectionTitle}</h3>

                    {Array.isArray(bookmark.content) ? 
                    bookmark.content.map((line, i)=>(
                        <p key={i}>{line}</p>
                    )) :
                        <p>{bookmark.content}</p>
                    }
                </div>
            ))}
        </div>
    )
}