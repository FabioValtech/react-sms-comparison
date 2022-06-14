import * as React from "react";

export function Button({
    onClick,
    children
}: {
    onClick?: () => void;
    children?: React.ReactNode;
}) {
    return <div
        style={{
            borderRadius: 4,
            boxShadow: '1px 2px 7px 1px #999',
            minWidth: 24,
            width: 24,
            minHeight: 24,
            margin: 12,
            padding: 12,
            fontSize: 20,
            textAlign: 'center',
        }}
        onClick={onClick}
    >
        {children}
    </div>
}
