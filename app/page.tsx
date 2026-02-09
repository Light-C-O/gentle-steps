'use client'
import Button from "@/components/button";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <Button text="Hello"/>    
    </div>
  );
}
