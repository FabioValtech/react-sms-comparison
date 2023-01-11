import * as React from "react";
import { Button } from './button';
import { Item } from './editor-state';

let idCounter = 0;

export function DebugPanel({
    addItem,
    itemIds,
    itemMap,
}: {
    addItem: (item: Item) => void;
    itemIds: string[];
    itemMap: Record<string, Item>;
}) {
    function addOne() {
        addItem({
            id: `id${++idCounter}`,
            background: '#ddd',
            x: 0,
            y: 0,
        });
    }

    function addMany() {
        for (let i = 0; i < 1000; i++) {
            addOne();
        }
    }

    return <div>
        <div style={{
            display: 'flex',
        }}>
            <Button onClick={addOne}>+</Button>
            <Button onClick={addMany}>++</Button>
        </div>
        {itemIds.map(id => (
            <ItemDebugger key={id} item={itemMap[id]} />
        ))}
    </div>;
}

const ItemDebugger = React.memo(({ item }: { item: Item }) => {

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
});
