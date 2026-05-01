import {InventoryLocationType} from "@/01_types";
import React from "react";
import Headline from "@/03_components/atoms/Headline";
import Link from "next/link";
import Card from "@/03_components/atoms/Card/Card";
import Button from "@/03_components/atoms/Button/Button";
import useInventoryStore from "@/02_stores/inventory-store";

const InventoryLocation = ({data}: { data: InventoryLocationType }) => {
    const {removeLocation} = useInventoryStore();

    const removeRoom = () => {
        removeLocation(data.name);
    }

    return <Card>
        <Link href={`/roomDetail/${data.name}`} className="before:absolute before:inset-0">
            <Headline text={data.name} level={'h2'} />
            <p>Anzahl der Einträge: {data.inventory.length}</p>
        </Link>
            <Button buttonType={"secondary"} label={"entfernen"} onClick={removeRoom} />
    </Card>
}

export default InventoryLocation;