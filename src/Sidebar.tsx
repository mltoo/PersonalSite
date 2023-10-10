import * as React from 'react';
import Contact from './Contact';
import Nav from './Nav';
import { useTWBreakpoints } from './twUtils';

export default function Sidebar() {
    const [isMobile, setIsMobile] = React.useState();
    const activeBreakpoints = useTWBreakpoints();
    console.log(activeBreakpoints);
    return <div className="bg-themeBlue sticky top-0 w-full md:fixed text-white text-right px-6 pt-8 pb-16">
        <div className="text-right leading-none flex flex-col items-end">
            <div className="text-5xl w-min font-black mb-2">Alexander Thomas</div>
            <div className="text-md font-black">MEng Computer Science<br/>Graduate</div>
        </div>
        <Contact/>
        <div className="text-white">{activeBreakpoints.toString()}</div>
        <Nav/>
    </div>;
}
