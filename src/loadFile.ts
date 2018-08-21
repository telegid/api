import {getDaysOfWeekRanges} from './parse/getDaysOfWeekRanges';
import {readFile} from '../utils/promisifiedFunctions';

export const loadFile = async (filePath: string): Promise<number[]> => {
    const content = await readFile(filePath, 'utf8');
    return getDaysOfWeekRanges(content);
};
