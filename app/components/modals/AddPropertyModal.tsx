'use client';


import useAddPropertyModal from '@/app/hooks/useAddPropertyModal';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import Categories from '../addproperty/Categories';
import CustomButtton from '../forms/CustomButton';
import SelectCountry, { SelectCountryValue } from '../forms/SelectCountry';
import Modal from './Modal';

import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';

const AddPropertyModal = () => {
    //
    // States

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescripcion] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuest, setDataGuest] = useState('');
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);

    //
    //

    const AddPropertyModal = useAddPropertyModal();
    const router = useRouter()

    //
    // Set datas

    const setCategory = (category: string) => {
        setDataCategory(category)
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

    //
    // Submit

    const submitForm = async () => {
        console.log('SubmitForm');

        if (
            dataCategory &&
            dataTitle &&
            dataDescription &&
            dataPrice &&    
            dataCountry &&
            dataImage
        ) {
            
            const formData = new FormData();
            formData.append('category', dataCategory);
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('price_per_night', dataPrice);
            formData.append('bedrooms', dataBedrooms);
            formData.append('bathrooms', dataBathrooms);
            formData.append('guests', dataGuest);
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
            formData.append('image', dataImage);

            const response = await apiService.post('/api/properties/create/', formData);

            if(response.success) {
                console.log('SUCCESS :-D')

                router.push('/');

                AddPropertyModal.close();
            } else {
                console.log('Error');

                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error;
                })

                setErrors(tmpErrors)
            }
        }
    }

    //
    //

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className='mb-6 text-2x1'>Choose category</h2>

                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => setCategory(category)}>
                    </Categories>

                    <CustomButtton
                        label='Next'
                        onclick={() => setCurrentStep(2)} >
                    </CustomButtton>
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className='mb-6 text-2x1'>Describe your place</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Title</label>
                            <input
                                type="text"
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Descripcion</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescripcion(e.target.value)}
                                className='w-full h-[200px]p-4 border border-gray-600 rounded-xl'
                            >
                            </textarea>
                        </div>
                    </div>

                    <CustomButtton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onclick={() => setCurrentStep(1)} >
                    </CustomButtton>

                    <CustomButtton
                        label='Next'
                        onclick={() => setCurrentStep(3)} >
                    </CustomButtton>
                </>
            ) : currentStep == 3 ? (
                <>

                    <h2 className='mb-6 text-2x1'>Details</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <label>Price per night</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Bedrooms</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e) => setDataBedrooms(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e) => setDataBathrooms(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label>Maximum number of guest</label>
                            <input
                                type="number"
                                value={dataGuest}
                                onChange={(e) => setDataGuest(e.target.value)}
                                className='w-full p-4 border border-gray-600 rounded-xl'
                            />
                        </div>
                    </div>

                    <CustomButtton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onclick={() => setCurrentStep(2)} >
                    </CustomButtton>

                    <CustomButtton
                        label='Next'
                        onclick={() => setCurrentStep(4)} >
                    </CustomButtton>
                </>
            ) : currentStep == 4 ? (
                <>
                    <h2 className='mb-6 text-2x1'>Locations</h2>

                    <div className='pt-3 pb-6 space-y-4'>
                        <SelectCountry
                            value={dataCountry}
                            onChange={(value) => setDataCountry(value as SelectCountryValue)}
                        />
                    </div>

                    <CustomButtton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onclick={() => setCurrentStep(3)} >
                    </CustomButtton>

                    <CustomButtton
                        label='Next'
                        onclick={() => setCurrentStep(5)} >
                    </CustomButtton>
                </>
            ) : (
                <>
                    <div>

                        <h2 className='mb-6 text-2x1'>Image</h2>

                        <div className='pt-3 pb-6 space-y-4'>
                            <div className='py-4 px-6 bg-gray-600 text-white rounded-xl'>
                                <input
                                    type="file"
                                    accept='image/*'
                                    onChange={setImage}
                                />
                            </div>
                        </div>
                        {dataImage && (
                            <div className='w-[200px] h-[150px] relative'>
                                <Image
                                    fill
                                    alt="Uploaded image"
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full h-full object-cover rounded-xl'
                                ></Image>
                            </div>
                        )}
                    </div>

                    {errors.map((error, index) => {
                        return (
                            <div
                            key={index}
                            className='p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80'
                            >
                                {error}
                            </div>
                        )
                    })}

                    <CustomButtton
                        label='Previous'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onclick={() => setCurrentStep(4)} >
                    </CustomButtton>

                    <CustomButtton
                        label='Submit'
                        onclick={submitForm}>
                    </CustomButtton>
                </>
            )}
        </>
    )

    return (
        <>
            <Modal
                isOpen={AddPropertyModal.isOpen}
                close={AddPropertyModal.close}
                label='Add property'
                content={content}
            >
            </Modal>
        </>
    )
}

export default AddPropertyModal;