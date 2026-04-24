import React, {use} from "react";
import Headline from "@/03_components/atoms/Headline";
import InventoryEdit from "@/03_components/InventoryEdit/InventoryEdit";

export default function EditInventoryPage({params}: { params: Promise<{ roomName: string, inventoryId: string }> }) {
    const {roomName, inventoryId} = use(params);

    return <div>
        <Headline text={'Anpassen des Datensatzes'} level={'h1'}/>
        <InventoryEdit roomName={roomName} inventoryId={inventoryId}/>
    </div>
}