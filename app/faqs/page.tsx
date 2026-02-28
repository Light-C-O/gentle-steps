import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";

import NavBar from "@/components/navbar";
import Link from "next/link";

//this page shows all the info for FAQs
export default async function FaqPage() {
    const querySnapshot = await getDocs(collection(db, "faqs"));

    const faqs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

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
                    
                    {faqs.map((faq: any) => (
                        <div key={faq.id} className="mb-6 p-4 border rounded-xl">
                            <h2 className="text-xl font-semibold">{faq.category}</h2>
                            <h4 className="text-xl font-semibold">{faq.question}</h4>
                            <p className="text-gray-600">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}