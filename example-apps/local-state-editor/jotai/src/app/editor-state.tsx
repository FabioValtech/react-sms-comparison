import { atom, Atom } from "jotai";

interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

function memoizefn(fn: (id: string) => ReturnType<typeof itemWithIdAtom>) {
    const memStore: { [key: string]: ReturnType<typeof itemWithIdAtom> } = {};

    return (id: string) => {
        if (memStore[id]) return memStore[id];
        return memStore[id] = fn(id);
    }
}

const itemWithIdAtom = (id: string) => atom<Item>({
    id,
    background: '#ddd',
    x: 0,
    y: 0,
})

export const itemWithId = memoizefn(itemWithIdAtom);

export const itemIdsState = atom<string[]>([]);
