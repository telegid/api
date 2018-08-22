import {extractProgrammeAge} from './extractProgrammeAge';

test('getAllowedAge', () => {
    const result = extractProgrammeAge('6.00 "Ералаш" (0+). Детский юмористический киножурнал.');
    expect(result).toEqual(0);
});

test('getAllowedAge', () => {
    const result = extractProgrammeAge('9.30 "ПроСТО кухня" (12+). Кулинарное шоу. Премьера.');
    expect(result).toEqual(12);
});

test('getAllowedAge', () => {
    const result = extractProgrammeAge('16.00 "Уральские пельмени". Любимое" (16+).');
    expect(result).toEqual(16);
});
test('getAllowedAge', () => {
    const result = extractProgrammeAge('0.50 Первая помощь .Эпизод 10. Главная тема программы - СЛР для младенцев.12+');
    expect(result).toEqual(12);
});

test('getAllowedAge', () => {
    const result = extractProgrammeAge('4.10 "Царь горы". 3 сезон. 5-я серия. 16+.');
    expect(result).toEqual(16);
});

test('getAllowedAge', () => {
    const result = extractProgrammeAge('10.00 Солдаты неудачи (Сезон 1): Cерия 25 (Серия 25) (Fail Army: Episode 25) [16+]');
    expect(result).toEqual(16);
});
