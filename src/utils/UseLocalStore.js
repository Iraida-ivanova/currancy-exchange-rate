import React from "react";

export const useLocalStore = (creator) => {
    const container = React.useRef(null);
    if (container.current === null) {
        container.current = creator();
    }

    React.useEffect(() => {
        return () => container.current?.destroy();
    }, []);
    return container.current;
};

