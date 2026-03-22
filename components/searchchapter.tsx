'use client';
import {useState} from "react";
import Link from "next/link";
import { Chapter } from "@/types/chapter";
// the thing being initalised
// type Chapter = {
//     id: string;
//     title: string;
//     order: number;
//     overview?: string;
// }

type SearchChapterProps = {
    chapters: Chapter[];
    onClick?: (value:string)=> void;
}

export default function SearchChapter({chapters, onClick} : SearchChapterProps){
    const[searchTerm, setSearchTerm] = useState('');

    let filteredChapters = chapters;

    //if you search something
    if (searchTerm.length >= 1) {
        //allow these when searching
        filteredChapters = chapters.filter((chapter)=> 
            chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chapter.order.toString().includes(searchTerm) ||

            // overview is optional
            chapter.overview?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        <div className="grid">
            <div className="md:flex justify-between">
                <h1 className="text-3xl font-bold mb-6">Chapters</h1>
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for a chapter..." className="px-2 py-3 rounded-lg border mb-4 hover:shadow-[inset_5px_-5px_30px_5px_#46464620] outline-none" />
            </div>
            <div className="md:grid grid-cols-2 gap-4 mb-4">
                {filteredChapters.map((chapter) => (
                <Link href={`/chapters/${chapter.id}`} key={chapter.id}>
                    <div className="flex">
                        <div key={chapter.id} className="mb-6 w-full items-center border rounded-xl hover:shadow-[inset_-5px_8px_50px_10px_#46464620] md:mb-0 p-4 md:h-auto md:items-center align-middle">
                            <small>Chapter {chapter.order}</small>
                            <h2 className="text-xl font-semibold">{chapter.title}</h2>

                            {/* mobile */}
                            <p className="text-gray-600 md:hidden">{chapter.overview}</p>
                            
                            {/* bigger than mobile */}

                            {chapter.overview &&
                                <p className="hidden md:block">
                                    {/* if the length in more than 40 characters, shorten it to 40 characters and leave a trail */}
                                    {chapter.overview.length > 40 ? `${chapter.overview.substring(0, 40)}...`: chapter.overview}
                                </p>
                            }
                        </div>
                    </div>
                </Link>
                ))}
            </div>
        </div>
    )
} 

