'use client';
import { db, auth} from "@/data/firebase";

import {collection, doc, getDocs, updateDoc, onSnapshot, deleteDoc} from "firebase/firestore";
import {onAuthStateChanged, updatePassword, deleteUser, verifyBeforeUpdateEmail, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";

import {useEffect, useState} from "react";

import { useRouter } from "next/navigation";

import AccountButton from "@/components/account-button";
import Link from "next/link";

import PaperBackground from "@/components/paper-background";

type User = {
    id:string;
    username: string;
    email: string;
    description: string;
    createdAt: any;
}

export default function SecurityPage(){
    const router = useRouter();
    //stores the loggied user, it can be a string or null
    const [userId, setUserId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<User|null>(null);

    //by default empty string
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState("");

    //for authentication
    useEffect (()=>{
        const unsubscribe = onAuthStateChanged (auth, (user)=>{
            //checks the user
            if(user) {
                setUserId(user.uid);//if logged in save the user id
            } else{
                setUserId(null);//otherwise, clear it
            }
        });
        return ()=> unsubscribe();
    },[])

    //get the user
    useEffect(()=>{
        if(!userId) return;

        const userRef = doc(db, "users", userId);

        const unsubscribe = onSnapshot(userRef, (snapshot)=>{
            if(!snapshot.exists()) return;

            const data = snapshot.data();
            
            const UserData: User = {
                id: snapshot.id,
                username: data.username,
                email: data.email,
                description: data.description,
                createdAt: data.createdAt
            };
            setUserInfo(UserData);
            setUsername(data.username);
            setEmail(data.email);
            setDescription(data.description);
        });
        return()=> unsubscribe();
    }, [userId]);

    //related to the email once a user logs back in
    useEffect(()=>{
        if(!auth.currentUser || !userId || !userInfo) return;

        const currentAuthEmail = auth.currentUser.email;
        const firestoreEmail = userInfo.email;

        if(currentAuthEmail && currentAuthEmail !== firestoreEmail){
            updateDoc(doc(db, "users", userId),{email: currentAuthEmail})
            .then (()=> setEmail(currentAuthEmail))//update local
            .catch((error)=>console.error("Failed to update email in firestore:", error))
        }
    }, [userId, userInfo?.email])


    //fir username and description
    const handleUpdateUsername = async ()=>{
        if (!userId) return;

        await updateDoc (doc(db, "users", userId),{username: username || ""});
        alert("Username has been updated!");
    };

    //fir username and description
    const handleUpdateDescription = async ()=>{
        if (!userId) return;

        await updateDoc (doc(db, "users", userId),{description: description || ""});
        alert("Description has been updated!");
    };

    //update an email
    const handleUpdateEmail = async ()=>{
        if (!auth.currentUser || !userId) return;

        try{
            //prompt for password
            const password = prompt("Please enter your current password to confirm:")
            if(!password) return;

            //check if password matches
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email!, password
            );

            await reauthenticateWithCredential(auth.currentUser, credential);

            //check to see 
            //console.log("Current email:", auth.currentUser?.email);
            //console.log("Is verified:", auth.currentUser?.emailVerified);
            //send a verification email to the new email
            await verifyBeforeUpdateEmail(auth.currentUser, email);
            
            //inform the user
            alert("A verification email has been sent to new email.\n Please click the link to verify your new email.\n Your record will be updated once you log in again with the new email");

            //update after user click the verification link. 
        }catch(error:any){
            console.error("full error:", error)
            console.error("reauthentication failed:", error)
            if(error.code === "auth/requires-recent-login"){
                alert("Please log out and log back in before changing your email");
            } else if(error.code === "auth/invalid-email"){
                alert("The email entered is invalid")
            } else if(error.code === "auth/email-already-in-use"){
                alert("The email is already in use")
            } else if(error.code === "auth/wrong-password"){
                alert("Wrong password")
            }else{
                console.error(error)
            alert("Something went wrong")
            }
        }
    };

    //changing password
    const handleUpdatePassword = async ()=>{
        if (!auth.currentUser || password.length <6) {
            alert("Password must be 6 characters long");
            return;
        }
        
        try{
            await updatePassword(auth.currentUser, password);
            alert("Password has been updated!");
        }catch(error:any){
            alert("Something went wrong");
        }
    };

    //to delete the user account
    const handleDeleteAccount = async () => {
        if (!auth.currentUser || !userId) return;

        const confirmDelete = confirm("Are you sure you want this account deleted? It cannot be restored");
        if(!confirmDelete) return;

        try {
            //delete first the subcollections
                //notes
                const notesRef = collection(db, "users", userId, "notes");
                const notesSnap = await getDocs(notesRef);

                for (const docSnap of notesSnap.docs) {
                    await deleteDoc(docSnap.ref);
                }

                //bookmarks
                const bookmarksRef = collection(db, "users", userId, "bookmarks");
                const bookmarksSnap = await getDocs(bookmarksRef);

                for (const docSnap of bookmarksSnap.docs) {
                    await deleteDoc(docSnap.ref);
                }

                //checklists
                const checklistsRef = collection(db, "users", userId, "checklists");
                const checklistsSnap = await getDocs(checklistsRef);

                for (const docSnap of checklistsSnap.docs) {
                    await deleteDoc(docSnap.ref);
                }

            //then delete the fields related to the user 
            await deleteDoc(doc(db, "users", userId));

            // and then delete the user - the order of deletion matters
            await deleteUser(auth.currentUser);

            

            router.push("/");
            alert("Account has been deleted! Sad to see you go :(");
        }catch(error:any){//if any error, catch it
            if(error.code === "auth/requires-recent-login"){
                alert("Session ended. Please log out and log back in before deleting the account");
            } else{
                console.log(error)
                alert("Something went wrong");
            }
        }
    };

    return(
        <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <PaperBackground/>
                <div className="relative z-10 items-center justify-center h-full px-[8%] text-red-900 dark:text-gray-700 mt-10">
                    <div className="grid">
                        <div className="border rounded-2xl py-3 px-4 active:bg-gray-200/50 justify-self-start">
                            <Link href={"/profile"} className=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.857 15.962a.5.5 0 0 0 .243.68l9.402 4.193c1.496.667 3.047-.814 2.306-2.202l-3.152-5.904c-.245-.459-.245-1 0-1.458l3.152-5.904c.741-1.388-.81-2.87-2.306-2.202l-3.524 1.572a2 2 0 0 0-.975.932z"/><path fill="currentColor" d="M8.466 15.39a.5.5 0 0 1-.65.233l-4.823-2.15c-1.324-.59-1.324-2.355 0-2.945L11.89 6.56a.5.5 0 0 1 .651.68z" opacity="0.5"/></svg></Link>
                        </div>

                        <div className="grid">
                            <h1 className="text-3xl font-bold my-6 justify-self-center">Account & Security</h1>
                            {!userInfo ? (
                                <div>Loading... Are you logged in?</div>
                                ):(
                                <div className="space-y-4 mb-10">
                                    {/* Username */}
                                    <div className="grid">
                                        <label className="font-semibold uppercase">Username</label>
                                        <div className="flex justify-between items-center">
                                            <input 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="border rounded-lg p-2 w-auto text-2xl"/>
                                            <AccountButton onClick={handleUpdateUsername}>Save Username</AccountButton>
                                        </div>
                                        
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <div className="grid">
                                            <label className="uppercase">About You</label>
                                            <textarea 
                                            placeholder="Tell something about yourself..." 
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="border p-2 overflow-auto text-2xl rounded-lg  outline-none" 
                                            cols={20}
                                            rows={5}
                                            ></textarea>
                                        </div>
                                        <AccountButton onClick={handleUpdateDescription}>Save Description</AccountButton>
                                    </div>
                                        

                                    {/* Email */}
                                    <div>
                                        <div className="grid">
                                            <label className="uppercase font-semibold">Email</label>
                                            <small className="text-red-500 font-mono">A verification will be sent to the current email</small>

                                            <div className="flex justify-between items-center">
                                                <input 
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="border p-2 rounded-lg w-auto text-lg"/>
                                                <AccountButton onClick={handleUpdateEmail}>Update Email</AccountButton>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    {/* Password */}
                                    <div className="grid">
                                        <label className="uppercase">Password</label>
                                        <div className="flex justify-between items-center">
                                            <input
                                            placeholder="Minimum 6 characters"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="border p-2 rounded-lg text-lg"/>
                                        
                                            <AccountButton onClick={handleUpdatePassword}>Update Password</AccountButton>
                                        </div>
                                    </div>

                                    {/* delete account */}
                                    <div className="border-t-5 border-red-700 grid justify-center">
                                        <div className="text-red-500 uppercase p-4 font-black">Danger Zone - Proceed with caution</div>
                                        <div className="justify-self-center mt-2">
                                            <button className="px-10 py-4 bg-linear-to-b from-red-500 via-red-600 to-red-700 text-white font-bold rounded-full border-4 border-red-900 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-4px_8px_rgba(0,0,0,0.3),0_8px_16px_rgba(0,0,0,0.4)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.2)] transition-all cursor-pointer" onClick={handleDeleteAccount} >Delete Account</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}