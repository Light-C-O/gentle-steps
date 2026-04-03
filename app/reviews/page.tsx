import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";

import Link from "next/link";

import RateStar from "@/components/rating";
import BooKBackground from "@/components/book-background";
import BulbButton from "@/components/bulb";
import LogoIcon from "@/components/logo";

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
            <div className="relative w-[90vw] max-w-3xl ">
                <BooKBackground/>
                <div className="relative z-10 h-full px-[8%] text-red-900 dark:text-gray-700 mt-1 mb-10 md:mt-15">
                    <div className="grid gap-5 mb-8 md:gap-3">
                        <div className="flex justify-between items-center justify-items-center">
                            <Link href="/" className="font-bold hover:bg-amber-400/50 dark:hover:bg-gray-400/50 border rounded p-2">Log In</Link>
                            <BulbButton/>
                        </div>
                        <div className="justify-self-center w-40 h-40 border rounded-full"><img src="../transparent-logo_2.png" alt="main logo" className="mx-auto"/></div>
                        <h1 className="text-3xl font-bold text-center">See all the Reviews!</h1>
                    </div>
                    
                    <div className="flex flex-col md:grid grid-cols-2 gap-2">
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