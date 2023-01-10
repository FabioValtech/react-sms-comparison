import { useObservable } from "@ngneat/use-observable";
import * as React from "react";
import { Button } from './button';
import { createItems, getItemObservableById, items$ } from "./editor-state.repository";

export function DebugPanel({
}: {
}) {
    const [items] = useObservable(items$);

    function addItem() {
        createItems(1);
    }

    function addMany() {
        createItems(1000);
    }

    console.log('itemIds', items);

    return <div>
        <div style={{
            display: 'flex',
        }}>
            <Button onClick={addItem}>+</Button>
            <Button onClick={addMany}>++</Button>
        </div>
        {items.map(item => (
            <ItemDebugger key={item.id} id={item.id} />
        ))}
    </div>;
}

function ItemDebugger({ id }: { id: string }) {
    const item$ = React.useMemo(() => getItemObservableById(id), [id]);
    const [item] = useObservable(item$);

    return (
        <pre>
            {JSON.stringify(item)}
        </pre>
    );
}