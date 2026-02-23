'use client';

import Link from "next/link";

export default function HomePage() {

  //on click of the button go to another page
  return (
    <main className="flex p-8 max-w-3xl mx-auto min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Gentle Steps
      </h1>
      
      {/* link to the chapters page */}
      <Link href="/chapters" className="bg-amber-400 hover:bg-indigo-600 text-2xl text-gray-900 px-4 py-4 rounded-2xl">
      Open Book 
      </Link>    
    </main>
  );
}




