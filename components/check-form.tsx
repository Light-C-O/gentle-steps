'use client';
import {useState} from "react";
import CreateButton from "./create-button";


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
        className="px-3 py-2 w-full outline-none border rounded-lg hover:shadow-[inset_5px_-5px_30px_5px_#46464620]"
        />
        <CreateButton type="submit"><div className="px-2">New Item</div></CreateButton>
    </form>
    );
}