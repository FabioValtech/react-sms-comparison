import * as React from "react";
import { Button } from './button';
import { useSnapshot } from 'valtio'
import { editorState } from './editor-state';

let counter = 0;

export function DebugPanel() {
    const ids = useSnapshot(editorState.ids);
    const items = useSnapshot(editorState.items);

    function addSingleItem() {
        const id = `id${++counter}`;
        // direct manipulation
        editorState.ids.push(id);
        editorState.items[id] = {
            background: 'gray',
            id,
            x: 0,
            y: 0,
        };
    }

    function addMany() {
        new Array(1000).fill(0).forEach(() => {
            const id = `id${++counter}`;
            editorState.ids.push(id);
            editorState.items[id] = {
                background: 'gray',
                id,
                x: 0,
                y: 0,
            };
        })
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
    const item = useSnapshot(editorState.items[id])

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}