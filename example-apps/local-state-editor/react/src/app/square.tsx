import * as React from "react";
import { useSquareContext } from './editor-state';

export function Square({ id }: { id: string }) {
    const [isDown, setIsDown] = React.useState(false);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);
    const context = useSquareContext();

    const item = context.item(id);

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDown) {
            return;
        }
        const parent = e.currentTarget.parentElement?.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        context.updateItem({
            ...item,
            x: Math.round(x - (parent?.left || 0) - offsetX),
            y: Math.round(y - (parent?.top || 0) - offsetY),
        });
    }

    function handleMouseDown(e: React.MouseEvent) {
        const self = e.currentTarget.getBoundingClientRect();
        setOffsetX(e.clientX - self.left);
        setOffsetY(e.clientY - self.top);
        setIsDown(true);
    }

    if (!item) {
        return <>item with id '{id}'' does not exists</>
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseLeave={() => setIsDown(false)}
            onMouseUp={() => setIsDown(false)}
            onMouseMove={handleMouseMove}
            style={{
                backgroundColor: item.background,
                top: item.y,
                left: item.x,
                width: 50,
                height: 50,
                position: 'absolute',
                cursor: 'grab',
                border: `dashed 2px ${isDown ? 'blue' : 'transparent'}`,
            }}
        />
    );
}