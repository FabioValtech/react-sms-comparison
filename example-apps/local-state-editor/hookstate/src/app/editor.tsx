import { useHookstate } from "@hookstate/core";
import * as React from "react";
import { itemsState } from "./editor-state";
import { Square } from './square';

export function Editor({
}: {
}) {
    console.log('editor rerendered');
    const squares = useHookstate(itemsState);

    return (
        <div style={{
            position: 'relative',
        }}>
            {squares.map((square, index) => (
                <Square square={square} key={index} />
            ))}
        </div>
    );
}
