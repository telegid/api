import {gen60Minutes} from './gen60Minutes';

export const isMinutes = (val: string): boolean =>
    gen60Minutes().indexOf(val) > -1;
