'use client';


import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButtton from "../forms/CustomButton";
import Modal from "./Modal";


const SignupModal = () => {
    const SignupModal = useSignupModal()

    const content = (
        <>
            <form className="space-y-4">
                <input placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <input placeholder="Repeat password" type="password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl" />
                <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                    The error message
                </div>
                <CustomButtton
                    label="Submit"
                    onclick={() => console.log('Test')}
                />
            </form>
        </>
    )
    return (
        <Modal
            isOpen={SignupModal.isOpen}
            close={SignupModal.close}
            label="Sign up"
            content={content}
        />
    )
}

export default SignupModal;