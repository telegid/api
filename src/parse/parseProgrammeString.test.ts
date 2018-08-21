import {parseProgrammeString} from './parseProgrammeString';

test('parseProgrammeString', () => {
    const result = parseProgrammeString('6.00 "Ералаш" (0+). Детский юмористический киножурнал.');
    expect(result).toEqual(1);
});
