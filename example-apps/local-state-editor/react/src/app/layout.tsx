import * as React from "react";
import { DebugPanel } from './debug-panel';
import { Editor } from './editor';
import { Item } from './editor-state';

export function Layout() {
    const [itemIds, setItemIds] = React.useState<string[]>([]);
    const [itemMap, setItemMap] = React.useState<Record<string, Item>>({});

    const updateItem = React.useCallback((item: Item) => {
        setItemMap((old) => ({ ...old, [item.id]: item }));
    }, [setItemMap]);

    const addItem = React.useCallback((item: Item) => {
        setItemIds((old) => [...old, item.id]);;
        updateItem(item);
    }, [setItemIds, updateItem]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100vh',
        }}>
            <div style={{
                flexBasis: '300px',
                height: '100%',
                backgroundColor: '#cacaca',
            }}>
                <DebugPanel addItem={addItem} itemIds={itemIds} itemMap={itemMap} />
            </div>
            <div style={{
                flexGrow: 1
            }}>
                <Editor itemIds={itemIds} itemMap={itemMap} updateItem={updateItem} />
            </div>
            <div style={{
                flexBasis: '300px',
                height: '100%',
                backgroundColor: '#cacaca',
            }}>

            </div>
        </div>
    );
}