import { atom, RecoilState } from "recoil";

interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

function memoizefn(fn: (id: string) => RecoilState<Item>) {
    const memStore: { [key: string]: RecoilState<Item> } = {};

    return (id: string) => {
        if (memStore[id]) return memStore[id];
        return memStore[id] = fn(id);
    }
}

export const itemWithId = memoizefn((id: string) => atom<Item>({
    key: id,
    default: {
        id,
        background: '#ddd',
        x: 0,
        y: 0,
    }
}));

export const itemIdsState = atom<string[]>({
    key: 'itemIdsState',
    default: [],
});
