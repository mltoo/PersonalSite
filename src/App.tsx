import * as React from 'react';
import Sidebar from './Sidebar';

export function App() {
    return <React.Fragment>
        <Sidebar/>
        test
        <div className="h-96 bg-red-500"/> 
        <div className="h-96 bg-green-500"/>
        <div className="h-96 bg-blue-500"/>
        <div className="h-96 bg-orange-500"/>
    </React.Fragment>;

}
