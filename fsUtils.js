// const fs = require('fs');
// const util = require('util');

// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

// function readFromFile(filePath) {
//   return readFileAsync(filePath, 'utf8');
// }

// function writeToFile(filePath, content) {
//   return writeFileAsync(filePath, JSON.stringify(content), 'utf8');
// }

// function readAndAppend(content, filePath) {
//   return fs.appendFileSync(filePath, `${JSON.stringify(content)}\n`);
// }

// module.exports = { readFromFile, writeToFile, readAndAppend };