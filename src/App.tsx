import * as React from 'react';
import Sidebar from './Sidebar';
import { useTWBreakpoints, useMediaQueries} from './twUtils';

export function App() {
    const activeBreakpoints = useTWBreakpoints();
    const mq = useMediaQueries();
    return <div className="lg:grid lg:grid-cols-2">
        <Sidebar className='lg:col-start-1 lg:row-start-1 lg:row-end-1'/>
        <div className='lg:col-start-2 lg:row-start-1 lg:row-end-1'>
            test
            <div className="h-96 bg-red-500"/> 
            <div className="h-96 bg-green-500"/>
            <div className="h-96 bg-blue-500"/>
            <div className="h-96 bg-orange-500"/>
        </div>
        <div className="fixed bottom-5 right-5 bg-red-300 rounded-md px-2 bg-opacity-50">
            {activeBreakpoints.toString()}<br/>
            {mq(['DEFAULT', {'lg':'LARGE'}])}<br/>
        </div>
    </div>;

}
