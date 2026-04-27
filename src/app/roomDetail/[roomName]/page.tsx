'use client'

import {use, useEffect, useRef, useState} from "react";
import useInventoryStore from "@/02_stores/inventory-store";
import {InventoryDetailType} from "@/01_types";
import Headline from "@/03_components/atoms/Headline";
import React from "react";
import Card from "@/03_components/atoms/Card/Card";
import classNames from "classnames";
import Link from "next/link";

export default function RoomDetailPage({params}: {
    params: Promise<{ roomName: string }>
}) {
    const {roomName} = use(params);
    const {fetchData, getRoomData} = useInventoryStore();
    const [data, setData] = useState<InventoryDetailType[]>([]);

    useEffect(() => {
        const retrieveRoomDetails = async () => {
            await fetchData();
            const roomData = await getRoomData(roomName) || [];
            setData(roomData);
        }
        retrieveRoomDetails();
    }, []);

    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        setId(crypto.randomUUID());
    }, []);


    return <div>
        <Headline text={roomName} level={'h1'}/>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

            {data.map((item, index) => <React.Fragment key={index}>
                <Card isNotInteractive={true}>
                    <Headline text={item.name} level={'h3'} classes={classNames('mb-2 pb-2', (item.remarks || item.updated) && 'border-b border-gray-200')}/>
                    <p className={''}><strong>Anzahl/Menge:</strong> {item.quantity}</p>
                    {item.remarks && <p className="mb-4"><strong>Anmerkungen:</strong> {item.remarks}</p>}
                    {item.updated && <p className="inline-block rounded-lg py-1 px-2 bg-gray-500 text-white text-xs">Updated: {item.updated}</p>}
                    <Link className="block cursor-pointer" href={`/editInventory/${roomName}/${item.id}`}>edit</Link>
                </Card>
            </React.Fragment>)}
            {id &&
            <Card>
                <Headline text={'neuen Eintrag anlegen'} level={'h3'} />
                <Link className="block cursor-pointer" href={`/editInventory/${roomName}/${id}?newEntry`} >anlegen</Link>
            </Card>
            }
        </section>
    </div>
}