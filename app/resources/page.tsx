'use client'
import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";

import { useState, useEffect } from "react";

import Link from "next/link";

import PaperBackground from "@/components/paper-background";
import SearchResource from "@/components/searchresource";

import { Resource } from "@/types/resource";

//this page shows all the info for Resources
export default  function ResourcePage() {
    const [resources, setResources] = useState<Resource []>([])

    useEffect (()=>{
        const fecthResources = async () => {
            const querySnapshot = await getDocs(collection(db, "resources"));
            //covert into objects
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Resource[];

            setResources(data)
        };
        fecthResources();
    }, []);

    return(
        <main className="flex justify-center mx-auto min-h-auto font-yogomi drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <PaperBackground/>
                <div className="relative z-10 items-center justify-center h-full px-[8%] text-red-900 dark:text-gray-700 mt-10">
                    <div className="grid">
                        <div className="flex justify-between items-center mb-10">
                            <div className="cursor-pointer border rounded-2xl py-3 px-4 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] active:bg-gray-200/50">
                                <Link href={"/faqs"} className=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.857 15.962a.5.5 0 0 0 .243.68l9.402 4.193c1.496.667 3.047-.814 2.306-2.202l-3.152-5.904c-.245-.459-.245-1 0-1.458l3.152-5.904c.741-1.388-.81-2.87-2.306-2.202l-3.524 1.572a2 2 0 0 0-.975.932z"/><path fill="currentColor" d="M8.466 15.39a.5.5 0 0 1-.65.233l-4.823-2.15c-1.324-.59-1.324-2.355 0-2.945L11.89 6.56a.5.5 0 0 1 .651.68z" opacity="0.5"/></svg></Link>
                            </div>
                            <h1 className="text-3xl font-bold text-center">Resources</h1>
                            <div></div>
                        </div>
                        <SearchResource resources={resources}/>
                    </div>
                </div>
            </div>
        </main>
    )
}