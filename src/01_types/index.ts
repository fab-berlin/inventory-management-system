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
    id: string;
    name: string;
    quantity: number | "wenig" | "mittel" | "viel";
    remarks: string;
    updated?: string;
}