'use client';
import { db } from "@/data/firebase";

import { collection, getDocs } from "firebase/firestore";

import {useCallback, useEffect, useState} from "react";

import  useEmblaCarousel from "embla-carousel-react";

import NavBar from "@/components/navbar";

//the track collection structure/blue print
type Track = {
    id: string;
    title: string;
    sizeComp: string;
    development: string;
    week: number;
    visualUrl: string;
}


export default function TrackPage() {
    //create a box to store lists of tracks from the database
    const [tracks, setTracks] = useState<Track []>([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({loop:false});

    //runs once when the carousel first loads, 
    useEffect (() => {
        //get the data from the collection called tracks
        const fetchTracks = async () => {
            const querySnapshot = await getDocs(collection(db, "tracks"));
            //then converts them into objects
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Track[];

            //sort the sildes based on the week field from small to big
            data.sort((a,b)=> a.week - b.week)
            
            setTracks(data);
        };
        fetchTracks();
    }, []);



    const goToPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);
    const goToNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);
    
    return (
        <main className="flex justify-center mx-auto font-sans min-h-auto drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <img src="/paper2.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover rounded-2xl"/>
                    <div className="relative z-10 items-center justify-center h-full px-[8%]">
                        <div><NavBar/></div>
                        <h1 className="text-3xl font-bold mb-6">Tracking Week by Week</h1>
                        <div ref={emblaRef} className="overflow-hidden mb-4">
                                <div className="flex">
                                    {/* for each doc, create a silde in side the carousel*/}
                                    {tracks.map((track) => ( 
                                        <div key={track.id} className="min-w-full p-6">
                                            <div className="p-6 border rounded-xl shadow-md lex flex-col justify-between h-full">
                                                <h2 className="text-xl font-semibold text-center">{track.title}</h2>
                                                <img src={`/${track.visualUrl}`} alt={track.sizeComp} className="mx-auto object-contain"/>
                                                <p className="text-gray-600 text-center">{track.sizeComp}</p>
                                                <p className="text-gray-600 text-center">{track.development}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    {/* prevous button */}
                                    <button onClick={goToPrev} className="p-4 rounded-4xl bg-amber-500/50 active:bg-amber-500 absolute top-140 left-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.857 15.962a.5.5 0 0 0 .243.68l9.402 4.193c1.496.667 3.047-.814 2.306-2.202l-3.152-5.904c-.245-.459-.245-1 0-1.458l3.152-5.904c.741-1.388-.81-2.87-2.306-2.202l-3.524 1.572a2 2 0 0 0-.975.932z"/><path fill="currentColor" d="M8.466 15.39a.5.5 0 0 1-.65.233l-4.823-2.15c-1.324-.59-1.324-2.355 0-2.945L11.89 6.56a.5.5 0 0 1 .651.68z" opacity="0.5"/></svg>
                                    </button>
                                    {/* next button */}
                                    <button onClick={goToNext} className="p-4 rounded-4xl bg-amber-500/50 active:bg-amber-500 absolute top-140 right-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.143 15.962a.5.5 0 0 1-.244.68l-9.402 4.193c-1.495.667-3.047-.814-2.306-2.202l3.152-5.904c.245-.459.245-1 0-1.458L2.191 5.367c-.74-1.388.81-2.87 2.306-2.202l3.525 1.572a2 2 0 0 1 .974.932z"/><path fill="currentColor" d="M15.533 15.39a.5.5 0 0 0 .651.233l4.823-2.15c1.323-.59 1.323-2.355 0-2.945L12.109 6.56a.5.5 0 0 0-.651.68z" opacity="0.5"/></svg>
                                    </button>
                                </div>
                        </div>
                    </div>
            </div>
        </main>
    );
}

