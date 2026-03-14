'use client';

import Link from "next/link";

import BulbButton from "@/components/bulb";
import BooKBackground from "@/components/book-background";

export default function HomePage() {


  //on click of the button go to another page
  return (
    <main className="flex items-center justify-center mx-auto min-h-screen font-sans overflow-hidden drop-shadow-xl/50">
      <div className="relative w-[90vw] max-w-3xl aspect-3/4 overflow-hidden">
        <BooKBackground/>
        <div className="relative flex flex-col items-center justify-center h-full px-[8%]">
          <BulbButton/>
            <h1 className="text-[clamp(28px,4vw,48px)] font-bold mb-4 text-center dark:text-gray-800">Gentle Steps</h1>
            
            {/* link to the chapters page */}
            <Link href="/chapters" className="bg-amber-400 hover:bg-indigo-600 text-2xl text-gray-900 px-4 py-4 rounded-2xl">
            Open Book 
            </Link>  
        </div>
      </div>
    </main>
  );
}




