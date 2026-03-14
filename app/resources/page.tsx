import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";

import Link from "next/link";
import NavBar from "@/components/navbar";
import PaperBackground from "@/components/paper-background";


//this page shows all the info for Resouces
export default async function ResourcePage() {
    const querySnapshot = await getDocs(collection(db, "resources"));

    const resources = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return(
        <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <PaperBackground/>
                <div className="relative z-10 items-center justify-center h-full px-[8%] text-red-900 dark:text-gray-700 mt-10">
                    <Link href={"/faqs"} className="border rounded-2xl py-3 px-2 active:bg-gray-200/50">Back</Link>
                    <h1 className="text-3xl font-bold mb-6 mt-2 text-center">Resources</h1>
                    <div className="md:grid grid-cols-2">
                        {resources.map((resource:any) => (
                            <div key={resource.id} className="mb-6">
                                <small className="font-light uppercase"> {resource.category}</small>
                                <h2 className="text-xl font-semibold">{resource.title}</h2>
                                {/* <p className="text-xl italic text-gray-400">{resource.description}</p> */}
                                <Link href={`${resource.resourceUrl}`} target="_blank">
                                    <p className=" hover:underline underline-offset-2 text-amber-600">{resource.resourceUrl}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}