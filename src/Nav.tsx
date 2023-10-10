import React from 'react';
import NavItem from './NavItem';

type navItem = [name: string];
type navProps = {
    style?: object,
    onNavSelHeightChange?: (newNavSelHeight: number) => void,
    onNavSelPosnChange?: (newNavSelPosn: number) => void
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
        setCurrentFocus(index);
        setFocusItemDim([width, height]);
    }

    function handleMouseLeave(index: number): void {
        if (index == currentFocus) {
            setCurrentFocus(currentSelect);
            setFocusItemDim(selectItemDim);
        }
    }

    function handleItemClick(index: number, width: number, height: number): void {
        setCurrentSelect(index);
        setSelectItemDim([width, height]);
        props.onNavSelHeightChange?.(height);
        props.onNavSelPosnChange?.(index*height);
    }

    function handleItemDimChange(index: number, width: number, height: number): void {
        if (index == currentSelect)
            setSelectItemDim([width, height]);
            props.onNavSelHeightChange?.(height);
            props.onNavSelPosnChange?.(index*height);
        if (index == currentFocus)
            setFocusItemDim([width, height]);
    }

    return <nav ref={ref} className="absolute top-24 right-0" style={{height: navItems.length*selectItemDim[1], ...props.style}}>
        <div className="z-10 transition-all motion-reduce:transition-none absolute -right-2 text-2xl pointer-events-none text-[#ffffff00]" style={{backdropFilter:'url(#themeBlue-invert)', height: focusItemDim[1], width: `calc(${focusItemDim[0]}px + 1rem)`, top: currentFocus * focusItemDim[1]}}>test</div>
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
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                onDimChange={handleItemDimChange} onClick={handleItemClick}
                absoluteTop={index*selectItemDim[1]} absoluteRight={0}>
                    {item[0]} 
                </NavItem>)}
        </div>
    </nav>;
});

