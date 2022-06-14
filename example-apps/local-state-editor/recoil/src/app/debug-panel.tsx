import * as React from "react";
import { useRecoilState } from "recoil";
import { Button } from './button';
import { itemIdsState, itemWithId } from './editor-state';

let counter = 0;

export function DebugPanel({
}: {
}) {
    const [itemIds, setItemIDs] = useRecoilState(itemIdsState);

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
    const [item] = useRecoilState(itemWithId(id));

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}