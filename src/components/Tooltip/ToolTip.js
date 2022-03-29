import React from 'react';
import "./Tooltip.css";

const ToolTip = ({coords, child}) => {
    return (
        <div className={"tooltip"} style={{
            left: `${coords.left}px`,
            top: `${coords.top}px`
        }}>
            {child}
        </div>
    );
};

export default ToolTip;