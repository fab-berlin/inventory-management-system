'use client'

import classNames from "classnames";
import React, {useEffect, useRef, useState} from "react";
import useInventoryStore from "@/02_stores/inventory-store";
import {InventoryDetailType} from "@/01_types";
import Button from "@/03_components/atoms/Button/Button";
import { useRouter } from 'next/navigation';

const InventoryEdit = ({roomName, inventoryId}: { roomName: string, inventoryId: string }) => {
    const {fetchData, getInventoryItemData, saveInventoryItemData} = useInventoryStore();
    const [data, setData] = useState<InventoryDetailType>();

    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const retrieveDetailData = async () => {
            await fetchData();
            const detailData: InventoryDetailType |undefined = await getInventoryItemData(roomName, inventoryId);
            setData(detailData);
        }
        retrieveDetailData();
    }, []);

    const parseQuantity = (value: FormDataEntryValue | null): InventoryDetailType["quantity"] => {
        if (value === null) return 0;

        const str = String(value);

        if (["wenig", "mittel", "viel"].includes(str)) {
            return str as "wenig" | "mittel" | "viel";
        }

        const num = Number(str);
        if (!isNaN(num)) return num;

        throw new Error("Invalid quantity value");
    }

    const handleClick = () => {
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);

        const updatedData: InventoryDetailType = {
            id: String(formData.get('id')),
            name: String(formData.get('name')),
            remarks: String(formData.get('remarks')),
            quantity: parseQuantity(formData.get('quantity')),
            updated: new Date().toISOString(),
        };
        // TODO send updated data to store
        saveInventoryItemData(roomName, updatedData);
        router.push(`/roomDetail/${roomName}`);
    }


    const handleAbort = () => {
        router.push(`/roomDetail/${roomName}`);
    }

    const inventoryFields: {
        key: keyof InventoryDetailType;
        label: string;
        type?: string;
        readonly?: boolean;
    }[] = [
        { key: "id", label: "ID", readonly: true },
        { key: "name", label: "Name", type: "text" },
        { key: "quantity", label: "Quantity", type: "text" },
        { key: "remarks", label: "Remarks", type: "text" },
        { key: "updated", label: "Updated", type: "text", readonly: true },
    ];

    return (<>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 grid-flow-row">
            <form className={'contents'} id="inventoryEditForm" ref={formRef}>

                {inventoryFields.map(({ key, label, type, readonly }) => (
                    <fieldset className="relative w-full" key={key}>
                        <label className="bg-white absolute px-2 left-4 -top-3 text-xs">
                            {label}
                        </label>

                        <input
                            className={classNames(
                                "py-1 px-4 border border-gray-500 mb-4 w-full",
                                readonly && "bg-gray-100 cursor-not-allowed"
                            )}
                            name={key}
                            type={type ?? "text"}
                            defaultValue={key==='id' ? data?.[key] ?? inventoryId : data?.[key] ?? ""}
                            readOnly={readonly}
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