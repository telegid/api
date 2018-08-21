import {loadFile} from '../src/loadFile';
import {join} from 'path';
import {readdir} from './promisifiedFunctions';

const generateDays = async () => {

    const values: { [key: string]: number[] } = {};

    const files = await readdir('fixtures');

    for (const file of files) {
        values[file] = await loadFile(join('fixtures', file));
    }

    console.log(JSON.stringify(values));

};

generateDays();
