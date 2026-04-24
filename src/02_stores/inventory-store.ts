import {InventoryDetailType, InventoryType} from '@/01_types';
import {create} from 'zustand';

interface InventoryStore {
    data: InventoryType | null,
    fetchData: () => Promise<void>,
    getRoomData: (roomName: string) => InventoryDetailType[],
    getInventoryItemData: (roomName: string, inventoryId: string) => InventoryDetailType,
}

const useInventoryStore = create<InventoryStore>((setState, getState) => ({
    data: null,
    fetchData: async() => {
        const response = await fetch('/inventory.json');
        const result = await response.json();
        setState({data: result});
    },
    getRoomData: (roomName: string): InventoryDetailType[] => {
        const inventoryData = getState().data;
        return inventoryData!.locations!.find((el) => el.name === roomName)!.inventory;
    },
    getInventoryItemData: (roomName: string, inventoryId: string): InventoryDetailType => {
        return <InventoryDetailType>getState().getRoomData(roomName)!.find((el) => el.id === inventoryId);
    }

}));

export default useInventoryStore;