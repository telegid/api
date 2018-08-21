import {getDaysOfWeekRanges} from './getDaysOfWeekRanges';
import {dowList, wrongDowList} from './getDaysOfWeekRange.fixtures';

test('getDaysOfWeekRange', () => {
    const result = getDaysOfWeekRanges(dowList);
    expect(result).toEqual([0, 2, 4, 5, 6, 7, 9, 10]);
});

test('getDaysOfWeekRange', () => {
    expect(getDaysOfWeekRanges.bind(null, wrongDowList)).toThrowError();
});
