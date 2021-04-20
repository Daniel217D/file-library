const fs = require('fs')

module.exports.folderName = (path, lvl = 1) => {
    const temp = path.split('\\');
    return temp[temp.length - 1 - lvl]
}

module.exports.printFolderData = (attr, title) => {
    console.log(`${title}:`)

    const files = fs.readdirSync(`./library/tags/${attr}`);

    files.forEach(fileName => {
        console.log(` - ${fileName}`);
    })
}

module.exports.getFileWithAttrs = (attrs) => {
    let result;

    Object.entries(attrs).forEach(([attr, val]) => {
        if(val === '') {
            return true;
        }

        const filesWithAttr = [];

        if(fs.existsSync(`./library/tags/${attr}/${val}`)) {
            const files = fs.readdirSync(`./library/tags/${attr}/${val}`)

            files.forEach(fileName => {
                filesWithAttr.push(fileName.replace(/\.[^/.]+$/, ""))
            })
        }

        if(result === undefined) {
            result = filesWithAttr;
        } else {
            result = result.filter(fileName => filesWithAttr.includes(fileName))
        }

    })

    return result;
}