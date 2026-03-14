'use client';
import { useState } from "react";
import { auth, db } from "@/data/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BulbButton from "@/components/bulb";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        if (!username.trim()) {
        alert("Please enter a username.");
        return;
        }
        if (!email || !password) {
        alert("Please enter an email and password.");
        return;
        }
        try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: username });

        //create a user
        await setDoc(doc(db, "users", user.uid), {
            username: username.trim(),
            description: "",
            email: email.trim(),
            createdAt: new Date(),
        });

        //give the new user a template of a pre-made collection
        const templateSnapshot = await getDocs(collection(db, "checklistTemplates"));
        for (const templateDoc of templateSnapshot.docs) {
            await setDoc(
            doc(db, "users", user.uid, "checklists", templateDoc.id),
            templateDoc.data()
            );
        }

        router.push("/home");
        } catch (err: any) {
        alert(err.message ?? "Something went wrong. Please try again.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center mx-auto min-h-screen font-sans overflow-hidden drop-shadow-xl/50">
        <div className="relative w-[90vw] max-w-3xl aspect-3/4 overflow-hidden">
            <div className="relative flex flex-col items-center justify-center h-auto px-[8%] rounded-2xl mt-10 py-5 bg-[#FFF7EB] dark:bg-[#E9E2E2]">
            <BulbButton />
            <h1 className="text-[clamp(28px,4vw,48px)] font-bold mb-4 text-center dark:text-gray-800">
                Create Account
            </h1>
            <h1 className="text-[clamp(16px,2.5vw,24px)] mb-4 text-center dark:text-gray-800">
                Join us today
            </h1>

            <div className="w-full dark:text-gray-800">
                <div className="flex flex-col gap-4 w-full">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                />
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
                    onClick={handleSignup}
                    className="bg-indigo-600 text-gray-100 p-2 rounded-lg hover:bg-amber-400 hover:text-gray-900 active:bg-amber-600"
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
                </div>
            </div>

            <p className="mt-6 text-sm dark:text-gray-700">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:underline">
                Login
                </Link>
            </p>
            </div>
        </div>
        </main>
    );
}