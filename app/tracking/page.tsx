'use client';
import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Carousel} from "flowbite-react";
import {useEffect, useState, useRef, use} from "react";

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
    const carouselRef = useRef<any>(null);

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
    
    return (
        <main className="p-8" >
            <h1 className="text-3xl font-bold mb-6">Traking Week by Week</h1>
                <div id="controls-carousel" className="relative w-full" data-carousel="static">
                    <div className=" min-h-300 md:min-h-400">
                        <Carousel
                            ref={carouselRef} 
                            leftControl={null}
                            rightControl={null}
                        >
                            {/* for each doc, create a silde in side the carousel*/}
                            {tracks.map((track) => ( 
                                <div key={track.id} className="mb-6 items-center p-4 border rounded-xl">
                                    <p className="text-gray-600">{track.week}</p>
                                    <h2 className="text-xl font-semibold">{track.title}</h2>
                                    <p className="text-gray-600">{track.sizeComp}</p>
                                    <p className="text-gray-600">{track.development}</p>
                                </div>
                            ))}
                        </Carousel>
                        {/* prevous button */}
                        <button onClick={()=>carouselRef.current?.prev} className="p-4 rounded-4xl bg-red-500 active:bg-amber-500">
                            Previous Week
                        </button>
                        {/* next button */}
                        <button onClick={()=>carouselRef.current?.next} className="p-4 rounded-4xl bg-red-500 active:bg-amber-500">
                            Next Week
                        </button>
                    </div>
                </div>
        </main>

    );
}

