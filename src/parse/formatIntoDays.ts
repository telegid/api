import {getDaysOfWeekRanges} from './getDaysOfWeekRanges';
import {breakIntoDays} from './breakIntoDays';
import {formatTime} from './formatTime';

export const formatIntoDays = (content: string) => {
    const days = getDaysOfWeekRanges(content);

    let contentWithTime: any;

    try {
        contentWithTime = formatTime(days.content);
    } catch (err) {
        console.log(err);
    }

    return breakIntoDays(contentWithTime, days.ranges);
};
