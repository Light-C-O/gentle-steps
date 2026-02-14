'use client';
import { db } from "@/data/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

import Link from "next/link";

export default function CheckPage() {
    const [checklists, setChecklists] = useState<any[]>([]);

    useEffect (() => { 
        const fetchChecklist = async () =>{
            const querySnapshot = await getDocs(collection(db, "checklists"));

            //
            const data = querySnapshot.docs.map((doc) => ({
                //get the id and data of this collection
                id: doc.id, 
                ...doc.data(),
            }));

            setChecklists(data);
        };

        fetchChecklist();
    }, []);
    

    const toggleItem = async (
        checklistId: string,
        index: number,
        currentItems: any[]) =>{
            const updatedItems = currentItems.map((item, i) =>
            i === index ? { ...item, completed:!item.completed} : item
            );

            //update te firestore
            await updateDoc(doc(db, "checklists", checklistId), {
                items: updatedItems,
            });

            setChecklists((prev) =>
            prev.map((checklist) =>
                checklist.id === checklistId ? { ...checklist, items: updatedItems} : checklist
            ));
    };
    

        return(
            <main className="p-8">
                <h1 className="text-3xl font-bold mb-6">Checklists</h1>

                {checklists.map((checklist) => (
                
                    <div key={checklist.id} className="mb-6 p-4 border rounded-xl">
                        <h2 className="text-xl font-semibold">{checklist.title}</h2>
                        <ul className="mt-3 space-y-2">
                            {
                                checklist.items?.map((item: any, index: number) => (
                                    <li key ={index} className="flex items-center gap-2">
                                        <input type="checkbox" checked={item.completed} onChange={() => toggleItem(checklist.id, index, checklist.items)}/>
                                        <span className={item.completed ? "line-through text-gray-400" : ""}>{item.info}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))}
                <Link href="/" className="bg-amber-400 hover:bg-indigo-600 text-2xl text-gray-900 px-4 py-4 rounded-2xl">
                Go Back 
                </Link> 
            </main>
        )
}