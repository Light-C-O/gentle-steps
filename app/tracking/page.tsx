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
        <main className="flex justify-center mx-auto font-sans min-h-screen drop-shadow-xl/50">
            <div className="relative w-[90vw] max-w-3xl aspect-3/4">
                <img src="/paper.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover"/>
                    <div className="relative z-10 items-center justify-center h-full px-[8%]">
                        <div><NavBar/></div>
                        <h1 className="text-3xl font-bold mb-6">Tracking Week by Week</h1>
                        <div ref={emblaRef} className="overflow-hidden">
                                <div className="flex">
                                    {/* for each doc, create a silde in side the carousel*/}
                                    {tracks.map((track) => ( 
                                        <div key={track.id} className="min-w-full p-6">
                                            <div className="p-6 border rounded-xl shadow-md">
                                                <p className="text-gray-600">{track.week}</p>
                                                <h2 className="text-xl font-semibold">{track.title}</h2>
                                                <p className="text-gray-600">{track.sizeComp}</p>
                                                <p className="text-gray-600">{track.development}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 mt-6">
                                    {/* prevous button */}
                                    <button onClick={goToPrev} className="p-4 rounded-4xl bg-red-500 active:bg-amber-500">
                                        Previous Week
                                    </button>
                                    {/* next button */}
                                    <button onClick={goToNext} className="p-4 rounded-4xl bg-red-500 active:bg-amber-500">
                                        Next Week
                                    </button>
                                </div>
                        </div>
                    </div>
            </div>
        </main>
    );
}

