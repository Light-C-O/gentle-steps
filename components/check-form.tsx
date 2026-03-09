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
        className="px-3 py-2 w-full outline-none"
        />
        <button type="submit" className="text-cyan-500 whitespace-nowrap border rounded-lg px-2 hover:bg-cyan-200 active:bg-cyan-500 active:text-cyan-50">New Item</button>
    </form>
    );
}