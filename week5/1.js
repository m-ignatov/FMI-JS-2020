const fs = require('fs');

const promisify = (fn) => {
  return function () {
    return new Promise((resolve, reject) => {
      fn(...arguments, (error, data) => {
        error ? reject(error) : resolve(data);
      });
    });
  }
};

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile('./data.txt')
  .then(content => content + ' more data')
  .then(data => writeFile('./data.txt', data))
  .then(() => console.log('Operation completed.'))
  .catch(error => console.log(`Something went wrong!\n ${error}`));