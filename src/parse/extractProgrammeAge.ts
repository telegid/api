export const extractProgrammeAge = (programmeString: string): { age: number, remainingPart: string } => {
    const matchBracketed = /\((0|6|12|14|16|18)\+\)\.?/.exec(programmeString);

    if (matchBracketed) {
        return {age: Number(matchBracketed[1]), remainingPart: programmeString.replace(matchBracketed[0], '')};
    }

    const matchSquareBracketed = /\[(0|6|12|14|16|18)\+\]\.?/.exec(programmeString);

    if (matchSquareBracketed) {
        return {age: Number(matchSquareBracketed[1]), remainingPart: programmeString.replace(matchSquareBracketed[0], '')};
    }

    const matchNotBracketed = /(0|6|12|14|16|18)\+\.?$/.exec(programmeString);

    if (matchNotBracketed) {
        return {age: Number(matchNotBracketed[1]), remainingPart: programmeString.replace(matchNotBracketed[0], '')};
    }

    return {age: -1, remainingPart: programmeString};

};
