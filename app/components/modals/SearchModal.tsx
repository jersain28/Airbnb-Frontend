'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import { useState } from "react";
import { Range } from "react-date-range";
import DatePicker from "../forms/Calendar";
import CustomButtton from "../forms/CustomButton";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import Modal from "./Modal";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [country, setCountry] = useState<SelectCountryValue>();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    //
    // Set date range

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout');
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details');
        }

        setDateRange(selection);
    }

    //
    // Contents

    const contentLocation = (
        <>

            <div className="mb-6 text-2x1">Where do you want to go</div>

            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            >
            </SelectCountry>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButtton
                    label="Check in date ->"
                    onclick={() => searchModal.open('checkin')}>
                </CustomButtton>
            </div>

        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2x1">When do you want to check in?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            >
            </DatePicker>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButtton
                    label="<- Location"
                    onclick={() => searchModal.open('location')}>
                </CustomButtton>

                <CustomButtton
                    label="Check out date ->"
                    onclick={() => searchModal.open('checkout')}>
                </CustomButtton>
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2x1">When do you want to check out?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            >
            </DatePicker>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButtton
                    label="<- Check in date"
                    onclick={() => searchModal.open('checkin')}>
                </CustomButtton>

                <CustomButtton
                    label="Check out date ->"
                    onclick={() => searchModal.open('details')}>
                </CustomButtton>
            </div>
        </>
    )

    if (searchModal.step == 'location') {
        content = contentLocation
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin
    } else if (searchModal.step == 'checkout') {
        content = contentCheckout
    }
    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}>
        </Modal>
    )
}

export default SearchModal;