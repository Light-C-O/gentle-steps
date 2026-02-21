'use client';
import {useState, useEffect} from "react";
import { db, auth } from "@/data/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, query, where, orderBy, onSnapshot, serverTimestamp} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

import NavBar from "@/components/navbar";
import Button from "@/components/button";

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

            setNotes(data); //update automaytically
        });
        return ()=> unsubscribe();
    },[userId]);

    //CRUD
        //create new note
        const createNote = async () => {
            //no, title, content or a user, do nothing
            if(!title || !content || !userId) return;

            //add the new note in firestore collection called notes
            await addDoc(db, "notes"), {
                userId: userId, //link note to the user based on a id
                title: title,
                content: content,
                createdAt: serverTimestamp(), //for sorting
            }

            //the default form
            setTitle("");
            setContent("");
        };

        //editing a note
        const editNote = (note: Note)=>{
            //keep the store field's info to edit it
            setEditingId(note.id);
            setTitle(note.title);
            setContent(note.content);
        };

        //update a note
        const updateNote = async (noteId:string) => {
            
            await updateDoc(doc(db, "notes", noteId),{
                title:title,
                content:content,
            });

            //set the edit id to null, in exit edit mode
            setEditingId(null)
            setTitle("")
            setContent("")
        }

        //delete a note
        const deleteNote = async (id:string) => {
            await deleteDoc(doc(db, "notes", id));
        };
    //

    //display this if not logged in
    if(!user) return <p>Please log in to use notes! 📋</p>

    return(
        <main className="p-8 max-w-3xl mx-auto">
            <div><NavBar/></div>
            <h1 className="text-3xl font-bold mb-6">My Notes</h1>
            {/* note form */}
            <div className="flex flex-col gap-3 mb-8 border p-4 rounded-xl">
                {/* title */}
                <input 
                type="text"
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded"
                />

                {/* content */}
                <textarea 
                placeholder="What is on your mind..." 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-2" 
                ></textarea>

                {/* for edit and update */}
                {editingId ? (
                <div onClick={()=> updateNote(editingId)}>
                    <Button>
                        Update Note
                    </Button>
                </div>
                ) : (
                    <div onClick={createNote}>
                        <Button>Update Note</Button>
                    </div>
                )
            }
            </div>
        </main>
    )
}