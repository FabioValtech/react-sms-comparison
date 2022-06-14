import * as React from "react";
import { useSquareContext } from './editor-state';
import { Square } from './square';

export function Editor({
    itemIds
}: {
    itemIds: string[],
}) {

    return (
        <div style={{
            position: 'relative',
        }}>
            {itemIds.map(id => (
                <Square id={id} key={id} />
            ))}
        </div>
    );
}
