'use client';
import {useState} from "react";


type FormProps = {
    checklistId: string;
    //prop passed to compment to that allows the parent compoment to handle addtional new items 
    onAdd: (info: string ) => void
}

export default function CheckForm ({checklistId, onAdd}: FormProps) {
    const [info, setInfo] = useState("");

    const handleSubmit = (e:React.SyntheticEvent)=> {
        e.preventDefault();

        //this to remove whitespace. if not not trimed, return nothing
        if(!info.trim()) return;

        onAdd(info);
        setInfo("");
    };

    return(
    <form
    onSubmit={handleSubmit}
    method="post"
    className="justify-center flex gap-2"
    >
        <input 
        type="text" 
        placeholder="Add a new item"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="border px-3 py-2 w-full"
        />
        <button type="submit" className="bg-indigo-600 text-gray-100 px-4 py-2 rounded-lg">New Item</button>
    </form>
    );
}