'use client'

import {use, useEffect, useRef, useState} from "react";
import useInventoryStore from "@/02_stores/inventory-store";
import Headline from "@/03_components/atoms/Headline";
import React from "react";
import Card from "@/03_components/atoms/Card/Card";
import Link from "next/link";
import InventoryDetail from "@/03_components/InventoryDetail/InventoryDetail";
import Button from "@/03_components/atoms/Button/Button";

export default function RoomDetailPage({params}: {
    params: Promise<{ roomName: string }>
}) {
    const {roomName} = use(params);
    const {fetchData} = useInventoryStore();

    const data = useInventoryStore(
        (state) => state.data?.locations.find(l => l.name === roomName)?.inventory
    );

    const safeData = data ?? [];

    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);


    return <div>
        <div className="grid grid-cols-1 md:grid-cols-4 mb-8">
            <div className="col-span-1">
            <Button buttonType={"primary"} href={`/`} label={"zum Start"}/>
            </div>
        </div>
        <Headline text={roomName} level={'h1'}/>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {safeData.map((item, index) => <React.Fragment key={item.id}>
                <Card isNotInteractive={true}>
                    <InventoryDetail data={item} roomName={roomName}/>
                </Card>
            </React.Fragment>)}
            {id &&
                <Card>
                    <Headline text={'neuen Eintrag anlegen'} level={'h3'}/>
                    <Button buttonType={"primary"} href={`/editInventory/${roomName}/${id}?newEntry`} label={"anlegen"} />
                </Card>
            }
        </section>
    </div>
}