import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function Home() {
    const querySnapshot = await getDocs(collection(db, "chapters"));

    const chapters = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
}));

    return (
    <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Gentle Steps</h1>

        {chapters.map((chapter: any) => (
        <div key={chapter.id} className="mb-6 p-4 border rounded-xl">
            <h2 className="text-xl font-semibold">{chapter.title}</h2>
            <p className="text-gray-600">{chapter.summary}</p>
        </div>
        ))}
    </main>
    );
}