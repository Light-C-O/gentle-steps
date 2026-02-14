'use client';
import { db } from "@/data/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// This is the page that shows the details of a chapter
type Chapter = {
    title: string;
    summary: string;
    order: number;
    sections?: Record<string, {
            title: string;
            content: string[] | string;
            [key: string]: any;
    }>;
}


export default function ChapterDetails() {
    const params = useParams();
    // Get the chapter id from the params and set its type as string
    const chapterId= params.id as string;

    // the Chapter object is optional, null or not
    const [chapterData, setChapterData] = useState <Chapter | null>(null);

    // Only run this function if the chapter id changes
    useEffect(() => {
        const fetchChapter = async () => { 
            if(!chapterId) return;

            try{
                // Fetch chapter
                const docRef = doc(db, 'chapters', chapterId)
                const querySnapshot = await getDoc(docRef);

                // if it exists, set the data.
                if(querySnapshot.exists()) {
                    const data = querySnapshot.data();
                    console.log("FULL DOCUMENT:");
                    console.log(data);
                    console.log("SECTIONS FIELD:");
                    console.log(data.sections);
                    setChapterData(data as Chapter)

                } else {
                    console.log('Chapter not found :(')
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchChapter();
    }, [chapterId] )

    if(!chapterData) return;


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">{chapterData.title}</h1>
            <p className="text-base font-light">{chapterData.summary}</p>
        
            {/*loop throught the maped fields*/}
            {
                chapterData.sections && Object.entries(chapterData.sections).map(([key, sectionMap]) => (
                    <div key={key} className="mb-4">
                        <h2 className="font-semibold text-xl">{sectionMap.title}</h2>

                        {(() => {
                            const content = sectionMap.content;

                            if(Array.isArray(content)){
                                return content.map((line, i) => <p key={i} className="mb-2">{line}</p>);
                            } else if(typeof content === "string") { 
                                return <p>{content}</p>;
                            } else {
                                return <p></p>;
                            }
                        })()}

                    </div>
                ))
            }
        </div>
    );


}
