'use client';
import {useState} from "react";
import {auth, db} from "@/data/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import {doc, setDoc, collection, getDocs} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AuthPage(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleAuth = async (e: React.SyntheticEvent) => {e.preventDefault();

        if (!email || !password){
            alert("Please enter and password");
            return;
        }
        try {
        //Tr logging in
        console.log('Attempting signIn with:', email, password);
        await signInWithEmailAndPassword(auth, email, password);
        //success
        router.push("/home");
        } catch (error: any) {
            if (error.code !== "auth/invalid-credential"){
                console.error("Unexpected sign-in errror:", error);
            }
            if (
                error.code === "auth/invalid-credential"
            ) {
                if (!username){
                    alert("Please enter a username");
                    return;
                }

                //then create an account
                const userCredential = 
                await createUserWithEmailAndPassword (auth, email, password);

                const user = userCredential.user;

                //then add the user 
                await updateProfile(user, { displayName: username});

                //save user info in firebase
                await setDoc(doc(db, "users", user.uid), {
                    username, 
                    email, 
                    createdAt:new Date(), 
                });

                //copy the template to new user
                const templateSnapshot = await getDocs(collection(db, "checklistTemplates"));

                //Use Promise.all to wait for all setDoc promises
                await Promise.all(templateSnapshot.docs.map(async (templateDoc) => {
                        await setDoc(
                            doc(db, "users", user.uid, "checklists", templateDoc.id),
                            templateDoc.data()
                        );
                    })
                );

                router.push("/");

                } else{
                alert("Incorrect password or login error.");
                console.error(error);
            }
        }
    };

    return (
        <main className="p-8">
            <h1 className="text-2xl mb-4">Login or Sign Up</h1>

            <form 
            onSubmit={handleAuth}
            className="gap-4 max-w-md"
            >
                <input 
                type="text"
                placeholder="Username (for new users)"
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2"
                />

                <input 
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2"
                />

                <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2"
                />

                <button className="bg-indigo-600 text-gray-100 p-2 rounded-lg">
                    Continue
                </button>

            </form>
        </main>
    );
};

