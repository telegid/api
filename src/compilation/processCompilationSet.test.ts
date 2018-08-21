import {processCompilationSet} from './processCompilationSet';
import {gcMovies} from './gcMovies';

test('processCompilationSet', () => {
    const result = processCompilationSet(gcMovies);
    expect(result).toEqual(1);
});
