import * as React from 'react';
import { Layout } from './layout';
import { itemStore } from './editor-state';

export function App() {

    return (
        <Layout itemStore={itemStore} />
    );
}
