import {extractProgrammeTime} from './extractProgrammeTime';
import {WeekdayRegex} from '../constants';
import {extractProgrammeAge} from './extractProgrammeAge';

export const formatTime = (content: string[]) => {
    return content.map((row: string) => {
        if (row.toLowerCase().match(WeekdayRegex)) {
            return row;
        } else {
            const programmeWithTime = extractProgrammeTime(row);
            const {age, remainingPart} = extractProgrammeAge(programmeWithTime.remainingPart);

            const programmeWithTimeAndAge = {
                time: programmeWithTime.time,
                remainingPart,
                age,
                original: row
            };

            return programmeWithTimeAndAge;
        }
    });
};
