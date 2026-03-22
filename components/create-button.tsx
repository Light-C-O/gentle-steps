type CreateButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}


export default function CreateButton({ children, onClick, type = "button" }: CreateButtonProps) {
    return (
    <button type={type} onClick={onClick} className="text-cyan-500 cursor-pointer whitespace-nowrap border rounded-lg hover:bg-cyan-200 active:bg-cyan-500 active:text-cyan-50">{children}</button>
    );
}