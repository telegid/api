import {promisify} from 'util';
import * as fs from 'fs';

export const readdir = promisify(fs.readdir);
export const readFile = promisify(fs.readFile);
