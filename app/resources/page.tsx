import { db } from "@/data/firebase";
import { collection, getDocs } from "firebase/firestore";

import Link from "next/link";


//this page shows all the info for Resouces
export default async function ResourcePage() {
    const querySnapshot = await getDocs(collection(db, "resources"));

    const resources = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return(
        <main>
            <h1 className="text-3xl font-bold mb-6">Resources</h1>
            {resources.map((resource:any) => (

                <div key={resource.id} className="mb-6 p-4 border rounded-xl">
                    <h2 className="text-xl font-semibold">{resource.title}</h2>
                    <p className="text-xl font-semibold">{resource.categroy}</p>
                    <p className="text-xl font-semibold">{resource.description}</p>
                    <Link href={`${resource.resourceUrl}`} target="_blank">
                        <p className="text-gray-600">{resource.resourceUrl}</p>
                    </Link>

                </div>
            ))}

        </main>
    )
}