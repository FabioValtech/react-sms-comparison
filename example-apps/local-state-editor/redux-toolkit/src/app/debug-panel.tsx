import * as React from "react";
import { Button } from './button';
import { useAppDispatch, useAppSelector, itemIdsSelector, itemSelector, addIdAction, updateItemAction } from './editor-state';

let counter = 0;

export function DebugPanel({
}: {
}) {
    const itemIds = useAppSelector(itemIdsSelector);
    const dispatch = useAppDispatch();

    function addItem() {
        const id = `id${++counter}`;
        dispatch(addIdAction(id));
        dispatch(updateItemAction({
            id,
            background: '#ddd',
            x: 0,
            y: 0,
        }));
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
        {itemIds.map(id => (
            <ItemDebugger key={id} id={id} />
        ))}
    </div>;
}

function ItemDebugger({ id }: { id: string }) {
    const item = useAppSelector(itemSelector(id));

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}