import * as React from "react";
import { observer } from "mobx-react-lite"
import { DebugPanel } from './debug-panel';
import { Editor } from './editor';
import { itemStore } from './editor-state';

export const Layout = observer((props: { itemStore: typeof itemStore }) => {
    const itemIds = props.itemStore.itemIds;

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
                <DebugPanel store={props.itemStore} />
            </div>
            <div style={{
                flexGrow: 1
            }}>
                <Editor store={props.itemStore} itemIds={itemIds} />
            </div>
            <div style={{
                flexBasis: '300px',
                height: '100%',
                backgroundColor: '#cacaca',
            }}>

            </div>
        </div>
    );
});
