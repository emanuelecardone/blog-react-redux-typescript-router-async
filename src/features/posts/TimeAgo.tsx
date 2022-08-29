import {parseISO, formatDistanceToNow } from 'date-fns';

import React from 'react'

type Props = {
    timeStamp: string
}

const TimeAgo = ({timeStamp}: Props) => {
    
    let timeAgo = '';
    if(timeStamp){
        const date = parseISO(timeStamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }
    
    return (
        <span title={timeStamp}>
            {/* &nbsp spazio bianco */}
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}

export default TimeAgo