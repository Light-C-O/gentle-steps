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

    const handleLogin = async ()=>{
        if (!email || !password){
            alert("Please enter email or password");
            return;
        }

        try {
            setLoading(true)
            //Try logging in
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/chapters");
        } catch (loginError: any) {
            console.log("Login failed, attempt login:", loginError);
        } finally{
            setLoading(false)
        }
    };

    const handleSignup = async () => {
        //avoid any white space
        if (!username.trim()){
            alert("Please enter a username");
            return;
        }

        if (!email || !password){
            alert("Please enter a email and pasword");
            return;
        }

        try{
            setLoading(true);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //display name
            await updateProfile(user, { displayName: username });

            //create a user
            await setDoc(doc(db, "users", user.uid), {
            username: username.trim(),
            description: "",
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
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <main className="flex items-center justify-center mx-auto min-h-screen font-sans overflow-hidden drop-shadow-xl/50">
            <div className="relative w-[90vw] max-w-3xl aspect-3/4">
                <img src="/book2.svg" className="absolute inset-0 w-full h-full object-contain rounded-2xl" alt="Book background" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-[8%]">
                    <h1 className="text-[clamp(28px,4vw,48px)] font-bold mb-4 text-center">
                Welcome to Gentle Steps</h1>
                    <h1 className="text-[clamp(16px,2.5vw,24px)] mb-4 text-center">Login or Sign Up</h1>

                    <div className="align-center">
                        <form className="flex flex-col gap-4 w-full"
                        >
                            <input 
                            type="text"
                            placeholder="Username (for new users)"
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

                            <div className="flex items-center justify-between">
                                <button type="button" disabled={loading} onClick={handleSignup}  className="bg-indigo-600 text-gray-100 p-2 rounded-lg hover:bg-amber-400 hover:text-gray-900 active:bg-amber-600">
                                    {/* if loading, button says prosessing otherwise say open book */}
                                    {loading? "Processing...": "Welcome"}
                                </button>
                                <div>OR</div>
                                <button type="button" disabled={loading} onClick={handleLogin} className="bg-indigo-600 text-gray-100 p-2 rounded-lg hover:bg-amber-400 hover:text-gray-900 active:bg-amber-600">
                                    {/* if loading, button says prosessing otherwise say open book */}
                                    {loading? "Opening...": "Welcome Back"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

