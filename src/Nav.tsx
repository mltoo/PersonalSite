import React from 'react';

type navItem = [name: string]
const navItems: navItem[] = [
    ["About me"],
    ["Projects"],
    ["Contact"]
]

export default function Nav() {
    return <React.Fragment>
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
        <div className="text-2xl mt-16 row-start-1 col-start-1">
            {navItems.map((item, index) => <div key={index}>
                {item[0]} 
            </div>)}
        </div>
        <div className="absolute top-52 left-52 w-32 h-32 pointer-events-none" style={{backdropFilter:'url(#themeBlue-invert)'}}/>
    </React.Fragment>
}

