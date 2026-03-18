'use client';
import {useState} from "react";
import { FAQ } from "@/types/faq";

type SearchFAQProps = {
    faqs: FAQ[];
    onClick?: (value:string)=> void;
}

export default function SearchFAQ({faqs, onClick} : SearchFAQProps){
    //for a dropdewn for the anser of each faq question
    const [answerOpen, setAnswerOpen] = useState<string | null>(null);

    const[searchTerm, setSearchTerm] = useState('');

    let filteredFAQs = faqs;

    //if you search something
    if (searchTerm.length >= 1) {
        //allow these when searching
        filteredFAQs = faqs.filter((faq)=> 
            faq.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        <div>
            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for a faq..." className="px-2 py-3 rounded-lg w-50% mb-4 shadow-[inset_5px_-5px_30px_5px_#46464620] outline-none" />
            <div className="md:grid grid-cols-2 gap-4 mb-4">
                {filteredFAQs.map((faq) => (
                    <div key={faq.id} className={`p-4 ${answerOpen === faq.id ? 'self-start' : ''}`}>
                        <h2 className="text-xl font-semibold">{faq.category}</h2>
                        <div className="">
                            <button onClick={()=>setAnswerOpen(answerOpen === faq.id ? null : faq.id)} className="rounded-lg px-2 py-2 border border-amber-300 hover:bg-amber-100 active:bg-amber-200 focus:bg-amber-200 w-full">
                                <div className="text-x text-left font-semibold">{faq.question}</div>
                            </button>
                            {answerOpen === faq.id && (
                                <div className="mt-3 gap-3 p-4">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 

