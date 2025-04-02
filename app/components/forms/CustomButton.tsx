interface CustomButtonProps {
    label: string;
    className?: string;
    onClick: () => void;
}

const CustomButtton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onClick,
}) => {
    return (
        <div
        onClick={onClick}
            className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl trasition cursor-pointer ${className}`}
        >
            {label}
        </div>
    )
}

export default CustomButtton;