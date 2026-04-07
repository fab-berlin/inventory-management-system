'use client'

import useInventoryStore from "@/02_stores/inventory-store";
import React, {useEffect} from "react";
import InventoryLocation from "../InventoryLocation/InventoryLocation";
import {InventoryLocationType} from "@/01_types";


const InventoryItem = () => {
    const {data, fetchData} = useInventoryStore();

    useEffect(() => {
        fetchData();
    }, []);

    return <section className="">
        {data?.locations.map((elem: InventoryLocationType, index: number) => <React.Fragment
            key={index}><InventoryLocation
            data={elem}/></React.Fragment>)}
    </section>
}

export default InventoryItem;