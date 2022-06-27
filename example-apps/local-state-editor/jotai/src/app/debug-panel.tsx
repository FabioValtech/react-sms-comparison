import { useAtom } from "jotai";
import * as React from "react";
import { Button } from './button';
import { itemIdsState, itemWithId } from './editor-state';

let counter = 0;

export function DebugPanel({
}: {
}) {
    const [itemIds, setItemIDs] = useAtom(itemIdsState);

    function addItem() {
        setItemIDs(ids => [...ids, `id${++counter}`]);
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
    const [item] = useAtom(itemWithId(id));

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}