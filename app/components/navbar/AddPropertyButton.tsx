'use client';

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";

interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {
    const AddPropertyModal = useAddPropertyModal();

    const airbnbYourHome = () => {
        AddPropertyModal.open()
    }
    return (
        <div 
        onClick={airbnbYourHome}
        className="p-2 text-sm font-semibold rounded-full hover:bg-gray-200"
        >
            Djangobnb your home
        </div>
    )
}

export default AddPropertyButton;