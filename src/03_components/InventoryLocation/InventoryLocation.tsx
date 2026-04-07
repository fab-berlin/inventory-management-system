import {InventoryLocationType} from "@/01_types";
import InventoryDetail from "../InventoryDetail/InventoryDetail";
import React from "react";

const InventoryLocation = ({data}: { data: InventoryLocationType }) => {

    return <section className="">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <ul className="flex flex-wrap flex-row gap-4">
            {data.inventory.map((elem, index) =>
                <React.Fragment key={index}>
                    <InventoryDetail data={elem}/>
                </React.Fragment>)}
        </ul>
    </section>
}

export default InventoryLocation;