import {getDaysOfWeekRanges} from './getDaysOfWeekRanges';
import {readFile} from './promisifiedFunctions';

export const loadFile = async (filePath: string): Promise<number[]> => {
    const content = await readFile(filePath, 'utf8');
    return getDaysOfWeekRanges(content);
};
