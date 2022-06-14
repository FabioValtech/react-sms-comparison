import { observer } from "mobx-react-lite";
import * as React from "react";
import { Button } from './button';
import { itemStore } from './editor-state';

export const DebugPanel = observer(({ store }: {
    store?: typeof itemStore,
}) => {

    function addMany() {
        for (let i = 0; i < 1000; i++) {
            store!.addItem();
        }
    }

    return <div>
        <div style={{
            display: 'flex',
        }}>
            <Button onClick={store!.addItem}>+</Button>
            <Button onClick={addMany}>++</Button>
        </div>
        {store!.itemIds.map(id => (
            <ItemDebugger key={id} store={store} id={id} />
        ))}
    </div>;
});

const ItemDebugger = observer<{ store?: typeof itemStore, id: string }>(({ store, id }) => {

    return (
        <pre>
            {JSON.stringify(store!.items[id])}
        </pre>
    );
});
