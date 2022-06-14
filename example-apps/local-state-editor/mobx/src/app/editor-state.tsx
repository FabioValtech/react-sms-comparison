import { makeAutoObservable } from "mobx";

interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

let counter = 0;

class ItemStore {
    ids: string[] = [];
    items: { [id: string]: Item } = {};

    get itemIds() {
        return this.ids;
    }

    constructor() {
        makeAutoObservable(this);
    }

    addItem = () => {
        const id = `id${++counter}`;
        this.ids.push(id);
        this.items[id] = {
            id,
            background: '#ccc',
            x: 0,
            y: 0,
        };
    }

    updateItem = (item: Item) => {
        this.items[item.id] = item;
    }
}

export const itemStore = new ItemStore();
