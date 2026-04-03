'use client';
import { useState } from "react";

import { auth } from "@/data/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "next/navigation";
import Link from "next/link";

import BulbButton from "@/components/bulb";
import LogoIcon from "@/components/logo";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //to prevent double submission
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //check for error when logging in
    const handleLogin = async () => {
        //for email
        if (!email) {
        alert("Please enter your email.");
        return;
        } 

        //for password
        if (!password) {
        alert("Please enter your password.");
        return;
        } 
        
        try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password);
        //success
        router.push("/home");
        } catch (err: any) {
        alert("Invalid email or password. Please try again.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center mx-auto min-h-screen font-sans overflow-hidden drop-shadow-xl/50">
            <div className="relative w-[90vw] max-w-3xl overflow-hidden">
                <div className="relative flex flex-col items-center justify-center px-[8%] rounded-2xl mt-10 py-10 pb-14 bg-[#FFF7EB] dark:bg-[#E9E2E2]">
                    <div className="flex self-end dark:text-gray-900 justify-items-center">
                        <BulbButton />
                    </div>
                    <div className="w-40 h-40"><img src="../transparent_logo.png" alt="main logo" className="mx-auto"/></div>
                
                    <h1 className="text-[clamp(28px,4vw,48px)] font-bold mb-4 text-center dark:text-gray-800">
                        Welcome Back
                    </h1>
                    <h1 className="text-[clamp(16px,2.5vw,24px)] mb-4 text-center dark:text-gray-800">
                        Login to your account
                    </h1>

                    <div className="w-full dark:text-gray-800">
                        <div className="flex flex-col gap-4 w-full">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                        />
                        <button
                            type="button"
                            disabled={loading}
                            onClick={handleLogin}
                            className="dark:hover:bg-indigo-500 dark:bg-blue-500 text-gray-100 p-2 rounded-lg hover:bg-amber-600 bg-yellow-400 cursor-pointer"
                        >
                            {loading ? "Welcome Back..." : "Login"}
                        </button>
                        </div>
                    </div>

                    <p className="mt-6 text-sm dark:text-gray-700">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-indigo-600 hover:underline">
                        Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}