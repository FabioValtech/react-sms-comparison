import * as React from "react";
import shallow from "zustand/shallow";
import { Button } from './button';
import { useItemsIdsStore, useItemsStore } from './editor-state';

let counter = 0;

export function DebugPanel() {
    const { addItemId, addItemIds, ids } = useItemsIdsStore()
    const { setItem, setItems } = useItemsStore((state) => ({ setItem: state.setItem, setItems: state.setItems}), shallow)

    function addSingleItem() {
        const id = `id${++counter}`
        addItemId(id);
        setItem({
            background: 'gray',
            id,
            x: 0,
            y: 0,
        })
    }

    function addMany() {
        const itemIds = new Array(1000).fill(0).map(() => `id${++counter}`)
        addItemIds(itemIds);
        const items = Object.fromEntries(itemIds.map((id) => [id, { x: 0, y: 0, background: 'gray', id }]))
        setItems(items)
    }

    console.log('itemIds', ids);

    return <div>
        <div style={{
            display: 'flex',
        }}>
            <Button onClick={addSingleItem}>+</Button>
            <Button onClick={addMany}>++</Button>
        </div>
        {ids.map(id => (
            <ItemDebugger key={id} id={id} />
        ))}
    </div>;
}

function ItemDebugger({ id }: { id: string }) {
    const item = useItemsStore((state) => state.items[id])

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}