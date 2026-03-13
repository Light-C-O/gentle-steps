'use client';
import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import {useEffect, useState} from "react"

import NavBar from "@/components/navbar";
import Link from "next/link";
import { FAQ } from "@/types/faq";
import SearchFAQ from "@/components/searchfaq";

// type FAQ = {
//     id: string;
//     category: string;
//     question: string;
//     answer: string;
// }

//this page shows all the info for FAQs
export default function FaqPage() {
    const [faqs, setFaqs] = useState<FAQ []>([])

    

    useEffect (()=>{

        const fecthFAQs = async () => {
            const querySnapshot = await getDocs(collection(db, "faqs"));

            //covert intom objects
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as FAQ[];

            setFaqs(data)
        };
        fecthFAQs();
    }, []);
    

    return(
        <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <img src="/paper2.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover rounded-2xl"/>
                <div className="relative z-10 items-center justify-center h-full px-[8%]">
                    <div><NavBar/></div>
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                        <Link href={"/resources"}className="hover: underline underline-offset-2">For More</Link>
                    </div>
                    
                        <SearchFAQ faqs={faqs}/>
                    
                </div>
            </div>
        </main>
    )
}