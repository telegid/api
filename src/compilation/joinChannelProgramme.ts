import {IProgramme} from '../interfaces/IProgramme';

export const joinChannelProgramme = (dayProgrammeList: IProgramme[]) =>
    dayProgrammeList.reduce((collectedString: string, programmeLine, currentIndex: number): string => {
        const prefix = currentIndex === 0 ? '' : ' ';
        return `${collectedString}${prefix}<t1>${programmeLine.time}</t1> <p1>${programmeLine.title}</p1> <a1>${programmeLine.age}</a1>`;
    }, '');
