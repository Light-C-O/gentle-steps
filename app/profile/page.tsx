'use client';
import { db, auth} from "@/data/firebase";

import { doc, onSnapshot, updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

import {useEffect, useState} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import PaperBackground from "@/components/paper-background";
import AccountButton from "@/components/account-button";

type User = {
    id:string;
    username: string;
    email: string;
    description: string;
    profileImageUrl?: string;
    createdAt: any;
}

export default function ProfilePage(){
    const router = useRouter();
    //stores the loggied user, it can be a string or null
    const [userId, setUserId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<User|null>(null);

    //by default empty string
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    //image 
    const [profileImageUrl, setProfileImageUrl] = useState("")

    

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
            setProfileImageUrl(data.profileImageUrl || "");
        });
        return()=> unsubscribe();
    }, [userId]);

    //image upload for profile
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>)=>{
        //the first item in the array
        const file = e.target.files?.[0];
        if (!file || !userId) return;

        const formData = new FormData();
        //package the file and the permission key - bundle up in one request
        formData.append("file", file);
        formData.append("upload_preset", "ek2f4ivp");

        //call to cloudinary to upload
        const res = await fetch(`https://api.cloudinary.com/v1_1/dyfzs7muf/image/upload`, {method: "post", body: formData});


        const data = await res.json();
        
        //get the url
        const downloadURL = data.secure_url;
        
        //save it in Firestore and update the state
        setProfileImageUrl(downloadURL);

        //then update the firebase with the new url
        await updateDoc (doc(db, "users", userId),{profileImageUrl: downloadURL || ""});
        alert("Image has been updated!");
    }

    //for description
    const handleUpdateDescription = async ()=>{
        if (!userId) return;

        await updateDoc (doc(db, "users", userId),{description: description || ""});
        alert("Description has been updated!");
    };


    return(
        <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <PaperBackground/>
                <div className="relative z-10 items-center justify-center h-full px-[8%] text-red-900 dark:text-gray-700 mt-10">
                    <div className="grid">
                        <Link href={"/chapters"}>
                            <div className="border rounded-2xl py-3 px-4 active:bg-gray-200/50 justify-self-start">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.857 15.962a.5.5 0 0 0 .243.68l9.402 4.193c1.496.667 3.047-.814 2.306-2.202l-3.152-5.904c-.245-.459-.245-1 0-1.458l3.152-5.904c.741-1.388-.81-2.87-2.306-2.202l-3.524 1.572a2 2 0 0 0-.975.932z"/><path fill="currentColor" d="M8.466 15.39a.5.5 0 0 1-.65.233l-4.823-2.15c-1.324-.59-1.324-2.355 0-2.945L11.89 6.56a.5.5 0 0 1 .651.68z" opacity="0.5"/></svg>
                            </div>
                        </Link>

                        <div className="grid text-[clamp(28px,4vw,48px)]">
                            <h1 className="font-bold my-6 text-center">My Profile</h1>
                                
                            {!userInfo ? (
                                <div>Loading... Are you logged in?</div>
                                ):(
                                <div className="space-y-4 mb-10 ">
                                    {/* profile */}
                                    <div className="sm:text-center">
                                        <div className="relative border-4 border-transparent hover:border-amber-600 dark:hover:border-gray-600 rounded-full h-30 w-30 sm:h-50 sm:w-50 mx-auto mb-5 text-center cursor-pointer">
                                            <input type="file" name="profileImageUrl" onChange={handleImageChange} className="absolute inset-0 h-full w-full z-10 opacity-0 cursor-pointer" />
                                            
                                            {/* for the image, if it there display, if not say upload image */}
                                            {profileImageUrl ? <img src={profileImageUrl} alt="Profile Image" className=" rounded-full h-full w-full object-cover"/> : <img src="/image-placeholder.png" alt="Profile Image" className=" rounded-full h-full w-full object-cover"/>}
                                        </div>

                                        <div className="mb-10">
                                            <p className="text-2xl">{username}</p>
                                            <p className="text-2xl">{email}</p>
                                            <div className="mt-5">
                                                {/* Description */}
                                                <div className="grid gap-5">
                                                    <div className="grid">
                                                        <label className="text-2xl font-bold uppercase">About Me:</label>
                                                        <textarea 
                                                        placeholder="Tell something about yourself..." 
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="border p-2 overflow-auto text-2xl rounded-lg  outline-none" 
                                                        cols={10}
                                                        rows={5}
                                                        ></textarea>
                                                    </div>
                                                    <AccountButton onClick={handleUpdateDescription}>Save Description</AccountButton>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <Link type="button" href={"/profile/security"} className="border p-2 rounded-lg text-2xl hover:bg-gray-200/50 active:bg-gray-300 hover:font-semibold">Edit Account</Link>
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