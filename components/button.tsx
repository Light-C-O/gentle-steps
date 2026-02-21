
type ButtonProps = {
    text: string
}


export default function Button({ text }: ButtonProps) {
    return <button className="bg-amber-400 hover:bg-indigo-600 text-2xl text-gray-900 px-4 py-4 rounded-2xl">{text}</button>
}