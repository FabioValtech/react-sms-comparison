import * as React from "react";
import { connect } from "react-redux";
import { useAppSelector, useAppDispatch, itemSelector, updateItemAction, Item, RootState } from './editor-state';

function SquareImpl({ id, item }: { id: string, item: Item }) {
    const [isDown, setIsDown] = React.useState(false);
    const [offsetX, setOffsetX] = React.useState(0);
    const [offsetY, setOffsetY] = React.useState(0);

    const dispatch = useAppDispatch();

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDown) {
            return;
        }
        const parent = e.currentTarget.parentElement?.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        dispatch(updateItemAction({
            ...item,
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

const mapStateToProps = (state: RootState, props: { id: string }) => ({
    item: state.items[props.id],
});

export const Square = connect(mapStateToProps)(SquareImpl);
