import React from 'react';
import NavItem from './NavItem';
import { twMerge } from 'tailwind-merge';

type navItem = [name: string];
type navProps = {
    style?: object,
    className?: string,
    onNavSelHeightChange?: (newNavSelHeight: number) => void,
    onNavSelPosnChange?: (newNavSelPosn: number) => void,
    onFocusChange?: () => void;
}

export default React.forwardRef<HTMLDivElement, navProps>((props, ref) => {
    const navItems: navItem[] = [
        ["About me"],
        ["Projects"],
        ["Contact"]
    ];
    const [currentFocus, setCurrentFocus] = React.useState(0);
    const [focusItemDim, setFocusItemDim] = React.useState([0,0]);
    const [currentSelect, setCurrentSelect] = React.useState(0);
    const [selectItemDim, setSelectItemDim] = React.useState([0,0]);
    function handleMouseEnter(index: number, width: number, height: number): void {
        if(index != currentFocus)
            props.onFocusChange?.();
        setCurrentFocus(index);
        setFocusItemDim([width, height]);
    }

    function handleMouseLeave(): void {
        setCurrentFocus(currentSelect);
        setFocusItemDim(selectItemDim);
    }

    function handleItemClick(): void {
        setCurrentSelect(currentFocus);
        setSelectItemDim(focusItemDim);
        props.onNavSelHeightChange?.(focusItemDim[1]);
        props.onNavSelPosnChange?.(currentFocus*focusItemDim[1]);
    }

    function handleItemDimChange(index: number, width: number, height: number): void {
        if (index == currentSelect) {
            setSelectItemDim([width, height]);
            props.onNavSelHeightChange?.(height);
            props.onNavSelPosnChange?.(index*height);
        }
        if (index == currentFocus)
            setFocusItemDim([width, height]);
    }
    return <nav ref={ref} onMouseLeave={handleMouseLeave} className={twMerge("transition-all absolute top-24 right-0", props.className)} style={{height: navItems.length*selectItemDim[1], ...props.style}}>
        <div 
        className="z-10 transition-all motion-reduce:transition-none absolute -right-2"
        onMouseLeave={handleMouseLeave}
        onClick={handleItemClick}
        style={{
            backdropFilter:'url(#themeBlue-invert)', 
            height: focusItemDim[1], 
            width: `calc(${focusItemDim[0]}px + 1rem)`, 
            top: currentFocus * focusItemDim[1]}}

        />
        <svg className="h-0 w-0">
            <defs>
                <filter id="themeBlue-invert">
                    <feComponentTransfer colorInterpolationFilters='sRGB'>
                        <feFuncA type="identity"/>
                        <feFuncR type="linear" slope="-1" intercept="1.02"/>
                        <feFuncG type="linear" slope="-1" intercept="1.196"/>
                        <feFuncB type="linear" slope="-1" intercept="1.396"/>
                    </feComponentTransfer>
                </filter>
            </defs>
        </svg>
        <div className="text-2xl">
            {navItems.map((item, index) => 
                <NavItem key={index} index={index} 
                onMouseEnter={handleMouseEnter} 
                onDimChange={handleItemDimChange} 
                absoluteTop={index*selectItemDim[1]} absoluteRight={0}>
                    {item[0]} 
                </NavItem>)}
        </div>
    </nav>;
});

