import * as React from "react";
import { Button } from './button';
import { useItemIds, postItem, useItem } from './editor-state';

let counter = 0;

export function DebugPanel({
}: {
}) {
    const itemIds = useItemIds();

    function addItem() {
        postItem({
            id: `id${++counter}`,
            background: 'grey',
            x: 0,
            y: 0,
        });
    }

    function addMany() {
        for (let i = 0; i < 1000; i++) {
            addItem();
        }
    }

    console.log('itemIds', itemIds);

    return <div>
        <div style={{
            display: 'flex',
        }}>
            <Button onClick={addItem}>+</Button>
            <Button onClick={addMany}>++</Button>
        </div>
        {itemIds.map(id => (
            <ItemDebugger key={id} id={id} />
        ))}
    </div>;
}

function ItemDebugger({ id }: { id: string }) {
    const item = useItem(id);

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}