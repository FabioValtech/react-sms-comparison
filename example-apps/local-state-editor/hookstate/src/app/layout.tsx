import * as React from "react";
import { DebugPanel } from './debug-panel';
import { Editor } from './editor';
import { itemsState } from './editor-state';

export function Layout() {

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
                <Editor />
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