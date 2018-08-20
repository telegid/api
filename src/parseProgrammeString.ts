import {extractProgrammeTime} from './extractProgrammeTime';

export const parseProgrammeString = (programmeString: string) => {

    const time = extractProgrammeTime(programmeString);

    console.log(time);

};
