import React from 'react';

type NavItemProps = {
    children: any,
    index: number,
    absoluteTop: number,
    absoluteRight: number,
    onMouseEnter?: (index: number, width: number, height: number) => void,
    onDimChange?: (index: number, width: number, height: number) => void,
    onClick?: (index: number, width: number, height: number) => void
};

export default function NavItem(props : NavItemProps) {
    const mainDiv = React.useRef<HTMLDivElement>(null);
    function handleMouseEnter() {
        if (mainDiv.current)
            props.onMouseEnter?.(props.index, mainDiv.current.clientWidth, mainDiv.current.clientHeight);
    }
    
    function handleClick() {
        if(mainDiv.current)
            props.onClick?.(props.index, mainDiv.current.clientWidth, mainDiv.current.clientHeight);
    }
    


    React.useEffect(() => {
        if (!mainDiv.current) return;

        const observer = new ResizeObserver(() => {
            if(!mainDiv.current) return;
            props.onDimChange?.(props.index, mainDiv.current.clientWidth, mainDiv.current.clientHeight);
        });

        observer.observe(mainDiv.current);

        return () => {
            observer.disconnect();
        }
    }, []);

    return <div className="w-max absolute z-0" style={{top: props.absoluteTop, right: props.absoluteRight}} onMouseEnter={handleMouseEnter} onClick={handleClick} ref={mainDiv}>
        {props.children}
    </div>;
}
