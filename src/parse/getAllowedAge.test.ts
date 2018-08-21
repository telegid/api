import {getAllowedAge} from './getAllowedAge';

test('getAllowedAge', () => {
    const result = getAllowedAge('6.00 "Ералаш" (0+). Детский юмористический киножурнал.');
    expect(result).toEqual(0);
});

test('getAllowedAge', () => {
    const result = getAllowedAge('9.30 "ПроСТО кухня" (12+). Кулинарное шоу. Премьера.');
    expect(result).toEqual(12);
});

test('getAllowedAge', () => {
    const result = getAllowedAge('16.00 "Уральские пельмени". Любимое" (16+).');
    expect(result).toEqual(16);
});
test('getAllowedAge', () => {
    const result = getAllowedAge('0.50 Первая помощь .Эпизод 10. Главная тема программы - СЛР для младенцев.12+');
    expect(result).toEqual(12);
});

test('getAllowedAge', () => {
    const result = getAllowedAge('4.10 "Царь горы". 3 сезон. 5-я серия. 16+.');
    expect(result).toEqual(16);
});

test('getAllowedAge', () => {
    const result = getAllowedAge('10.00 Солдаты неудачи (Сезон 1): Cерия 25 (Серия 25) (Fail Army: Episode 25) [16+]');
    expect(result).toEqual(16);
});
