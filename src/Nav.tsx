import React from 'react';
import NavItem from './NavItem';
import { twMerge } from 'tailwind-merge';
import { useMediaQueries } from './twUtils';

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
    const [currentSelect, setCurrentSelect] = React.useState(0);
    const [itemDims, setItemDims] = React.useState(Array(navItems.length).fill([0,0]));
    const mq = useMediaQueries();
    function handleMouseEnter(index: number, width: number, height: number): void {
        if(index != currentFocus)
            props.onFocusChange?.();
        setCurrentFocus(index);
        itemDims[index] = [width, height];
        setItemDims(itemDims);
    }

    function handleMouseLeave(): void {
        setCurrentFocus(currentSelect);
    }

    function handleHighlightClick(): void {
        setCurrentSelect(currentFocus);
    }
    
    function handleItemClick(index: number, width: number, height: number): void {
        setCurrentSelect(index);
        setCurrentFocus(index);
        itemDims[index] = [width, height];
        setItemDims(itemDims);
    }

    function handleItemDimChange(index: number, width: number, height: number): void {
        itemDims[index] = [width, height];
        setItemDims(itemDims);
    }

    React.useEffect(() => {
        props.onNavSelPosnChange?.(currentSelect*itemDims[0][1])
        props.onNavSelHeightChange?.(itemDims[currentSelect][1]);
    }, [currentSelect, itemDims[currentSelect]]);


    return <nav ref={ref} onMouseLeave={handleMouseLeave} className={twMerge("transition-all absolute lg:relative lg:mt-24 right-0 text-2xl", props.className)} 
        style={{height: mq<string|number>([navItems.length*itemDims[0][1], {lg:'auto'}]), ...props.style}}
    >
        <div 
        className="z-10 transition-all motion-reduce:transition-none absolute -right-2"
        onMouseLeave={handleMouseLeave}
        onClick={handleHighlightClick}
        style={{
            backdropFilter:'url(#themeBlue-invert)', 
            height: itemDims[currentFocus][1], 
            width: `calc(${itemDims[currentFocus][0]}px + 1rem)`, 
            top: currentFocus * itemDims[currentFocus][1],
            gridRowStart: mq<string|number>(['auto', {lg: currentFocus+1}]),
            gridColumnStart: mq<string|number>(['auto', {lg: 1}])
        }}
        />
        <svg className="h-0 w-0 lg:fixed">
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
        {navItems.map((item, index) => 
            <NavItem key={index} index={index} isSelected={index === currentSelect}
            onMouseEnter={handleMouseEnter} onClick={handleItemClick}
            onDimChange={handleItemDimChange} 
            absoluteTop={index*itemDims[currentFocus][1]} absoluteRight={0}
            >
                {item[0]} 
            </NavItem>)}
    </nav>;
});

