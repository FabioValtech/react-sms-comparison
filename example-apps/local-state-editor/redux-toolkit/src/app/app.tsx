import * as React from 'react';
import { Provider } from 'react-redux';
import { Layout } from './layout';
import { store } from './editor-state';

export function App() {

    return (
        <Provider store={store}>
            <Layout />
        </Provider>
    );
}
