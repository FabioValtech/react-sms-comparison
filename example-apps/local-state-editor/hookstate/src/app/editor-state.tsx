import { hookstate } from "@hookstate/core";

export interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

export const itemsState = hookstate<Item[]>([])
