import * as React from 'react';

export const usePrevious = <T>(value: T): T | undefined => {
    const ref: React.MutableRefObject<T | undefined> = React.useRef<T>();

    React.useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};
