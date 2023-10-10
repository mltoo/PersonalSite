import * as React from 'react';
import Contact from './Contact';
import Nav from './Nav';
import { useTWBreakpoints } from './twUtils';
import { lerp } from './animUtils';
import useDimensions from './useDimensions';


export default function Sidebar() {
    const outerRef = React.useRef<HTMLDivElement>(null);
    const contactGridRef = React.useRef<HTMLDivElement>(null);
    const navRef = React.useRef(null);
    const [scrollPosition, setScrollPosition] = React.useState(window.scrollY);
    const navDims = useDimensions(navRef);
    const contactDims = useDimensions(contactGridRef);
    const outerDims = useDimensions(outerRef);

    const targetScrollPosition = 800;
    const activeBreakpoints = useTWBreakpoints();

    React.useEffect(() => {
        function handleScrollChange() {
            setScrollPosition(window.scrollY);
        }
        window.addEventListener('scroll', handleScrollChange);
        return ()=>window.removeEventListener('scroll', handleScrollChange);
    }, []);
    
    const scrollProgress = scrollPosition/targetScrollPosition;
    return <React.Fragment>
    <div ref={outerRef} className="bg-themeBlue box-content fixed top-0 right-0 left-0 md:fixed text-white text-right px-6 pt-8 pb-16 overflow-clip" 
    style={{
        height: `calc(${lerp(contactDims.height, 0, scrollProgress) + navDims.height}px + ${lerp(5,0,scrollProgress)}rem`,
    }}>
        <div className="relative">
            <div className="text-right leading-none grid justify-items-end" ref={contactGridRef}
            style={{
                gridTemplateColumns: `${lerp(1,0,scrollProgress)}fr auto ${lerp(0,1,scrollProgress)}fr`
            }}>
                <div 
                className="text-5xl w-min font-black mb-2 col-start-2" 
                style={{
                    fontSize: `${lerp(3,1.25, scrollProgress)}rem`,
                }}>
                    Alexander Thomas
                </div>
                <div className="text-base font-black col-start-2 row-start-2"
                style={{
                    fontSize: `${lerp(1,0.5,scrollProgress)}rem`,
                    lineHeight: `${lerp(1.5, 0.75, scrollProgress)}rem`,
                    opacity: `${lerp(1,0,scrollProgress)}`
                }}>
                    MEng Computer Science<br/>
                    Graduate
                </div>
                <Contact className="row-start-3 col-start-2"
                style= {{
                    opacity: `${lerp(1,0,scrollProgress)}`,
                }}
                scale={lerp(1,0.4,scrollProgress)}/>
            </div>
            <Nav ref={navRef} style={{
                top: `calc(${lerp(5, 0, scrollProgress)}rem + ${lerp(contactDims.height, 0, scrollProgress)}px`
            }}/>
        </div>
    </div>
    {/*<div style={{height: `${Math.min(outerDims.height + scrollPosition, outerDims.height + targetScrollPosition)}px`}}/>*/}
    <div style={{
        height: `${outerDims.height + Math.min(scrollPosition, targetScrollPosition)}px`
    }}>HELLO</div>
    </React.Fragment>;
}
