import React from 'react';

export type Dimension = {
    width: number,
    height: number
}

export default function useDimensions(elementRef: React.RefObject<Element>) {
    const [dim, setDim] = React.useState<Dimension>({width:0, height:0});

    React.useEffect(() => {
        if (!elementRef.current) return;

        const observer = new ResizeObserver(() => {
            if(!elementRef.current) return;
            setDim({
                width: elementRef.current.clientWidth, 
                height: elementRef.current.clientHeight
            });
        });
        observer.observe(elementRef.current);

        return ()=>observer.disconnect();
    }, []);

    return dim;
}
