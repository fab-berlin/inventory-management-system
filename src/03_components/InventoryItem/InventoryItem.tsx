'use client'

import useInventoryStore from "@/02_stores/inventory-store";
import React, {useEffect, useRef} from "react";
import InventoryLocation from "../InventoryLocation/InventoryLocation";
import {InventoryLocationType} from "@/01_types";
import Link from "next/link";
import Headline from "@/03_components/atoms/Headline";
import Card from "@/03_components/atoms/Card/Card";
import classNames from "classnames";
import Button from "@/03_components/atoms/Button/Button";


const InventoryItem = () => {
    const roomInput = useRef<HTMLInputElement>(null);
    const {data, fetchData} = useInventoryStore();
    const {addLocation}= useInventoryStore();

    useEffect(() => {
        fetchData();
    }, []);

    const addRoom = () => {
        if (roomInput.current) {
            addLocation(roomInput.current?.value ?? '');
            roomInput.current.value = '';
        }
    }

    return <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.locations.map((elem: InventoryLocationType, index: number) => <React.Fragment
            key={index}>
            <InventoryLocation data={elem}/>
        </React.Fragment>)}
        <Card>
            <strong className="text-xl font-bold mb-4 block">neuen Raum anlegen</strong>
            <fieldset className="relative w-full">
                <label className="bg-white absolute px-2 left-2 -top-3 text-xs">
                    Raumname
                </label>

                <input
                    ref={roomInput}
                    className={classNames(
                        "py-1 px-4 border border-gray-500 mb-4 w-full",
                    )}
                    name={"roomName"}
                    type={"text"}
                    defaultValue={""}
                />
            </fieldset>
            <Button buttonType={"primary"} label={"anlegen"} onClick={addRoom}/>
        </Card>
    </section>
}

export default InventoryItem;