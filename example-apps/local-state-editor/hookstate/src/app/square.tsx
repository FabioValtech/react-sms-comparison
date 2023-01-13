import { ImmutableObject, State, useHookstate } from "@hookstate/core";
import * as React from "react";
import { Item } from './editor-state';

export function Square(props: { square: State<ImmutableObject<Item>, {}> }) {
    const [isDown, setIsDown] = React.useState(false);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);

    const square = useHookstate(props.square);

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDown) {
            return;
        }
        const parent = e.currentTarget.parentElement?.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        square.set(it => ({
            ...it,
            x: Math.round(x - (parent?.left || 0) - offsetX),
            y: Math.round(y - (parent?.top || 0) - offsetY),
        }));
    }

    function handleMouseDown(e: React.MouseEvent) {
        const self = e.currentTarget.getBoundingClientRect();
        setOffsetX(e.clientX - self.left);
        setOffsetY(e.clientY - self.top);
        setIsDown(true);
        e.stopPropagation();
    }

    if (!square.get()) {
        return <>item does not exists</>
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseLeave={() => setIsDown(false)}
            onMouseUp={() => setIsDown(false)}
            onMouseMove={handleMouseMove}
            style={{
                backgroundColor: square.background.get(),
                top: square.y.get(),
                left: square.x.get(),
                width: 50,
                height: 50,
                position: 'absolute',
                cursor: 'grab',
                border: `dashed 2px ${isDown ? 'blue' : 'transparent'}`,
            }}
        />
    );
}