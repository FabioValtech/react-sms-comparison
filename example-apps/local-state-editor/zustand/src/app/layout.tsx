import * as React from "react";
import { DebugPanel } from './debug-panel';
import { Editor } from './editor';
import { useItemsIdsStore } from './editor-state';

export function Layout() {
    const itemIds = useItemsIdsStore((state) => state.ids)

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
                <DebugPanel />
            </div>
            <div style={{
                flexGrow: 1
            }}>
                <Editor itemIds={itemIds} />
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