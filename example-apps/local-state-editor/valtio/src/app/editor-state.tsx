import { proxy } from 'valtio'

interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

interface ItemsState {
    ids: string[];
    items: Record<string, Item>;
}

export const editorState = proxy<ItemsState>({
    ids: [],
    items: {},
})
