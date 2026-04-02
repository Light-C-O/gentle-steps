'use client';
import {useState, useEffect} from "react";

import { db, auth } from "@/data/firebase";
import { collection, doc, updateDoc, deleteDoc, addDoc, query, orderBy, onSnapshot, serverTimestamp} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

import NavBar from "@/components/navbar";
import CancelButton from "@/components/cancel-button";
import UpdateButton from "@/components/update-button";
import CreateButton from "@/components/create-button";
import DeleteButton from "@/components/delete-button";
import EditButton from "@/components/edit-button";
import PaperBackground from "@/components/paper-background";

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
    if(!userId) return (
        <div className="font-bold text-2xl text-center mt-4 text-gray-900 ">
            <p className="mb-8">Please log in to use notes! 📝</p>
            <Link href={"/login"} className="border bg-amber-50 dark:bg-gray-300 rounded-2xl p-4 hover:bg-amber-900 hover:text-gray-100 dark:hover:bg-gray-700">Login</Link>
        </div>
    )

    return(
        <main className="flex justify-center mx-auto min-h-auto font-sans drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-4xl">
                <PaperBackground/>
                <div className="relative z-10 items-center justify-center h-full px-[8%] text-red-900 dark:text-gray-700">
                    <div><NavBar/></div>
                    <h1 className="text-3xl font-bold mb-2">My Notes</h1>
                    <div className="flex flex-col sm:flex-col lg:flex-row gap-5 mb-4">
                        {/* note form */}
                        <form onSubmit={(e) => {e.preventDefault(); editingId ? updateNote(editingId) : createNote();}} className="flex-1 flex flex-col gap-3 mb-8 p-4 rounded-xl border">
                            {/* title */}
                            {/* <h5>Title</h5> */}
                            <input 
                            name="title"
                            type="text"
                            placeholder="Add Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-2 rounded outline-none font-bold hover:shadow-[inset_-12px_-8px_40px_#46464620] "/>

                            {/* content */}
                            {/* <h5>Content</h5> */}
                            <textarea 
                            name="content"
                            placeholder="What is on your mind..." 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="p-2 overflow-auto outline-none hover:shadow-[inset_-12px_-8px_40px_#46464620] rounded" 
                            cols={40}
                            rows={20}
                            ></textarea>

                            {/* for edit, cancel and update */}
                            <div className="flex place-content-between">
                                {
                                editingId ? (
                                    <UpdateButton type="submit"><div className="p-2 font-bold">Update Note</div></UpdateButton>
                                    ):(
                                    <CreateButton type="submit"><div className="p-2 font-bold">Create Note</div></CreateButton>
                                    ) 
                                }

                                {/* <button className="text-amber-500 whitespace-nowrap border rounded-lg px-2 hover:bg-amber-200 active:bg-amber-500 active:text-amber-50">{editingId? "Update Note" : "Create Note"}</button> */}

                                {/* <button className="text-gray-500 whitespace-nowrap border rounded-lg px-2 active:bg-gray-200 " onClick={resetNote}>Cancel</button> */}

                                <CancelButton type="button" onClick={resetNote}><div className="p-2 font-bold">Cancel</div></CancelButton>
                            </div>
                        </form>
                    
                        {/* the note lists */}
                        <div className="space-y-4 flex-1">
                            {notes.map((note)=>(
                                <div key={note.id} className="p-4 border border-amber-500 rounded-xl grid">
                                    <div className="flex justify-between">
                                        <h2 className="font-semibold text-2xl">{note.title}</h2>
                                        <p className="text-gray-500">
                                            {/* made it a date */}
                                            {note.createdAt?.toDate().toLocaleDateString()}</p>
                                    </div>
                                    
                                    <div className="justify-self-end flex gap-2">
                                        <EditButton onClick={()=>editNote(note)}><div className="p-2 font-bold">Edit</div></EditButton>
                                        <DeleteButton onClick={()=>deleteNote(note.id)}><div className="p-2 font-bold">Delete</div></DeleteButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}