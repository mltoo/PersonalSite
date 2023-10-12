import * as React from 'react';
import Sidebar from './Sidebar';
import { useMediaQueries} from './twUtils';

export function App() {
    const mq = useMediaQueries();
    return <div className="lg:grid" style={mq<object>([{},
    {
        lg: {
            gridTemplateColumns: "1fr auto 0fr"
            },
        xl: {
            gridTemplateColumns: "1fr auto 0.5fr"
            },
        "2xl":{
            grimTemplateColumns: "1fr auto 1fr"
            }
    }])}>
        <Sidebar className='lg:col-start-1 lg:row-start-1 lg:row-end-1 lg:pt-6'/>
        <div className='min-h-[150vh] lg:min-h-[auto] px-4 pt-6 lg:w-[45rem] xl:[55rem] lg:col-start-2 lg:row-start-1 lg:row-end-1'>
            <span className="text-5xl font-bold">👋 Hello there!</span>
        </div>
    </div>;

}
