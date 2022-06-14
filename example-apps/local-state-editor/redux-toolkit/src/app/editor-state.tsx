import { configureStore, createAction, createReducer, createSelector } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

let counter = 0;
export const addIdAction = createAction<string, 'ADD_ID'>('ADD_ID');

const idsReducer = createReducer<string[]>([], (builder) => {
    builder
        .addCase(addIdAction, (state, { payload }) => {
            state.push(payload);
        });
});

export const updateItemAction = createAction<Item, 'UPDATE_ITEM'>('UPDATE_ITEM');
const itemsReducer = createReducer<{ [id: string]: Item }>({}, (builder) => {
    builder
        .addCase(updateItemAction, (state, { payload }) => {
            state[payload.id] = payload;
        });
});
const defaultItem = (id: string): Item => ({
    id,
    background: '#ddd',
    x: 0,
    y: 0,
});

export const store = configureStore({
    reducer: {
        itemIds: idsReducer,
        items: itemsReducer,
    },
});

// app specific types needed
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function itemIdsSelector(state: RootState) {
    return state.itemIds;
}
export const itemSelector = (id: string) => createSelector(
    (state: RootState) => {
        return state.items[id] || defaultItem(id);
    },
    item => item
);