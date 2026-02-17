import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Carousel} from "react-bootstrap/Carousel";
import {useState} from "react";

export default async function TrackPage() {
    const [carousel, setCarouel] = useState(0)

    const handleSelect = (selectedCarousel) => {
        setCarouel(selectedCarousel)
    };

    const querySnapshot = await getDocs(collection(db, "tracks"));

    const tracks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));



    return (
        <main className="p-8">

            <Carousel activeIndex={carousel} onSelect={handleSelect}>
                {tracks.map((track: any) => (
                    <div key={track.id} className="mb-6 p-4 border rounded-xl">
                        <h2 className="text-xl font-semibold">{track.title}</h2>
                        <p className="text-gray-600">{track.sizeComp}</p>
                    </div>
                ))};
            </Carousel>
            <h1 className="text-3xl font-bold mb-6">Traking Week by Week</h1>

            
        </main>

    );
}

