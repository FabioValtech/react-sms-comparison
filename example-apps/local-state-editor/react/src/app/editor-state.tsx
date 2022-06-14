import * as React from "react";

interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

interface ItemState {
    [itemId: string]: Item;
}

interface SquareContext {
    itemIds: string[],
    selectedIds: string[],
    item: (id: string) => Item,
    addItem: (item: Item) => void,
    updateItem: (item: Item) => void,
}

type ActionType = |
    { type: 'add' | 'update' , value: Item };

const Ctx = React.createContext<SquareContext>({
    item: () => ({ id: '0', x: 0, y: 0, background: '#aaa'}),
    itemIds: [],
    selectedIds: [],
    addItem: () => {},
    updateItem: () => {},
});

const reducer = (state: ItemState, action: ActionType) => {
    switch (action.type) {
        case 'add':
        case 'update':
            return {
                ...state,
                [action.value.id]: action.value,
            };
        default:
            return state;
    }
}

export function EditorProvider({ children }: { children: React.ReactChild }) {
    const [itemIds, setItemIds] = React.useState<string[]>([]);
    const [selectedIds] = React.useState<string[]>([]);
    const [items, dispatch] = React.useReducer(reducer, {});

    function itemSelector(itemId: string) {
        return items[itemId];
    }

    return <Ctx.Provider value={{
        itemIds,
        selectedIds,
        item: itemSelector,
        addItem: (item: Item) => {
            dispatch({ type: 'add', value: item });
            setItemIds(ids => [...ids, item.id]);
        },
        updateItem: (item: Item) => dispatch({ type: 'update', value: item }),
    }}>
        {children}
    </Ctx.Provider>;
}

export function useSquareContext() {
    const ctx = React.useContext(Ctx);

    return ctx;
}
