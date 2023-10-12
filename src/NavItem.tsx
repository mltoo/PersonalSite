import React from 'react';

type NavItemProps = {
    children: any,
    index: number,
    absoluteTop: number,
    absoluteRight: number,
    isSelected: boolean,
    style?: object
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
    }, [props, mainDiv]);

    return <div className={`select-none w-max absolute lg:right-0 z-0 ${props.isSelected ? 'font-bold' : ''}`} style={{top: props.absoluteTop, right: props.absoluteRight, ...props.style}} onMouseEnter={handleMouseEnter} onClick={handleClick} ref={mainDiv}>
        {props.children}
    </div>;
}
