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

    //to prevent double submission
    const [loading, setLoading] = useState(false);


    const router = useRouter();

    const handleAuth = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
            

        if (!email || !password){
            alert("Please enter email and password");
            setLoading(false);
            return;
        }

        try {
        //Try logging in
        console.log('Attempting signIn with:', email, password);
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/chapters");
        } catch (loginError: any) {
            console.log("Login failed, attempt signup:", loginError);

            //create only if a user doesn't exist
            if (loginError.code === "auth/user-not-found"){
                //avoid any white space
                if (!username.trim()){
                    alert("Please enter a username");
                    setLoading(false);
                    return;
                }

                try{
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;

                    //display name
                    await updateProfile(user, { displayName: username });

                    //create a user
                    await setDoc(doc(db, "users", user.uid), {
                    username: username.trim(),
                    email: email.trim(),
                    createdAt: new Date(),
                    });

                    //copy the template to new user 
                    const templateSnapshot = await getDocs(collection(db, "checklistTemplates")); 
                    for(const templateDoc of templateSnapshot.docs){
                        await setDoc( doc(db, "users", user.uid, "checklists", templateDoc.id), templateDoc.data() );
                    }
                    //success
                    router.push("/chapters");

                } catch (error) {
                    console.error("Sign up error:", error);
                    alert("Failed to create account. Please try again.");
                    setLoading(false);
                }

            } else {
                alert("Incorrect password");
                setLoading(false);
            }
        }   
    };

    return (
        <main className="p-8 max-w-3xl mx-auto min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <h1 className="text-4xl font-bold mb-6">
        Welcome to Gentle Steps</h1>
            <h1 className="text-2xl mb-4">Login or Sign Up</h1>

            <div className="max-w-2xl">
                <form 
                onSubmit={handleAuth}
                className="flex flex-col gap-4"
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

                    <button disabled={loading} className="bg-indigo-600 text-gray-100 p-2 rounded-lg hover:bg-amber-400 hover:text-gray-900 active:bg-amber-600">
                        {/* if loading, button says prosesscing otherwise say continue */}
                        {loading? "Processing...": "Open Book"}
                    </button>
                </form>
            </div>
        
        </main>
    );
}

