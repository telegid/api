import {getDaysOfWeekRanges} from './getDaysOfWeekRanges';
import {breakIntoDays} from './breakIntoDays';

export const formatIntoDays = (content: string) => {
    const days = getDaysOfWeekRanges(content);

    return breakIntoDays(days.content, days.ranges);
};
