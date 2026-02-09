import { use } from "react"

export default function Page({ params }: { params: Promise<{ number: string }> }) {

    const { number } = use(params);


    return (
        <div>
            Babies {number}!
        </div>
    )
}