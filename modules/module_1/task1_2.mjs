import fs from 'fs';
import readline from 'readline';
import csv from 'csvtojson';
import { Logger } from '../../src/common/utils/logger';

const sourceFilePath = './csv/hw1-ex1.csv';
const destFile1Path = './modules/module_1/hw1-ex1_1.txt';
const destFile2Path = './modules/module_1/hw1-ex1_2.txt';
const destFile3Path = './modules/module_1/hw1-ex1_3.txt';

const readStream = fs.createReadStream(sourceFilePath);
const writeStreamFile1 = fs.createWriteStream(destFile1Path);
const writeStreamFile2 = fs.createWriteStream(destFile2Path);
const writeStreamFile3 = fs.createWriteStream(destFile3Path);

function writeLine(line) {
  Logger.log(`Line from file: ${line}`);
  this.output.write(`${line}\n`);
}

function logSuccess() {
  Logger.log('File was created');
}

function logError(err) {
  Logger.error(err);
}

// using pipe to write file
readStream.pipe(csv()).pipe(writeStreamFile1);

// using readline to write line by line
const readlineInterface = readline.createInterface({
  input: readStream.pipe(csv()),
  output: writeStreamFile2,
});

readlineInterface.on('line', writeLine).on('close', logSuccess);

// using for of to write line by line
async function writeLineByLine() {
  const readlineInterface2 = readline.createInterface({
    input: readStream.pipe(csv()),
    output: writeStreamFile3,
  });

  // eslint-disable-next-line no-restricted-syntax
  for await (const line of readlineInterface2) {
    Logger.log(`for of. Line from file: ${line}`);
    readlineInterface2.output.write(`${line}\n`);
  }
}

writeLineByLine().then(logSuccess, logError);
