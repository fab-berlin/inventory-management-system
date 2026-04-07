import { Inventory } from '@/01_types';
import {create} from 'zustand';

interface InventoryStore {
    data: Inventory | null,
    fetchData: () => Promise<void>
}

const useInventoryStore = create<InventoryStore>((setState, getState) => ({
    data: null,
    fetchData: async() => {
        const response = await fetch('/inventory.json');
        const result = await response.json();
        setState({data: result});
    }
}));

export default useInventoryStore;