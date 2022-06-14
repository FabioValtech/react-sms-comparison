import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/app';

if (!new class { x: any }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

window.onload = () => {
    const el = document.getElementById("app");
    if (!el) {
        document.write("failed to find root element");
        return;
    }
    const root = createRoot(el);
    root.render(<App />);
};

