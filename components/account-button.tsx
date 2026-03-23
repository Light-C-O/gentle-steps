type AccountButtonProps = {
    //anything placed between <Button>...</Button>
    children: React.ReactNode;
    onClick?: () => void;
}

export default function AccountButton({ children, onClick}: AccountButtonProps) {
    return(
        <div>
            <button onClick={onClick} className="cursor-pointer shadow w-full flex items-center justify-center px-5 py-3 text-base leading-6 font-medium rounded-md text-white bg-amber-600 dark:bg-gray-400 hover:bg-amber-500 dark:hover:bg-gray-800 hover:text-white focus:ring ring-offset-2 ring-amber-400 dark:ring-gray-900 focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-5">
                {children}
            </button>
        </div>
    )
}