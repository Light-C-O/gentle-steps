type EditButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}


export default function EditButton({ children, onClick, type = "button" }: EditButtonProps) {
    return (
    <button type={type} onClick={onClick} className="text-blue-500 whitespace-nowrap border rounded-lg px-2 hover:bg-blue-200 active:bg-blue-500 active:text-amber-50">{children}</button>
    );
}

