'use client';
import { db, auth} from "@/data/firebase";

import { doc, onSnapshot, updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

import {useEffect, useState} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

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


    return(
        <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <img src="/paper2.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover rounded-2xl"/>
                <div className="relative z-10 items-center justify-center h-full px-[8%]">
                    <div className="flex justify-between items-center">
                        <Link type="button" href={"/chapters"}>Back</Link>
                        <h1 className="text-3xl font-bold my-6 text-center">My Profile</h1>
                        <div></div>
                    </div>

                    {!userInfo ? (
                        <div>Loading... Are you logged in?</div>
                        ):(
                        <div className="space-y-4 mb-10">
                            {/* profile */}
                            <div className="text-center">
                                <div className="relative border-2 rounded-full h-100 w-100 mx-auto mb-5 text-center cursor-pointer">
                                    <input type="file" name="profileImageUrl" onChange={handleImageChange} className="absolute inset-0 h-full w-full z-10 opacity-0 cursor-pointer" />
                                    
                                    {/* for the image, if it there display, if not say upload image */}
                                    {profileImageUrl ? <img src={profileImageUrl} alt="Profile Image" className=" rounded-full h-full w-full object-cover"/> : <img src="/image-placeholder.png" alt="Profile Image" className=" rounded-full h-full w-full object-cover"/>}
                                </div>

                                <div className="mb-5">
                                    <p>{username}</p>
                                    <p>{email}</p>
                                    <div className="mt-5">
                                        <p className="font-bold uppercase">About me</p>
                                        <p>{description}</p>
                                    </div>
                                    
                                </div>
                                <Link type="button" href={"/profile/security"} className="border p-2 rounded">Edit Account</Link>
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}