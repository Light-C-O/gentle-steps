'use client';
import { db } from "@/data/firebase";
import { doc, getDoc, deleteDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BookmarkButton from "@/components/bookmark-button";
import {getAuth} from "firebase/auth";
import {onAuthStateChanged} from "firebase/auth";
import BookmarkPage from "@/app/bookmarks/page";

// This is the page that shows the details of a chapter
type Chapter = {
    title: string;
    summary: string;
    order: number;
    sections?: Record<string, {
            title: string;
            content: string[] | string;
            order:number
            [key: string]: any;
    }>;
}


export default function ChapterDetails() {
    const params = useParams();
    // Get the chapter id from the params and set its type as string
    const chapterId= params.id as string;

    // the Chapter object is optional, null or not, defualt value null
    const [chapterData, setChapterData] = useState <Chapter | null>(null);


    //related to the bookmark, by default it is false
    const [enabled, setEnabled] = useState(false);

    //check the user
    const auth = getAuth();

    //what will happen when clicks the bookmark button
    const handleBookmarkButtonClick = async (
        sectionId:string,
        sectionTitle: string,
        content: string[] | string
    ) => {
        //get the user id 
        const userId = auth.currentUser;
        //if not the user id do nothing
        if (!userId) return;

        try{
            //get the reference
            const bookmarksRef = collection(db, "users", userId.uid, "bookmarks");

            //create a new bookmark document in the subcollection called bookmarks
            await addDoc(bookmarksRef, {
                chapterId,
                chapterTitle: chapterData?.title,
                sectionId,
                sectionTitle,
                content,
                createdAt: serverTimestamp(),
            });

            // if(enabled) {
            //     setEnabled(false);
            // } else {
            //     setEnabled(true)
            // }

            //same thing^
            setEnabled(!enabled);
        } catch(error) {
            //throw an error
            console.error("Error saving bookmark:", error)
        }
    };

    // Only run this function if the chapter id changes
    useEffect(() => {
        const fetchChapter = async () => { 
            if(!chapterId) return;

            try{
                // Fetch chapter
                const docRef = doc(db, 'chapters', chapterId)
                const querySnapshot = await getDoc(docRef);

                // if it exists, set the data. This is to debug
                if(querySnapshot.exists()) {
                    const data = querySnapshot.data();
                    //shows the document
                    console.log("FULL DOCUMENT:");
                    console.log(data);
                    //shows the sections
                    console.log("SECTIONS FIELD:");
                    console.log(data.sections);
                    setChapterData(data as Chapter)

                } else {
                    console.log('Chapter not found :(')
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchChapter();
    }, [chapterId] )

    if(!chapterData) return;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{chapterData.title}</h1>
            <p className="text-base font-light">{chapterData.summary}</p>
        
            {/*loop throught the maped fields*/}
            
            {
                //take all the section sort them based on order field
                chapterData.sections && Object.entries(chapterData.sections).sort((a, b) => a[1].order - b[1].order)
                .map(([key, sectionMap]) => (
                    <div key={key} className="mb-4">
                        <div className="flex justify-between">
                            <h2 className="font-semibold text-xl">{sectionMap.title}</h2>
                            <BookmarkButton enabled={enabled} onClick={()=> handleBookmarkButtonClick(
                                key,
                                sectionMap.title,
                                sectionMap.content
                            )}/>
                        </div>
                        {(() => {
                            const content = sectionMap.content;

                            if(Array.isArray(content)){
                                return content.map((line, i) => <p key={i} className="mb-2">{line}</p>);
                            } else if(typeof content === "string") { 
                                return <p>{content}</p>;
                            } else {
                                return <p></p>;
                            }
                        })()}

                    </div>
                ))
            }
        </div>
    );
}