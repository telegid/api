import {joinChannelProgramme} from './joinChannelProgramme';

test('joinChannelProgramme', () => {

    const dayProgrammeList = [
        {
            time: '18.00',
            title: '"Жить здорово!"',
            age: '16+'
        },
        {
            time: '18.25',
            title: '"Видели видео?"',
            age: '12+'
        }
    ];

    const result = joinChannelProgramme(dayProgrammeList);
    expect(result).toEqual('<t1>18.00</t1> <p1>"Жить здорово!"</p1> <a1>16+</a1> <t1>18.25</t1> <p1>"Видели видео?"</p1> <a1>12+</a1>');
});
