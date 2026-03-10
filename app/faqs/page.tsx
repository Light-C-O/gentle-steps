'use client';
import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import {useEffect, useState} from "react"

import NavBar from "@/components/navbar";
import Link from "next/link";

type FAQ = {
    id: string;
    category: string;
    question: string;
    answer: string;
}

//this page shows all the info for FAQs
export default function FaqPage() {
    const [faqs, setFaqs] = useState<FAQ []>([])

    //for a dropdewn for the anser of each faq question
    const [answerOpen, setAnswerOpen] = useState<string | null>(null);

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
                <img src="/paper2.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="relative z-10 items-center justify-center h-full px-[8%]">
                    <div><NavBar/></div>
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                        <Link href={"/resources"}className="hover: underline underline-offset-2">For More</Link>
                    </div>
                    <div className="md:grid grid-cols-2 gap-4 mb-4">
                        {faqs.map((faq: any) => (
                            <div key={faq.id} className={`mb-6 p-4 border rounded-xl ${answerOpen === faq.id ? 'self-start' : ''}`}>
                                <h2 className="text-xl font-semibold">{faq.category}</h2>
                                <div className="grid">
                                    <button onClick={()=>setAnswerOpen(answerOpen === faq.id ? null : faq.id)} className="rounded-lg px-2 py-2 border border-amber-300 hover:bg-amber-100 active:bg-amber-200 focus:bg-amber-200 w-full">
                                        <div className="text-x text-left font-semibold">{faq.question}</div>
                                    </button>
                                    {answerOpen === faq.id && (
                                        <div className="mt-3 gap-3 shadow-md rounded-md p-4">
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}