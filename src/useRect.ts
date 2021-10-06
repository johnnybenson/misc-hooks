import * as React from 'react';

export function useRect<T extends Element>(ref: React.RefObject<T>): DOMRect {
    const [rect, setRect] = React.useState<DOMRect>(
        getRect(ref && ref.current ? ref.current : undefined),
    );

    const handleResize = React.useCallback(
        () => ref.current && setRect(getRect(ref.current)),
        [ref],
    );

    React.useLayoutEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        handleResize();

        let resizeObserver: ResizeObserver | null = new ResizeObserver(
            handleResize,
        );
        resizeObserver.observe(element);

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
                resizeObserver = null;
            }
        };
    }, [ref, handleResize]);

    return rect;
}

function getRect(element?: Element): DOMRect {
    return element ? element.getBoundingClientRect() : new DOMRect(0, 0, 0, 0);
}
