type DeleteButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}


export default function DeleteButton({ children, onClick, type = "button" }: DeleteButtonProps) {
    return (
    <button type={type} onClick={onClick} className="text-red-500 whitespace-nowrap border rounded-lg px-2 hover:bg-red-200 active:bg-red-500 active:text-amber-50">{children}</button>
    );
}