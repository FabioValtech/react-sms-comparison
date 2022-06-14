import * as React from "react";
import { Button } from './button';
import { useSquareContext } from './editor-state';

let idCounter = 0;

export function DebugPanel({
}: {
}) {
    const ctx = useSquareContext();
    function addItem() {
        ctx.addItem({
            id: `id${++idCounter}`,
            background: '#ddd',
            x: 0,
            y: 0,
        });
    }

    function addMany() {
        for (let i = 0; i < 1000; i++) {
            addItem();
        }
    }

    return <div>
        <div style={{
            display: 'flex',
        }}>
            <Button onClick={addItem}>+</Button>
            <Button onClick={addMany}>++</Button>
        </div>
        {ctx.itemIds.map(id => (
            <ItemDebugger key={id} id={id} />
        ))}
    </div>;
}

function ItemDebugger({ id }: { id: string }) {
    const ctx = useSquareContext();

    const item = ctx.item(id);

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}