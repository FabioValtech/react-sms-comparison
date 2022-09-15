import { Subscribe } from '@react-rxjs/core';
import * as React from 'react';
import { Layout } from './layout';

export function App() {

    return (
        <Subscribe>
            <Layout />
        </Subscribe>
    );
}
