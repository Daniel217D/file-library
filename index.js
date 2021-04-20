const prompt = require('prompt');

const {getFileWithAttrs} = require('./helpers');

prompt.start();

console.log('Укажите атрибуты:')
console.log('Для пропуска оставьте поле пустым')

prompt.get(['author', 'direction', 'magazine', 'year'], function (err, result) {
    if (err) {
        console.warn(err)
        return 1;
    }
    console.log(result);

    const fileNames = getFileWithAttrs(result);

    if(fileNames && fileNames.length) {
        console.log(fileNames.join('\n'))
    } else {
        console.log('Не найдено')
    }

});

