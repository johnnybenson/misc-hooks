import * as React from 'react';

/**
 * useClickOutside hook
 * @param ref Element to watch for outside click
 * @param onClick On click outside callback
 */
export function useClickOutside<T extends HTMLElement | null>(
    ref: React.MutableRefObject<T>,
    onClick: () => void,
): void {
    const onClickRef = React.useRef(onClick);

    const handler = React.useCallback(
        (event: MouseEvent) => {
            ref.current &&
                !ref.current.contains(event.target as Node) &&
                onClickRef.current &&
                onClickRef.current();
        },
        [ref],
    );

    React.useEffect(() => {
        onClickRef.current = onClick;
        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    }, [ref, onClick, handler]);
}
