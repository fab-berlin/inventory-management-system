'use client'

import classNames from "classnames";
import React, {useEffect, useRef, useState} from "react";
import useInventoryStore from "@/02_stores/inventory-store";
import {InventoryDetailType} from "@/01_types";
import Button from "@/03_components/atoms/Button/Button";

const InventoryEdit = ({roomName, inventoryId}: { roomName: string, inventoryId: string }) => {
    const {fetchData, getInventoryItemData} = useInventoryStore();
    const [data, setData] = useState<InventoryDetailType>();

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const retrieveDetailData = async () => {
            await fetchData();
            const detailData: InventoryDetailType = await getInventoryItemData(roomName, inventoryId);
            setData(detailData);
        }
        retrieveDetailData();
    }, []);

    const handleClick = () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const updatedData: Record<string, any> = {};

        formData.forEach((value, key) => {
            updatedData[key] = value;
        });
        // TODO send updated data to store
    }
    const handleAbort = () => {
        // TODO: move one level up to the room's overview
    }

    return (<>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-flow-row">
            <form className={'contents'} id="inventoryEditForm" ref={formRef}>

            {Object.entries(data ?? {}).map(([key, value]) => (
                <fieldset className="relative w-full" key={key}>
                    <label className="bg-white absolute px-2 left-4 -top-3 text-xs"
                           htmlFor={`roomName-${key}`}>{key}</label>
                    <input
                        className={classNames(
                            'py-1 px-4 border border-gray-500 mb-4 w-full',
                            (key === 'id' || key === 'updated') && 'bg-gray-100 cursor-not-allowed')}
                        key={key}
                        name={key}
                        defaultValue={value}
                        {...key === 'id' && {readOnly: true}}
                    />
                </fieldset>
            ))}
            </form>
        </section>
        <section className={'grid grid-cols-1 lg:grid-cols-2 gap-4 grid-flow-row">'}>
            <Button buttonType={"primary"} label={"Speichern"} onClick={handleClick}/>
            <Button buttonType={"secondary"} label={"Abbrechen"} onClick={handleAbort}/>
        </section>
    </>)
}

export default InventoryEdit;