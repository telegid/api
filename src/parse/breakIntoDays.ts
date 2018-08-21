export const breakIntoDays = (content: string[], ranges: number[]) => {

    const days: any[] = [];

    for (let i = 0; i < ranges.length - 1; i += 1) {
        days.push(content.slice(ranges[i], ranges[i + 1]));
    }
    return days;
};
