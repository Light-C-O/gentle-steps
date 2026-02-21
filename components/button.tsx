
type ButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
}


export default function Button({ children, onClick }: ButtonProps) {
    return <button onClick={onClick} className="bg-amber-400 hover:bg-indigo-600 text-2xl text-gray-900 px-4 py-4 rounded-2xl">{children}</button>
}