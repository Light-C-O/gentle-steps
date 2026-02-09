
type ButtonProps = {
    text: string
}


export default function Button({ text }: ButtonProps) {
    return <button className="bg-red-500">{text}</button>
}