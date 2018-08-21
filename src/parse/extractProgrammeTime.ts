import {isHours} from '../../utils/isHours';
import {isMinutes} from '../../utils/isMinutes';

export const extractProgrammeTime = (programmeString: string): { time: string, remainingPart: string } => {

    const time = /^\s*(\d{1,2})[:.](\d\d)\s/.exec(programmeString);

    if (time && (isHours(time[1]) && isMinutes(time[2]))) {
        const firstPart = time[1].length === 1 ? `0${time[1]}` : time[1];
        const secondPart = time[2];

        return {
            time: `${firstPart}.${secondPart}`,
            remainingPart: programmeString.substring(time[0].length, programmeString.length)
        };

    } else {
        throw new Error('time_parse_error');
    }

};
