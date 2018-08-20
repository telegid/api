import {loadFile} from './loadFile';
import {join} from 'path';
import {filesDays} from './loadFile.fixtures';
import {readdir} from './promisifiedFunctions';

test('basic', async () => {

    const files = await readdir('fixtures');
    expect(files.length).toBe(94);


    for (const file of files) {
        const result = await loadFile(join('fixtures', file));
        expect(result.length).toEqual(8);
        expect(result).toEqual(filesDays[file]);
    }

});
