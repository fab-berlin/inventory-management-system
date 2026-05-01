import {InventoryDetailType, InventoryType} from '@/01_types';
import {create} from 'zustand';

interface InventoryStore {
    data: InventoryType | null,
    fetchData: () => Promise<void>,
    getRoomData: (roomName: string) => InventoryDetailType[],
    getInventoryItemData: (roomName: string, inventoryId: string) => InventoryDetailType | undefined,
    updateFile: () => void,
    saveInventoryItemData: (roomName: string, inventoryData: InventoryDetailType) => void,
    removeInventoryItem:  (roomName: string, itemId: string) => void,
    addLocation: (roomName: string) => void,
    removeLocation: (roomName: string) => void,
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
    updateFile: async () => {
        const currentData = getState().data;
        await fetch('/api/inventory/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: currentData }),
        });
    },
    saveInventoryItemData: async(roomName: string, inventoryData: InventoryDetailType) => {
        setState((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    locations: state.data.locations.map((location) => {
                        if (location.name !== roomName) return location;

                        const exists = location.inventory.some(
                            (item) => item.id === inventoryData.id
                        );

                        return {
                            ...location,
                            inventory: exists
                                ? location.inventory.map((item) =>
                                    item.id === inventoryData.id ? inventoryData : item
                                )
                                : [...location.inventory, inventoryData],
                        };
                    }),
                },
            };
        });
        getState().updateFile();
    },
    removeInventoryItem: async (roomName: string, itemId: string) => {
        setState((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    locations: state.data.locations.map((location) => {
                        if (location.name !== roomName) return location;

                        return {
                            ...location,
                            inventory: location.inventory.filter(
                                (item) => item.id !== itemId
                            ),
                        };
                    }),
                },
            };
        });
        getState().updateFile();
    },
    addLocation: (roomName: string) => {
        setState((state) => {
            if (!state.data) return state;

            const exists = state.data.locations.some(
                (l) => l.name === roomName
            );

            if (exists) return state;

            return {
                data: {
                    ...state.data,
                    locations: [
                        ...state.data.locations,
                        {
                            name: roomName,
                            inventory: [],
                        },
                    ],
                },
            };
        });

        getState().updateFile();
    },
    removeLocation: (roomName: string) => {
        setState((state) => {
            if (!state.data) return state;

            return {
                data: {
                    ...state.data,
                    locations: state.data.locations.filter(
                        (location) => location.name !== roomName
                    ),
                },
            };
        });

        getState().updateFile();
    },
}));

export default useInventoryStore;