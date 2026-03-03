'use client';
import { db, auth} from "@/data/firebase";

import { collection, getDocs, doc, updateDoc, onSnapshot, deleteDoc} from "firebase/firestore";
import {onAuthStateChanged, updateEmail, updatePassword, deleteUser} from "firebase/auth";

import {useEffect, useState} from "react";

import NavBar from "@/components/navbar";
import Button from "@/components/button";

type User = {
    id:string;
    username: string;
    email: string;
    description: string;
    createdAt: any;
}

export default function ProfilePage(){
    //stores the loggied user, it can be a string or null
    const [userId, setUserId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<User|null>(null);


    //by default empty string
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pasword, setPassword] = useState("");
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

    useEffect(()=>{
        if(!userId) return;

        const userRef = collection(db, "users", userId);

        const unsubscribe = onSnapshot(userRef, (snapshot)=>{
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[];

            setUserInfo(data); //update automaytically
        });
        return()=> unsubscribe();
    }, [userId]);


    return(
        <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <img src="/paper2.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="relative z-10 items-center justify-center h-full px-[8%]">
                    <div><NavBar/></div>
                    <h1 className="text-3xl font-bold mb-6">My Info</h1>
                </div>
            </div>
        </main>
    )
}