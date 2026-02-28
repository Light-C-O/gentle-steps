'use client';
import { db, auth } from "@/data/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

//Firebase auth listener to detect logged-in user
import {onAuthStateChanged} from "firebase/auth";

import CheckForm from "@/components/check-form";
import NavBar from "@/components/navbar";


export default function CheckPage() {


    //local state to store all checklists for the logged in user
    const [checklists, setChecklists] = useState<any[]>([]);

    //runs only once when the page loads
    useEffect (() => { 

        //listen for authentication state to check if user is logged in
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            //if no user, do nothing
            if(!user) return;

            //get all checklists doc inside the users doc - a subcollection
            const querySnapshot = await getDocs(collection(db, "users", user.uid, "checklists"));

            const data = querySnapshot.docs.map((doc) => ({
                //get the id and data of this collection
                id: doc.id, //doc id
                ...doc.data(), //doc fields
            }));

            //saves them
            setChecklists(data);
        });

        //clean up 
        return()=> unsubscribe();
    }, []);
    

    //toggle checkbox
    const toggleItem = async (checklistId: string, 
        index: number, 
        currentItems: any[]) =>{

        //get currently logged in user
        const user = auth.currentUser;
        if (!user) return;

        //create a new updated items array
        const updatedItems = currentItems.map((item, i) =>
        i === index ? { ...item, completed:!item.completed} : item //change the completed value
        );

        //update the firestore, specfially the checklist subcollection of the logged in user
        await updateDoc(doc(db, "users", user.uid, "checklists",checklistId), {items: updatedItems});

        //update instantly
        setChecklists((prev) =>
        prev.map((checklist) =>
            checklist.id === checklistId ? { ...checklist, items: updatedItems} : checklist
        ));
    };

    //adding a new item to the a checklist
    const addItem = async (checklistId: string, info: string) => {
        const user = auth.currentUser;
        if (!user) return;

        //find the right checklist
        const checklist = checklists.find(c => c.id === checklistId);
        if (!checklist) return;

        //copy the previous array with the new item
        const updatedItems= [...checklist.items,
            {info, completed: false}
        ];

        //update the firestore
        await updateDoc(
            doc(db, "users", user.uid, "checklists", checklistId), 
            {items: updatedItems}
        );

        //update the local stat to reflect the in UI
        setChecklists(prev => 
            prev.map(c => 
                c.id === checklistId ? { ...c, items:updatedItems}: c
        ));
    };
    

    return(
        <main className="flex justify-center mx-auto font-sans min-h-auto drop-shadow-xl/50 mt-10">
            <div className="relative w-[90vw] max-w-3xl">
                <img src="/paper2.svg" alt="background paper" className="absolute inset-0 w-full h-full object-cover"/>
                <div className="relative z-10 items-center justify-center h-full px-[8%]">
                    <div><NavBar/></div>
                    <div className="">
                        <h1 className="text-3xl font-bold mb-6">Checklists</h1>

                        {checklists.map((checklist) => (
                        
                            // loop through each checklist document
                            <div key={checklist.id} className="mb-6 p-4 border rounded-xl">
                                <h2 className="text-xl font-semibold">{checklist.title}</h2>
                                <ul className="mt-3 space-y-2 mb-4">
                                    {
                                        checklist.items?.map((item: any, index: number) => (
                                            <li 
                                            key ={index} 
                                            className="flex items-center gap-2">
                                                <input 
                                                type="checkbox" 
                                                checked={item.completed} onChange={() => toggleItem(checklist.id, index, checklist.items)}/>
                                                <span className={item.completed ? "line-through text-gray-400" : ""}>{item.info}</span>
                                            </li>
                                        ))
                                    }

                                    <div>
                                        <h2 className="text-xl font-semibold">My List:</h2>
                                        <ul>
                                            <CheckForm
                                            checklistId={checklist.id}
                                            onAdd= {(info)=> addItem(
                                                checklist.id, info
                                            )}
                                            />
                                        </ul>
                                    </div>
                                </ul>
                                
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </main>
    )
}