type CancelButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}


export default function CancelButton({ children, onClick, type = "button" }: CancelButtonProps) {
    return (
    <button type={type} onClick={onClick} className="text-gray-500 whitespace-nowrap border rounded-lg active:bg-gray-200">{children}</button>
    );
}