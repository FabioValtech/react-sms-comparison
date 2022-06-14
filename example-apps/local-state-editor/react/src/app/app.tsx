import * as React from 'react';
import { EditorProvider } from './editor-state';
import { Layout } from './layout';

export function App() {

    return (
        <EditorProvider>
            <Layout />
        </EditorProvider>
    );
}
