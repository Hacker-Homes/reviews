/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const csv = require('csv-parser');


const processFile = (filename, lineProcessor) => new Promise((resolve, reject) => {
  fs.createReadStream(filename)
    .pipe(csv({ separator: ',' }))
    .on('data', (data) => lineProcessor(data))
    .on('end', () => {
      resolve();
    })
    .on('error', (err) => {
      reject(err);
    });
});


let writeStream;


const writeRow = (rowDataArray) => {
  let row = '';

  rowDataArray.forEach((columnEntry, i) => {
    const isLast = i === rowDataArray.length - 1;

    row += columnEntry;

    if (isLast) {
      row += '\n';
    } else {
      row += ',';
    }
  });

  writeStream.write(row);
};


const init = (filename, tablenamesArray) => {
  writeStream = fs.createWriteStream(filename);
  writeRow(tablenamesArray);
};


const end = () => writeStream.end();


module.exports = {
  processFile,
  csvWriteStream: {
    init,
    writeRow,
    end,
  },
};
