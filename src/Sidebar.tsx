import * as React from 'react';
import Contact from './Contact';
import Nav from './Nav';

export default function Sidebar() {
    return <div className="bg-themeBlue text-white text-right p-6">
        <div className="text-right leading-none">
            <div className="text-5xl font-black mb-2">Alexander Thomas</div>
            <div className="text-md font-black">MEng Computer Science<br/>Graduate</div>
        </div>
        <Contact/>
        <Nav/>
    </div>;
}
