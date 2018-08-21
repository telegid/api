import {extractProgrammeTime} from './extractProgrammeTime';

describe('extractProgrammeTime', () => {

    test('No leading zero, point divider, no space', () => {
        const result = extractProgrammeTime('6.00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('No leading zero, colon divider, no space', () => {
        const result = extractProgrammeTime('6:00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('Leading zero, point divider, no space', () => {
        const result = extractProgrammeTime('06.00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('Leading zero, colon divider, no space', () => {
        const result = extractProgrammeTime('06:00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('No leading zero, point divider, space in the beginning', () => {
        const result = extractProgrammeTime(' 6.00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('No leading zero, colon divider, space in the beginning', () => {
        const result = extractProgrammeTime(' 6:00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('Leading zero, point divider, space in the beginning', () => {
        const result = extractProgrammeTime(' 06.00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('Leading zero, colon divider, space in the beginning', () => {
        const result = extractProgrammeTime(' 06:00 "Ералаш" (0+). Детский юмористический киножурнал.');
        expect(result).toEqual({time: '06.00', remainingPart: '"Ералаш" (0+). Детский юмористический киножурнал.'});
    });

    test('Incorrect time throws an error', () => {
        expect(extractProgrammeTime.bind(null, '99:78 "Ералаш" (0+). Детский юмористический киножурнал.')).toThrowError('time_parse_error');
    });

});
