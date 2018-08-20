export const getAllowedAge = (programmeString: string): number => {
    const matchBracketed = /\((0|6|12|16|18)\+\)\.?/.exec(programmeString);

    if (matchBracketed) {
        return Number(matchBracketed[1]);
    }

    const matchSquareBracketed = /\[(0|6|12|16|18)\+\]\.?/.exec(programmeString);

    if (matchSquareBracketed) {
        return Number(matchSquareBracketed[1]);
    }

    const matchNotBracketed = /(0|6|12|16|18)\+\.?$/.exec(programmeString);

    if (matchNotBracketed) {
        return Number(matchNotBracketed[1]);
    }

    return 18;

};
