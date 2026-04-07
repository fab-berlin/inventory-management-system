export type InventoryType = {
    updated: string;
    place: string;
    locations: InventoryLocationType[];
}

export type InventoryLocationType = {
    name: string;
    inventory: InventoryDetailType[];
}

export type InventoryDetailType = {
    name: string;
    quantity: number | "wenig" | "mittel" | "viel";
    remarks: string;
}