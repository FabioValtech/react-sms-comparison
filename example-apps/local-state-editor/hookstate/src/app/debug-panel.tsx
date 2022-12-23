import { useHookstate } from "@hookstate/core";
import * as React from "react";
import { Button } from './button';
import { itemsState } from "./editor-state";

let counter = 0;

export function DebugPanel({
}: {
}) {
    const items = useHookstate(itemsState);

    function addItem() {
        items.merge([{
            background: 'lightgray',
            id: `id${counter++}`,
            x: 10,
            y: 10,
        }]);
    }

    function addMany() {
        for (let i = 0; i < 1000; i++) {
            addItem();
        }
    }

    console.log('itemIds', []);

    return <div>
        <div style={{
            display: 'flex',
        }}>
            <Button onClick={addItem}>+</Button>
            <Button onClick={addMany}>++</Button>
        </div>
        {[].map(id => (
            <ItemDebugger key={id} id={id} />
        ))}
    </div>;
}

function ItemDebugger({ id }: { id: string }) {

    return (
        <pre>
            {JSON.stringify({})}
        </pre>
    );
}