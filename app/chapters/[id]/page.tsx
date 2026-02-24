'use client';
import { db } from "@/data/firebase";
import { doc, getDoc, deleteDoc, getDocs, query, where, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookmarkButton from "@/components/bookmark-button";
import {getAuth} from "firebase/auth";
import Button from "@/components/button";
import Link from "next/link";

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
    const router = useRouter()
    const params = useParams();
    // Get the chapter id from the params and set its type as string
    const chapterId= params.id as string;

    // the Chapter object is optional, null or not, defualt value null
    const [chapterData, setChapterData] = useState <Chapter | null>(null);


    //related to the bookmark per section, by default it is an array, 
    const [bookmarkedSections, setbookmarkedSections] = useState<string[]>([]);

    //check the user
    const auth = getAuth();

    //what will happen when clicks the bookmark button
    const handleBookmarkButtonClick = async (
        sectionId:string,
        sectionTitle: string,
        content: string[] | string
    )=>{
         //get the user id 
        const user = auth.currentUser;
        //if not the user id do nothing
        if (!user || !chapterData) return;


        //get the reference
        const bookmarksRef = collection(db, "users", user.uid, "bookmarks");

        //first check if it has already been bookmarked or not
        const q = query(bookmarksRef, 
            where("chapterId", "==",chapterId), 
            where("sectionId", "==", sectionId)
            );

        const snapshot = await getDocs(q);

        //if not empty(has been bookmarked)
        if(!snapshot.empty){
            //delete it
            const bookmarkId = snapshot.docs[0].id;
            await deleteDoc(doc(db, "users", user.uid, "bookmarks", bookmarkId));

            setbookmarkedSections(prev=>prev.filter(id => id !== sectionId));
        }else{
            //if empty (not bookmarked) - add it

            //create a new bookmark document in the subcollection called bookmarks
            await addDoc(bookmarksRef, {
                chapterId,
                chapterTitle: chapterData.title,
                sectionId,
                sectionTitle,
                content,
                createdAt: serverTimestamp(),
            });

            setbookmarkedSections(prev=>[...prev,sectionId]);
        }
    }

    // const handleBookmarkButtonClick = async (
    //     sectionId:string,
    //     sectionTitle: string,
    //     content: string[] | string
    // ) => {
    //     //get the user id 
    //     const user = auth.currentUser;
    //     //if not the user id do nothing
    //     if (!user) return;

    //     try{
    //         //get the reference
    //         const bookmarksRef = collection(db, "users", user.uid, "bookmarks");

    //         //create a new bookmark document in the subcollection called bookmarks
    //         await addDoc(bookmarksRef, {
    //             chapterId,
    //             chapterTitle: chapterData?.title,
    //             sectionId,
    //             sectionTitle,
    //             content,
    //             createdAt: serverTimestamp(),
    //         });

    //         // if(enabled) {
    //         //     setEnabled(false);
    //         // } else {
    //         //     setEnabled(true)
    //         // }

    //         //same thing^
    //         setbookmarkedSections(!bookmarkedSections);
    //     } catch(error) {
    //         //throw an error
    //         console.error("Error saving bookmark:", error)
    //     }
    // };





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

    //for bookmark
    useEffect(()=>{
        //get all the bookmarks sections fo a chapter
        const fetchBookmarkSections = async ()=>{
            //get user
            const user = auth.currentUser;

            //if no user or a chapter id, do nothing
            if(!user || !chapterId) return;

            //reference of the docs for a user
            const bookmarksRef = collection(db, "users", user.uid, "bookmarks");

            //ask for bookmark docs where this chapter id is the same in the docs
            const q = query(bookmarksRef, where ("chapterId" ,"==", chapterId));

            //get it
            const snapshot = await getDocs(q);

            //get ony the sectionId of the bookmark docs
            const sectionIds = snapshot.docs.map(doc=>doc.data().sectionId);
            
            //save
            setbookmarkedSections(sectionIds);
        };

        fetchBookmarkSections();
    },[chapterId] )

    //to navigate the specific section
    useEffect(()=>{
        //if no data, do nothing
        if(!chapterData)return;

        //get the hash from the url (#section1)
        const htag= window.location.hash;
        if(!htag) return;

        //if it exits
        if(htag){
            //remove it, and replace it so we get the section id
            //and find the element with that id
            const element = document.getElementById(htag.replace("#",""));
            //if the element exists
            if(element){
                //scroll to it smoothly
                element.scrollIntoView({behavior:"smooth"});
            }
        }
    },[chapterData])


    if(!chapterData) return;

    
    return (
        <div className="p-8 max-w-3xl mx-auto">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-6">{chapterData.title}</h1>
                <Link href="/bookmarks" className="hover:underline underline-offset-2">View All Bookmarks</Link>
            </div>
            <p className="text-base font-light">{chapterData.summary}</p>
        
                {/*loop throught the maped fields*/}
                
                {
                    //take all the section sort them based on order field
                    chapterData.sections && Object.entries(chapterData.sections).sort((a, b) => a[1].order - b[1].order).map(([key, sectionMap]) => {
                        console.log("SECTION KEY:", key);
                        return(
                        <div key={key} id={key} className="mb-4 scroll-smooth">
                            <div className="flex justify-between">
                                <h2 className="font-semibold text-xl">{sectionMap.title}</h2>
                                <BookmarkButton enabled={bookmarkedSections.includes(key)} onClick={()=> handleBookmarkButtonClick(key, sectionMap.title, sectionMap.content
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
                        )
                    })
                }

            <Button onClick={() => router.push("/chapters")}>Back</Button>
        </div>
    );
}