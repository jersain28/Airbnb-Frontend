interface CustomButtonProps {
    label: string;
    className?: string;
    onclick: () => void;
}

const CustomButtton: React.FC<CustomButtonProps> = ({
    label,
    className,
    onclick,
}) => {
    return (
        <div
        onClick={onclick}
            className={`w-full py-4 bg-airbnb hover:bg-airbnb-dark text-white text-center rounded-xl trasition cursor-pointer ${className}`}
        >
            {label}
        </div>
    )
}

export default CustomButtton;