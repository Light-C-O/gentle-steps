'use client';
import {useState, useEffect} from "react";
import { db, auth } from "@/data/firebase";
import { collection, doc, updateDoc, deleteDoc, addDoc, query, orderBy, onSnapshot, serverTimestamp} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

import NavBar from "@/components/navbar";
import Button from "@/components/button";
import Link from "next/link";

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
    const [notes, setNotes] = useState<Note[]>([]);

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
            collection(db, "users", userId, "notes"),
            orderBy("createdAt", "desc")//sort by newest
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
            console.log('Creating note with userId:', userId);
            console.log('Current auth user UID:', auth.currentUser?.uid);
            //no, title, content or a user, do nothing
            if(!title || !content || !userId) return;

            //add the new note in firestore collection called notes
            await addDoc(collection(db, "users", userId, "notes"), {
                title: title,
                content: content,
                createdAt: serverTimestamp(), //for sorting
            })

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
            if(!userId) return;
            
            await updateDoc(doc(db, "users", userId, "notes", noteId),{
                title,
                content,
            });

            //set the edit id to null, in exit edit mode
            setEditingId(null)
            setTitle("")
            setContent("")
        }

        //delete a note
        const deleteNote = async (id:string) => {
            if(!userId) return;
            await deleteDoc(doc(db, "users", userId, "notes", id));
        };
    //

    //to reset when when a edit mode
    const resetNote = () =>{
        setEditingId(null);
        setTitle("");
        setContent("");
    };

    //display this if not logged in
    if(!userId) return <p>Please log in to use notes! 📋</p>

    return(
        <main className="p-8 max-w-3xl mx-auto">
            <div><NavBar/></div>
            <h1 className="text-3xl font-bold mb-6">My Notes</h1>
                <div className="flex gap-5">
                    {/* note form */}
                    <div className="flex-1 flex flex-col gap-3 mb-8 border p-4 rounded-xl">
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
                        cols={50}
                        rows={40}
                        ></textarea>

                        {/* for edit, cancel and update */}
                        {editingId ? (
                            <div className="flex place-content-between">
                            <Button onClick={()=> updateNote(editingId)}>Update Note</Button>
                            <Button onClick={resetNote}>Cancel</Button>
                            </div>

                        ) : (
                            <Button onClick={createNote}>Create Note</Button>
                        )}
                    </div>
                
                    {/* the note lists */}
                    <div className="space-y-4 flex-1">
                        
                        {notes.map((note)=>(
                                <div key={note.id} className="p-4 border rounded-xl">
                                    <Link href={`/notes/${note.id}`} className="block">
                                            <div className="flex justify-between">
                                                <h2 className="font-semibold text-2xl">{note.title}</h2>
                                                <p className="text-gray-500">
                                                    {/* made it a date */}
                                                    {note.createdAt?.toDate().toLocaleDateString()}</p>
                                            </div>
                                    </Link>
                                    
                                    <div className="flex gap-2">
                                        <Button onClick={()=>editNote(note)}>Edit</Button>
                                        <Button onClick={()=>deleteNote(note.id)}>Delete</Button>
                                    </div>
                                </div>
                            
                        ))}
                        
                    </div>
                </div>
        </main>
    )
}