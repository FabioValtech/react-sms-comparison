import { createSignal, mergeWithKey, partitionByKey } from '@react-rxjs/utils'
import { bind } from '@react-rxjs/core'
import { scan } from 'rxjs';

interface Item {
    id: string;
    x: number;
    y: number;
    background: string;
}

const [item$, postItem] = createSignal<Item>();
const [itemEdit$, editItem] = createSignal<Item>();

const itemActions$ = mergeWithKey({
    add: item$,
    edit: itemEdit$,
})

const [itemsMap, keys$] = partitionByKey(
    itemActions$,
    event => event.payload.id,
    (event$, id) => event$.pipe(
        scan((_, action) => action.payload, { id, x: 0, y: 0, background: 'grey' } as Item)
    )
)
const [useItemIds] = bind(keys$);
const [useItem] = bind((id: string) => itemsMap(id));

export {
    postItem,
    editItem,
    useItem,
    useItemIds,
};
