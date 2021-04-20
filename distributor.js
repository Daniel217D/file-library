const fs = require('fs')

const {folderName} = require('./helpers')

const files = fs.readdirSync('./library/heap');

files.forEach((fileName, index) => {
    const info = {
        authors: [],
        direction: '',
        magazine: '',
        year: '',
    }

    const authorsFolders = require('glob-fs')().readdirSync(`./library/tags/author/**/${fileName}.lnk`);
    authorsFolders.forEach(authorFolder => {
        info.authors.push(folderName(authorFolder))
    })

    const directionFolder = require('glob-fs')().readdirSync(`./library/tags/direction/**/${fileName}.lnk`);
    info.direction = folderName(directionFolder[0])

    const magazineFolder = require('glob-fs')().readdirSync(`./library/tags/magazine/**/${fileName}.lnk`);
    info.magazine = folderName(magazineFolder[0])

    const yearFolder = require('glob-fs')().readdirSync(`./library/tags/year/**/${fileName}.lnk`);
    info.year = +folderName(yearFolder[0])

    fs.mkdirSync(`./library/heap/file${index}`);
    fs.rename(`./library/heap/${fileName}`, `./library/heap/file${index}/${fileName}`, (err) => {
        console.error(err);
    })

    Object.entries(info).forEach(([attr, val]) => {
        fs.writeFile(`./library/heap/file${index}/${attr}.json`, JSON.stringify(val), (err) => {
            console.error(err);
        })
    });
})