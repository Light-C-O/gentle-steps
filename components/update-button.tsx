type UpdateButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}


export default function UpdateButton({ children, onClick, type = "button" }: UpdateButtonProps) {
    return (
    <button type={type} onClick={onClick} className="text-amber-500 whitespace-nowrap border rounded-lg px-2 hover:bg-amber-200 active:bg-amber-500 active:text-amber-50">{children}</button>
    );
}