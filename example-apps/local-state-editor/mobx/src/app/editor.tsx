import * as React from "react";
import { Square } from './square';
import { itemStore } from './editor-state';
import { observer } from "mobx-react-lite";

export const Editor = observer(({
    store,
    itemIds
}: { store: typeof itemStore, itemIds: string[] }) => {

    return (
        <div style={{
            position: 'relative',
        }}>
            {itemIds.map(id => (
                <Square id={id} key={id} store={store} />
            ))}
        </div>
    );
});
