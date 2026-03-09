
type ButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}


export default function Button({ children, onClick, type = "button" }: ButtonProps) {
    return (
    <button type={type} onClick={onClick} className="bg-amber-400 hover:bg-indigo-600 text-2xl text-gray-900 px-4 py-4 rounded-2xl">{children}</button>
    );
}