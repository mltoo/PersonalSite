import React from 'react';
import preval from 'babel-plugin-preval/macro';

const fullConfig: any = preval`
    resolveConfig = require('tailwindcss/resolveConfig');
    twConfig = require('../tailwind.config');
    module.exports = resolveConfig(twConfig)
`;

export function getActiveTWBreakpoints(): string[] {
    const screensStrings: {any: string} | null = fullConfig?.theme?.screens;
    if (screensStrings != null) {
        let breakpointNames: [string, number][] = [];
        for (const breakpointName of Object.keys(screensStrings)) {
            if (screensStrings[breakpointName].slice(-2) === "px") {
                const pxSize = parseInt(screensStrings[breakpointName].slice(0,-2));
                if (!isNaN(pxSize))
                    breakpointNames.push([breakpointName, pxSize]);
            }
        }
        breakpointNames.sort(([,a], [,b])=>a-b);
        
        let activeBreakpoints: string[] = [];
        for (const [bpName, bpValue] of breakpointNames) {
            if (bpValue > window.innerWidth) {
                return activeBreakpoints;
            } else {
                activeBreakpoints.push(bpName);
            }
        }
        return activeBreakpoints;
    }
    return [];
}

export function useTWBreakpoints() {
    const [activeBreakpoints, setActiveBreakpoints] 
        = React.useState(getActiveTWBreakpoints());

    React.useEffect(() => {
        function handleResize() {
            setActiveBreakpoints(getActiveTWBreakpoints());
        }
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return activeBreakpoints;
}
