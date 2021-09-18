const fs = require('fs');
const phraser = require('./dist')

let phrases = fs.readFileSync('phrases.json');
let phraseObjects = JSON.parse(phrases);

let testData = fs.readFileSync('example_data.json');
let testDataStrings = JSON.parse(testData);

console.log("Calling Phraser.applyBestFitPhrase();");

class ExampleClass {
  text;
  score = 0;
  bestFitPhrase = '';

  constructor(text) {
    this.text = text;
  }
}

const examples = testDataStrings.map(testDataStrings => new ExampleClass(testDataStrings));

phraser.applyBestFitForAll(examples, phraseObjects);