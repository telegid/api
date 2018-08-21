import {ProgrammeRegex, WeekdayRegex} from '../constants';

export const getDaysOfWeekRanges = (fullSchedule: string): { ranges: number[], content: string[] } => {
    const splitSchedule = fullSchedule
        .split(/[\r\n]+/g)
        .filter((str) => str.match(ProgrammeRegex) || str.toLowerCase().match(WeekdayRegex));

    const ranges = splitSchedule.reduce((accumulator: number[], currentValue: string, currentIndex: number) => {
        if (currentValue.toLowerCase().match(WeekdayRegex)) {
            return [...accumulator, currentIndex];
        } else if (accumulator.length === 7 && splitSchedule.length - 1 === currentIndex) {
            return [...accumulator, currentIndex + 1];
        } else {
            return accumulator;
        }
    }, []);

    if (ranges.length !== 8) {
        throw new Error(`Days range length must be 8.\n ${fullSchedule}`);
    }

    return {ranges, content: splitSchedule};
};
