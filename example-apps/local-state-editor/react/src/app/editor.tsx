import * as React from "react";
import { Item } from './editor-state';
import { Square } from './square';

export function Editor({
    itemIds,
    itemMap,
    updateItem,
}: {
    itemIds: string[];
    itemMap: Record<string, Item>;
    updateItem: (item: Item) => void;
}) {

    return (
        <div style={{
            position: 'relative',
        }}>
            {itemIds.map(id => (
                <Square item={itemMap[id]} key={id} updateItem={updateItem} />
            ))}
        </div>
    );
}
