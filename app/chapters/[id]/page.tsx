'use client';
import { db } from "@/data/firebase";
import { doc, deleteDoc, getDocs, query, where, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import BookmarkButton from "@/components/bookmark-button";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Button from "@/components/button";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import ProgressBar from "@/components/progress-bar";

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
    //stores the loggied user, it can be a string or null
    const [userId, setUserId] = useState<string | null>(null);

    // Get the chapter id from the params and set its type as string
    const chapterId= params.id as string;

    // the Chapter object is optional, null or not, defualt value null
    // const [chapterData, setChapterData] = useState <Chapter | null>(null);


    //for the carousel for each chapter
    const[emblaRef, emblaApi] = useEmblaCarousel({loop:false});

    //store it as array
    const[chapterIds, setChapterIds] = useState<(Chapter &{id:string})[]>([]);


    //related to the bookmark per section, by default it is an array, 
    const [bookmarkedSections, setbookmarkedSections] = useState<string[]>([]);

    //check the user
    const auth = getAuth();

    //what will happen when clicks the bookmark button
    const handleBookmarkButtonClick = async (chapter:Chapter &{id:string}, sectionId:string, sectionTitle: string, content: string[] | string) => {
         //get the user id 
        const user = auth.currentUser;
        //if not the user id do nothing
        if (!user) return;


        //get the reference
        const bookmarksRef = collection(db, "users", user.uid, "bookmarks");

        //first check if it has already been bookmarked or not
        const q = query(bookmarksRef, 
            where("chapterId", "==", chapter. id), 
            where("sectionId", "==", sectionId)
            );

        const snapshot = await getDocs(q);

        //if not empty(has been bookmarked)
        if(!snapshot.empty){
            //delete it
            const bookmarkId = snapshot.docs[0].id;
            await deleteDoc(doc(db, "users", user.uid, "bookmarks", bookmarkId));

            // update correctly using composite id
            setbookmarkedSections(prev=>prev.filter(id => id !== `${chapter.id}-${sectionId}`));
        }else{
            //if empty (not bookmarked) - add it

            //create a new bookmark document in the subcollection called bookmarks
            await addDoc(bookmarksRef, {
                chapterId: chapter.id,
                chapterTitle: chapter.title,
                sectionId,
                sectionTitle,
                content,
                createdAt: serverTimestamp(),
            });

            //update using composite id
            setbookmarkedSections(prev=>[...prev, `${chapter.id}-${sectionId}`],);
        }
    }


    //if(enabled) {
    //  setEnabled(false);
    //} else {
    //  setEnabled(true)
    //          }

    ////same thing^
    //  setbookmarkedSection(!bookmarkedSections);

    //for authentication
    useEffect (()=>{
        const unsubscribe = onAuthStateChanged (auth, (user)=>{
            //checks the user
            if(user) {
                setUserId(user.uid);//if logged in save the user id
            } else{
                setUserId(null);//otherwise, clear it
            }
        });
        return ()=> unsubscribe();
    },[auth])

    //for bookmark
    useEffect(()=>{
        //get all the bookmarks sections fo a chapter
        const fetchBookmarkSections = async ()=>{
            //get user
            const user = auth.currentUser;

            //if no user or a chapter id, do nothing
            if(!userId || !chapterId) return;

            //reference of the docs for a user
            const bookmarksRef = collection(db, "users", userId as string, "bookmarks");

            //ask for bookmark docs where this chapter id is the same in the docs
            const q = query(bookmarksRef, where ("chapterId" ,"==", chapterId));

            //get it
            const snapshot = await getDocs(q);

            //get ony the sectionId of the bookmark docs
            const sectionIds = snapshot.docs.map(doc=>`${doc.data().chapterId}-${doc.data().sectionId}`);
            
            //save
            setbookmarkedSections(sectionIds);
        };

        fetchBookmarkSections();
    },[userId, chapterId] )

    //create a carousel for each chapter
    useEffect (() => {
        //get the data from the collection called tracks
        const fetchChapters = async () => {
            const querySnapshot = await getDocs(collection(db, "chapters"));
            //then converts them into objects
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as (Chapter & {id:string})[];

            //sort the chapter sildes based on the order field from small to big
            data.sort((a,b)=> a.order - b.order);
            
            setChapterIds(data);
        };
        fetchChapters();
    }, []);

    //handle chapter clicked, loads the scren with chapter chosen centered
    //to navigate the specific section that is bookmarked
    useEffect(()=>{
        if (!emblaApi || chapterIds.length ===0) return;

        const scrollToHash = () => {
            //get the hash from the url (#section1)
            const htag= window.location.hash;
            if(!htag) return;

            //and find the element with that id
            const element = document.getElementById(htag.replace("#",""));
            
            //if the element exists
            if(element){
                //scroll to it smoothly
                element.scrollIntoView({behavior:"smooth"});
            }   
        };

        //make sure the page has been rendered aka, turn the compoment in an actiual DOM element to see on browser
        setTimeout(scrollToHash, 100);
        //find index of the chapter, if it matches chapter id
        const index = chapterIds.findIndex(c=>c.id === chapterId);

        if(index !== -1){
            //scroll the Embla carousel to the correct chapter slide
            emblaApi.scrollTo(index, true);
            // wait a bit for the carousel reposition and the section inside it is visible
            setTimeout(scrollToHash, 200);
        }

        //listen to hash changes when a user changes it in the url
        window.addEventListener("hashchange", scrollToHash);

        return ()=>window.removeEventListener("hashchange", scrollToHash);
    }, [emblaApi, chapterIds, chapterId])

    const goToPrev = useCallback(() => {
            emblaApi?.scrollPrev();
    }, [emblaApi]);
    const goToNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    return (
        <main className="flex justify-center mx-auto font-sans min-h-screen drop-shadow-xl/50">
            <div className="relative w-[90vw] max-w-3xl">
                <img src="/paper.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="relative z-10 items-center justify-center h-full px-[8%]">
                    <div className="flex justify-between mt-5">
                        <Link href="/chapters" className="hover:underline underline-offset-2">View All Chapters</Link>
                        <Link href="/bookmarks" className="hover:underline underline-offset-2">View All Bookmarks</Link>
                    </div>
                    <div className="mt-6"><ProgressBar emblaApi={emblaApi} total={chapterIds.length}/></div>
                    <div className="overflow-hidden mt-6" ref={emblaRef}>
                        <div className="flex">
                            {chapterIds.map((chapter)=>(
                                <div key={chapter.id} className="min-w-full max-w-3xl mx-auto px-4">
                                    <h1 className="text-3xl font-bold mb-5">{chapter.title}</h1>
                                    <p className="mt-5 text-base font-light">{chapter.summary}</p>
                                
                                    {/* loop throught the maped fields */}
                                    {/* //take all the section sort them based on order field */}
                                    {chapter.sections && Object.entries(chapter.sections).sort((a, b) => a[1].order - b[1].order).map(([key, sectionMap]) => (<div key={key} id={key} className="mb-4 scroll-smooth">
                                            <div className="flex justify-between">
                                                <h2 className="font-semibold text-xl">{sectionMap.title}</h2>
                                                <BookmarkButton enabled={bookmarkedSections.includes(`${chapter.id}-${key}`)} onClick={()=> handleBookmarkButtonClick(chapter as Chapter & {id:string}, key, sectionMap.title, sectionMap.content
                                                )}/>
                                            </div>

                                            {Array.isArray(sectionMap.content) 
                                                ? sectionMap.content.map((line, i) => (
                                                    <p key={i} className="mb-2">{line}</p>
                                                ))
                                                : <p>{sectionMap.content}</p>
                                            } 
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6"><ProgressBar emblaApi={emblaApi} total={chapterIds.length}/></div>
                    <div className="flex justify-between my-6">
                        {/* prevous button */}
                        <Button onClick={goToPrev} >
                            Previous Chapter
                        </Button>
                        {/* next button */}
                        <Button onClick={goToNext} >
                            Next Chapter
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}