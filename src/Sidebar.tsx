import * as React from 'react';
import Contact from './Contact';
import Nav from './Nav';
import { useMediaQueries, useTWBreakpoints } from './twUtils';
import { lerp } from './animUtils';
import useDimensions from './useDimensions';


export default function Sidebar() {
    const outerRef = React.useRef<HTMLDivElement>(null);
    const contactGridRef = React.useRef<HTMLDivElement>(null);
    const navRef = React.useRef(null);
    const nameRef = React.useRef(null);

    const mq = useMediaQueries();

    const [scrollPosition, setScrollPosition] = React.useState(window.scrollY);
    const [remSize, setRemSize] = React.useState(0);
    const [navSelHeight, setNavSelHeight] = React.useState(0);
    const [navSelPosn, setNavSelPosn] = React.useState(0);
    const [currentBacklash, setCurrentBacklash] = React.useState(0);
    const [headerTransitionOverride, setHeaderTransitionOverride] = React.useState(false);

    const navDims = useDimensions(navRef);
    const contactDims = useDimensions(contactGridRef);
    const nameDims = useDimensions(nameRef);
    
    const initialTopPadding = 2*remSize;
    const finalTopPadding = 0.75*remSize;
    const initialBottomPadding = 3*remSize;
    const finalBottomPadding = 0.75*remSize;
    const preNavPadding = 6*remSize;

    const maxBacklash = Math.max(0, navDims.height - navSelHeight);

    function handleNavSelHeightChange(newNavSelHeight: number) {
        setHeaderTransitionOverride(true);
        setNavSelHeight(newNavSelHeight);
    }

    function handleNavSelPosnChange(newNavSelPosn: number) {
        setNavSelPosn(newNavSelPosn);
    }

    function handleMouseEnter(){
        setCurrentBacklash(maxBacklash);
        setHeaderTransitionOverride(true);
    }

    function handleMouseLeave() {
        setCurrentBacklash(0);
    }


    const initialHeight = (contactDims.height + navDims.height + initialTopPadding + preNavPadding + initialBottomPadding);
    const finalHeight = finalTopPadding + finalBottomPadding + nameDims.height;
    const targetScrollPosition = initialHeight - finalHeight
    const activeBreakpoints = useTWBreakpoints();

    React.useEffect(() => {
        function handleScrollChange() {
            setCurrentBacklash(Math.max(0,Math.min(maxBacklash, -(window.scrollY - scrollPosition) + currentBacklash)));
            setScrollPosition(window.scrollY);
            setHeaderTransitionOverride(false);
        }
        window.addEventListener('scroll', handleScrollChange);
        
        setRemSize(parseInt(getComputedStyle(document.documentElement).fontSize));

        return ()=>window.removeEventListener('scroll', handleScrollChange);
    }, [scrollPosition]);
    const scrollProgress = scrollPosition/targetScrollPosition || 0;

    const currentTopPadding = lerp(initialTopPadding, finalTopPadding, scrollProgress);

    return <React.Fragment>
    <div ref={outerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
    className={`bg-themeBlue box-content fixed top-0 right-0 left-0 lg:right-auto lg:bottom-0 lg:pt-5 text-white text-right px-6 overflow-clip ${headerTransitionOverride ? 'transition-all' : 'transition-none'}`}
    style={{
        //height: `calc(${lerp(contactDims.height, 0, scrollProgress) + navDims.height}px + ${lerp(5,0,scrollProgress)}rem`,
        height: mq<string|number>([lerp(Math.max(finalHeight, initialHeight-scrollPosition), Math.max(finalHeight, initialHeight-scrollPosition)+currentBacklash, scrollProgress), {lg: "auto"}])
    }}>
        <div className="relative lg:static">
            <div className="absolute lg:static w-full text-right leading-none grid justify-items-end" ref={contactGridRef}
            style={{
                gridTemplateColumns: `${lerp(1,0,scrollProgress)}fr auto ${lerp(0,1,scrollProgress)}fr`,
                top: currentTopPadding
            }}>
                <div ref={nameRef}
                className="text-5xl w-min font-black mb-2 col-start-2" 
                style={{
                    ...mq([{
                        fontSize: `${lerp(3,1.15, scrollProgress)}rem`
                    }, {lg:{}}])
                }}>
                    Alexander Thomas
                </div>
                <div className="text-base font-black col-start-2 row-start-2 leading-tight"
                style={{
                    ...mq([{
                        fontSize: `${lerp(1,0.4,scrollProgress)}rem`,
                        lineHeight: `${lerp(1.2, 0.75, scrollProgress)}rem`,
                        opacity: `${lerp(1,0,scrollProgress)}`
                    }, {lg: {}}])
                }}>
                    MEng Computer Science<br/>
                    Graduate
                </div>
                <Contact className="row-start-3 col-start-2"
                style= {{
                    ...mq([{
                        opacity: `${lerp(1,0,scrollProgress)}`,
                    }, {lg:{}}])
                }}
                scale={mq([lerp(1,0.4,scrollProgress), {lg: 1}])}/>
            </div>
            <Nav ref={navRef} className={!headerTransitionOverride ? 'transition-none' : ''} style={mq([{
                top: `${lerp(currentTopPadding + preNavPadding + contactDims.height, finalTopPadding + 0.5*(nameDims.height - navSelHeight) - lerp(navSelPosn, 0, maxBacklash && currentBacklash/maxBacklash), scrollProgress)}px`,
            }, {lg:[]}])} onNavSelHeightChange={handleNavSelHeightChange} onNavSelPosnChange={handleNavSelPosnChange}/>
        </div>
    </div>
    {/*<div style={{height: `${Math.min(outerDims.height + scrollPosition, outerDims.height + targetScrollPosition)}px`}}/>*/}
    <div className="box-content"  style={{
        height: `${initialHeight}px`
    }}/>
    {/*<div className="sticky t-0 z-50" style={{
        height: `calc(${lerp(contactDims.height, 0, scrollProgress) + navDims.height}px + ${lerp(5,0,scrollProgress)}rem`,
    }}>TEST</div>*/}
    </React.Fragment>;
}
