'use client';
import {useState, useEffect} from "react";
import { db, auth } from "@/data/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, query, where, orderBy, onSnapshot} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

import NavBar from "@/components/navbar";

type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: any;
}

export default function NotePage(){
    //stores the loggied user, it can be a string or null
    const [userId, setUserId] = useState<string | null>(null);
    //store the notes in firestore, defiend as array
    const [notes, setNotes] = useState([]);

    //store the inputs, initallised as an empty string
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    //editing note
    const [editingId, setEditingId] = useState<string | null>(null);


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

    //for the note collection
    useEffect(()=>{

        //do nothing if it is not a user
        if(!userId) return;

        //Create a firestore query
        const noteQuery = query(
            //only if notes belongs to a user id
            collection(db, "notes"), where("userId", "==", userId), orderBy("createdAt", "desc")//sort by newest
        );

        // real-time changes
        const unsubscribe = onSnapshot(noteQuery, (snapshot)=>{
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Note[];

            setNotes(data);
        });
        return ()=> unsubscribe();
    },[userId])
};