import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import RateStar from "@/components/rating";


import NavBar from "@/components/navbar";
import Link from "next/link";

//this page shows all the info for Reviews
export default async function ReviewPage() {
    //get the docs from the database
    const querySnapshot = await getDocs(collection(db, "reviews"));

    const reviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return(
        <main className="flex justify-center mx-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <img src="/bookr.svg" alt=" back cover" className="absolute inset-0 w-full h-full object-fill rounded-2xl"/>
                
                <div className="relative z-10 h-full px-[8%] mt-18 mb-10 md:mt-10">
                    <div className="grid gap-5 mb-10 md:gap-3">
                        <div className="flex justify-evenly items-center mb-5">
                            <p className="text-amber-800 text-center font-semibold p-2">You are now logged out!</p>
                            <Link href="/" className="font-bold hover:bg-amber-400/50 rounded p-2">Sign in</Link>
                        </div>
                        <h1 className="text-3xl font-bold text-center">See all the Reviews!</h1>
                    </div>
                    
                    <div className="flex flex-col md:grid grid-cols-2 gap-5">
                        {/* a for each loop */}
                        {reviews.map((review: any) => (
                            <div key={review.id} className="mb-6">
                                <RateStar rating= {review.rating}/>
                                <h2 className="text-xl font-semibold">{review.username}</h2>
                                <h4 className="text-lg italic">"{review.comment}"</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}