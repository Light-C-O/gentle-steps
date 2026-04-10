'use client';

import Link from "next/link";

import BulbButton from "@/components/bulb";
import BooKBackground from "@/components/book-background";
import LogoIcon from "@/components/logo";

export default function HomePage() {
  //on click of the button go to another page
  return (
    <main className="flex items-center justify-center mx-auto min-h-screen font-yomogi overflow-hidden drop-shadow-xl/50">
      <div className="relative w-[90vw] max-w-3xl aspect-3/4 overflow-hidden">
        <BooKBackground/>
        <div className="relative flex flex-col items-center justify-center h-full px-[8%]">
            <div className="absolute top-10 right-10 sm:top-20 sm:right-20 dark:text-gray-800"><BulbButton/></div>
            <div className="grid">
              <h1 className="text-[clamp(40px,4vw,60px)] font-bold mb-4 text-center dark:text-gray-800 font-chango">Gentle Steps</h1>
              <div className="justify-self-center w-40 sm:w-100 h-auto mb-5 md:mb-10 rounded-full border-red-900 dark:border-gray-800"><LogoIcon/></div>
              
              {/* link to the chapters page */}
              <Link href="/chapters" className="bg-amber-400 hover:bg-amber-600 text-[clamp(20px,4vw,30px)] text-gray-900 hover:text-gray-100 p-2 sm:p-4 rounded-2xl dark:text-gray-100 text-center dark:hover:bg-indigo-500 dark:bg-blue-500 cursor-pointer font-knewave">Open Book</Link> 
            </div> 
        </div>
      </div>
    </main>
  );
}




