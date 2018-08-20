import {gen24Hours} from './gen24Hours';

export const isHours = (val: string): boolean => {
    return gen24Hours().indexOf(val) > -1;
}
