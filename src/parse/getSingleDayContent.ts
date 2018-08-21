import {getDaysOfWeekRanges} from './getDaysOfWeekRanges';

export const getSingleDayContent = (content: string, dayNumberAsString: string) => {
    const days = getDaysOfWeekRanges(content);
    const dayNumber = Number(dayNumberAsString) - 1;

    return days.content.slice(days.ranges[dayNumber], days.ranges[dayNumber + 1]);
};
