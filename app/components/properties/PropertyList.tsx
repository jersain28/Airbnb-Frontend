'use client';


import apiService from "@/app/services/apiService";
import { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListitem";

export type PropertyType = {
    id: string;
    title: string;
    image_url: string;
    price_per_night: number;
}

const PropertyList = () => { 
    const [properties, setProperties] = useState<PropertyType[]>([]);

    const getProperties = async () => {
        const tmpProperties = await apiService.get('/api/properties/')

        setProperties(tmpProperties.data);
    };

    useEffect(() => {
        apiService.get('/hello');

        getProperties();
    }, []);

    return (
        <>
        {properties.map((property) => {
            return (
                <PropertyListItem 
                key={property.id}
                property={property}/>
            )
        })} 
        </>
    )
}

export default PropertyList;