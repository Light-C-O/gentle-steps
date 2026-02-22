'use client';
import {useState, useEffect} from "react";
import {auth, db} from "@/data/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from "firebase/auth";
import {doc, setDoc, collection, getDocs} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AuthPage(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pendingSignup, setPendingSignup] = useState<{username: string, email:string} | null>(null);

    const router = useRouter();


    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if(user && pendingSignup) {
                try {
                    //force token to refresh so fire rules pass
                    await user.getIdToken(true);

                    //update display name
                    await updateProfile(user, {displayName: pendingSignup.username});

                    //create user document
                    await setDoc(doc(db, "users", user.uid), {
                        username: pendingSignup.username,
                        email:pendingSignup.email,
                        createdAt: new Date(),
                    });

                    //copy the template to new user
                    const templateSnapshot = await getDocs(collection(db, "checklistTemplates"));
                    for(const templateDoc of templateSnapshot.docs){
                        await setDoc(
                            doc(db, "users", user.uid, "checklists", templateDoc.id), templateDoc.data()
                        );
                    }

                    //clear pending signup
                    setPendingSignup(null);

                    //success, go to hompage
                    router.push("/home");

                } catch (err) {
                    console.error("Error completing the signup:", err);
                    alert("Failed, Please try again");
                }
            }
        });
        return()=> unsubscribe();
    },[pendingSignup, router]);

    const handleAuth = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!email || !password){
            alert("Please enter and password");
            return;
        }
        try {
        //Try logging in
        console.log('Attempting signIn with:', email, password);
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/home");
        } catch (loginError: any) {
            console.log("Login failed, attempt signup:", loginError);

            if(loginError.code === "auth/user-not-found" || loginError.code === "auth/invalid-credential"){
                //sign up flow
                if (!username){
                    alert("Please enter a username");
                    return;
                }

                try {
                    //then create an account
                    await createUserWithEmailAndPassword (auth, email, password);
                    //set a pending signup to trigger firestore writes in auth listener
                    setPendingSignup({ username, email});
                } catch(signupError) {
                console.error("Sign up error:", signupError);
                alert("Failed to create account. Please try again.");
                }
            } else {
                console.error("Login error:", loginError);
                alert("Incorrect password or login error.");
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
}

