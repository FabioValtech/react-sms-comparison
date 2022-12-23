import { useHookstate } from "@hookstate/core";
import * as React from "react";
import { itemsState } from "./editor-state";
import { Square } from './square';

export function Editor({
}: {
}) {
    const tasks = useHookstate(itemsState);

    return (
        <div style={{
            position: 'relative',
        }}>
            {tasks.map((task, index) => (
                <Square task={task} key={task.id.get()} />
            ))}
        </div>
    );
}
