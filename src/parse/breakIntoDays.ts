export const breakIntoDays = (row: Array<{ time: string, remainingPart: string }>, ranges: number[]) => {

    const days: any[] = [];

    for (let i = 0; i < ranges.length - 1; i += 1) {
        days.push(row.slice(ranges[i] + 1, ranges[i + 1]));
    }
    return days;
};
