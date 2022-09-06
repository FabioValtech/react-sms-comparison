import create from 'zustand'

interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

interface ItemIdsState {
    ids: string[];
    addItemId: (itemId: string) => void;
    addItemIds: (itemIds: string[]) => void;
}
interface ItemsState {
    items: Record<string, Item>;
    setItem: (item: Item) => void;
    setItems: (items: Record<string, Item>) => void;
}

export const useItemsIdsStore = create<ItemIdsState>((set) => ({
    ids: [],
    addItemId: (id: string) => set((state) => ({ ids: [...state.ids, id] })),
    addItemIds: (ids: string[]) => set((state) => ({ ids: [...state.ids, ...ids] })),
}))

export const useItemsStore = create<ItemsState>((set) => ({
    items: {},
    setItem: (item) => set((state) => ({ items: { ...state.items, [item.id]: item } })),
    setItems: (items) => set((state) => ({ items: { ...state.items, ...items } })),
}))
