import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";
import { main } from "flowbite-react/cli/main";

import Link from "next/link";

//this page shows all the info for FAQs
export default async function FaqPage() {
    const querySnapshot = await getDocs(collection(db, "faqs"));

    const faqs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return(
        <main>
            <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
            {faqs.map((faq: any) => (
            <Link href={`/chapters/${faq.id}`} key={faq.id}>
                <div key={faq.id} className="mb-6 p-4 border rounded-xl">
                    <h2 className="text-xl font-semibold">{faq.category}</h2>
                    <h4 className="text-xl font-semibold">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                </div>
            </Link>
            ))}

        </main>
    )
}