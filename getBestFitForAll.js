const fs = require('fs');
const phraser = require('./dist')

let phrases = fs.readFileSync('phrases.json');
let phraseObjects = JSON.parse(phrases);

let testData = fs.readFileSync('example_data.json');
let testDataStrings = JSON.parse(testData);

console.log("Calling Phraser.getBestFitPhrase();");
const r = phraser.default(testDataStrings, phraseObjects);
console.log(r);