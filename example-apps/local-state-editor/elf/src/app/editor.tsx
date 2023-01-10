import { useObservable } from "@ngneat/use-observable";
import * as React from "react";
import { items$ } from "./editor-state.repository";
import { Square } from './square';

export function Editor({
}: {
}) {
    const [items] = useObservable(items$);

    if (!items) {
        return <>no items</>
    }

    return (
        <div style={{
            position: 'relative',
        }}>
            {items.map((item) => (
                <Square id={item.id} key={item.id} />
            ))}
        </div>
    );
}
