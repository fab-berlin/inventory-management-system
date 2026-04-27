import {InventoryDetailType, InventoryType} from '@/01_types';
import {create} from 'zustand';

interface InventoryStore {
    data: InventoryType | null,
    fetchData: () => Promise<void>,
    getRoomData: (roomName: string) => InventoryDetailType[],
    getInventoryItemData: (roomName: string, inventoryId: string) => InventoryDetailType | undefined,
    saveInventoryItemData: (roomName: string, inventoryData: InventoryDetailType) => void,
}

const useInventoryStore = create<InventoryStore>((setState, getState) => ({
    data: null,
    fetchData: async () => {
        const response = await fetch('/inventory.json', {cache: 'no-store'});
        const result = await response.json();
        setState({data: result});
    },
    getRoomData: (roomName: string): InventoryDetailType[] => {
        const data = getState().data;
        if (!data) return [];

        return data.locations.find((el) => el.name === roomName)?.inventory ?? [];
    },
    getInventoryItemData: (roomName: string, inventoryId: string): InventoryDetailType | undefined => {
        return getState()
            .getRoomData(roomName)
            .find((el) => el.id === inventoryId);
    },
    saveInventoryItemData: async(roomName: string, inventoryData: InventoryDetailType) => {
        setState((state) => {
            if (!state.data) return state;

            // TODO: if the id does not exist yet, a new entry has to be created, instead of updating an existing one

            return {
                data: {
                    ...state.data,
                    locations: state.data.locations.map((location) => {
                        if (location.name !== roomName) return location;

                        return {
                            ...location,
                            inventory: location.inventory.map((item) =>
                                item.id === inventoryData.id ? inventoryData : item
                            ),
                        };
                    }),
                },
            };
        });
        const currentData = getState().data;
        console.log('currentData', currentData);
        await fetch('/api/inventory/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: currentData }),
        });
        //await writeFile('inventory.json', JSON.stringify(currentData, null, 2), 'utf-8');
    }
}));

export default useInventoryStore;