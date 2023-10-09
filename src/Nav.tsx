import React from 'react';
import NavItem from './NavItem';

type navItem = [name: string];

export default function Nav() {
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
    }

    function handleItemDimChange(index: number, width: number, height: number): void {
        if (index == currentSelect)
            setSelectItemDim([width, height]);
        if (index == currentFocus)
            setFocusItemDim([width, height]);
    }

    return <nav className="relative mt-16" style={{height: navItems.length*selectItemDim[1]}}>
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
        <div className="text-2xl flex flex-col items-end">
            {navItems.map((item, index) => 
                <NavItem key={index} index={index} 
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} 
                onDimChange={handleItemDimChange} onClick={handleItemClick}
                absoluteTop={index*selectItemDim[1]} absoluteRight={0}>
                    {item[0]} 
                </NavItem>)}
        </div>
    </nav>;
}

