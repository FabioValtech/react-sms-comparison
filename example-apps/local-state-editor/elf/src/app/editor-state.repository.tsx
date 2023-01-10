import { withEntities, addEntities, updateEntities, selectAllEntities, selectEntity } from "@ngneat/elf-entities";
import { createStore } from "@ngneat/elf";
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

let counter = 0;

export interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

const store = createStore({ name: 'items' }, withEntities<Item>());

export const items$ = store.pipe(selectAllEntities(), shareReplay({ refCount: true }), distinctUntilChanged((prev, curr) => prev.length === curr.length));
export const getItemObservableById = (id: string) => store.pipe(selectEntity(id));
export const createItems = (howMany: number) => {
    const items = new Array(howMany).fill(0).map((): Item => ({
        id: `id${++counter}`,
        x: 0,
        y: 0,
        background: 'lightgray',
    }));
    store.update(addEntities(items));
}
export const updateItem = (item: Item) => {
    store.update(updateEntities(item.id, item));
}
