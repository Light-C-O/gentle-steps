'use client';
import { db } from "@/data/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { use, useEffect, useState } from "react";

// This is the page that shows the details of a chapter
type Chapter = {
    content: string;
    title: string;
    summary: string;
    order: number;
}

type Section = {
    title: string;
    content: string;
}

export default function ChapterDetails({
    params
}: {
    params: Promise<{ id: string }>
    // Get the chapter id from the route and set its type as string
}) {
    const param = use(params);
    const chapterId= param.id;

    // the Chapter object is optional, null or not
    const [chapterData, setChapterData] = useState <Chapter | null>(null);
    const [sectionData, setSectionData] = useState<Section[] | null>(null);

    // Only run this function if the chapter id changes
    useEffect(() => {
        const fetchField = async () => { 
            if(!chapterId) return;

            // Fetch chapter
            const docRef = doc(db, 'chapters', chapterId)
            const querySnapshot = await getDoc(docRef);

            //Fetch the subcollection - a collection of a document
            const sectionRef = collection(db, `chapters/${chapterId}/sections`)
            const sectionQuery = await getDocs(sectionRef);

            // if it exists, set the data.
            if(querySnapshot.exists() && sectionQuery) {
                setChapterData(querySnapshot.data() as Chapter)

                // loop through the sections since it is a collection
                const data: Section[] = []
                sectionQuery.docs.forEach(v => data.push(v.data() as Section))
                setSectionData(data)
                return;

            } else {
                console.log('Cant find document')
            }
        }

        fetchField();
    }, [chapterId] )

    if(!chapterData || !sectionData) return;

    // keep doing shit here

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{chapterData.title}</h1>
            <p className="text-base font-light">{chapterData.summary}</p>
            {/* Showcase all the fields in the sections collection */}
            {sectionData.map((section, index) => {
                return (
                    <div key={index}>
                        <h1>{section.title}</h1>
                        <p>{section.content}</p>
                    </div>
                )
            })}
        </div>
    )


}
