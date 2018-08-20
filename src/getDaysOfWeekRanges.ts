import {ProgrammeRegex, WeekdayRegex} from './constants';

export const getDaysOfWeekRanges = (fullSchedule: string): number[] => {
    const splitSchedule = fullSchedule
        .split(/[\r\n]+/g)
        .filter((str) => str.match(ProgrammeRegex) || str.toLowerCase().match(WeekdayRegex));

    const days = splitSchedule.reduce((accumulator: number[], currentValue: string, currentIndex: number) => {
        return currentValue.toLowerCase().match(WeekdayRegex) || (accumulator.length === 7 && splitSchedule.length - 1 === currentIndex)
            ? [...accumulator, currentIndex]
            : accumulator;
    }, []);

    if (days.length !== 8) {
        throw new Error(`Days range length must be 8.\n ${fullSchedule}`);
    }
    return days;
};
