'use client';
import {useState} from "react";
import { Resource } from "@/types/resource";
import Link from "next/link";

type SearchResourceProps = {
    resources: Resource[];
}

export default function SearchResource({resources} : SearchResourceProps){
    const[searchTerm, setSearchTerm] = useState('');
    //for a dropdewn for the anser of each faq question
    const [answerOpen, setAnswerOpen] = useState<string | null>(null);

    let filteredResources = resources;

    //if you search something
    if (searchTerm.length >= 1) {
        //allow these when searching
        filteredResources = resources.filter((resource)=> 
            resource.title.toLowerCase().includes(searchTerm) ||
            resource.category.toLowerCase().includes(searchTerm) ||
            resource.description.toLowerCase().includes(searchTerm)
        );
    }

    return (
        <div>
            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for resources..." className="px-2 py-3 border rounded-lg w-full mb-4 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] outline-none" />
            <div className="md:grid grid-cols-2 gap-4 mb-4">
                {filteredResources.map((resource) => (
                    <div key={resource.id} className="mb-6">
                        <small className="font-light uppercase"> {resource.category}</small>
                        <h2 className="text-xl font-semibold">{resource.title}</h2>
                        <div className="">
                            <button onClick={()=>setAnswerOpen(answerOpen === resource.id ? null : resource.id)} className="rounded-lg px-2 py-2 border border-amber-300 hover:bg-amber-100 active:bg-amber-200 focus:bg-amber-200 w-full">
                                <div className="text-x text-left font-semibold">{resource.title}</div>
                            </button>
                            {answerOpen === resource.id && (
                                <div className="mt-3 mb-3">
                                    <p className="text-lg italic">{resource.description}</p>
                                </div>
                            )}
                        </div>
                        <Link href={`${resource.resourceUrl}`} target="_blank">
                            <p className=" hover:underline underline-offset-2 text-amber-600">{resource.resourceUrl}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
} 

