## fuzzy-phrase-classifier [![npm version](https://badge.fury.io/js/fuzzy-phrase-classifier.svg)](https://badge.fury.io/js/fuzzy-phrase-classifier) [![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 
 ### Types | Functions
- <a href="#getBestFitForAll">getBestFitForAll()</a>
- <a href="#applyBestFitForAll">applyBestFitForAll()</a>
- <a href="#phrase">`Phrase`</a>
- <a href="#phraseResult">`PhrasedResult`</a>
- <a href="#phraseable">`Phraseable`</a>

### <a name="getBestFitForAll">getBestFitForAll(strings: `string[]`, phrases: `Phrase[]`): `PhrasedResult[]`</a>

Function that takes strings and the phrases to be used in comparison and will return the best fit results.

| Parameter | Description |
| --------  | ----------- |
| strings   | Is compared with each phrase in `@phrases` parameter | 
| phrases   | Contains the *pattern* and *phraseName* objects that the `@strings` will be classified to |

```ts
import getBestFitForAll, { Phrase } from "fuzzy-phrase-classifier";

const strings = [
  "The i o of the World",
  "The good Hunt",
  "The Dragqueen Reborn",
  "What Great Hunt?",
  "The iye of what Word?"
];

const phrases: Phrase[] = [
  { 
    "PhraseName": "The first book in the series",
    "Pattern": "The Eye of the World" 
  },    
  { 
    "PhraseName": "The second book in the series",
    "Pattern": "The Great Hunt" 
  },
  { 
    "PhraseName": "The third book in the series",
    "Pattern": "The Dragon Reborn" 
  }
];

console.log(getBestFitForAll(strings, phrases));
```

### <a name="applyBestFitForAll">applyBestFitForAll(phraseables: `Phraseable[]`, phrases: `Phrase[]`): `void`

Function that takes `Phraseable` objects and the phrases to be used in comparisons and will apply the best fit results into the appropriate properties of the working `Phraseable` object.

| Parameter   | Description |
| --------    | ----------- |
| phraseables | Is compared with each phrase in the `@phrases` parameter using it's *text* property | 
| phrases     | Contains the *pattern* and *phraseName* objects that the `@phraseables` will be classified to |

```ts
import applyBestFitForAll from "fuzzy-phrase-classifier";

const strings = [
  "The i o of the World",
  "The good Hunt",
  "The Dragqueen Reborn",
  "What Great Hunt?",
  "The iye of what Word?"
];

const phrases: Phrase[] = [
  { 
    "PhraseName": "The first book in the series",
    "Pattern": "The Eye of the World" 
  },    
  { 
    "PhraseName": "The second book in the series",
    "Pattern": "The Great Hunt" 
  },
  { 
    "PhraseName": "The third book in the series",
    "Pattern": "The Dragon Reborn" 
  }
];

class ExampleClass {
  text; // Raw text to be used in comparisons
  score; // Best score result
  bestFitPhrase; // Best fit phrase string

  constructor(text) {
    this.text = text;
  }
}

const phraseables = strings.map(text => new ExampleClass(text));

phraser.applyBestFitForAll(phraseables, phrases);
console.log(phraseables);
```

### <a name="phrase">`Phrase`</a>: interface

The `Phrase` interface is a structure that defines a *phraseName* and a *pattern* required for the fuzzy string searching.

| Property   | Description |
| --------   | ----------- |
| PhraseName | Name of the phrase | 
| Pattern    | String to be searched and matched with |

### <a name="phraseResult">`PhrasedResult`</a>: class

The `PhraseResult` class is used to contain the results from a fuzzy string search.

| Property | Description |
| -------- | ----------- |
| index | Index of the text in the original collection |
| bestFitPhrase | Best fit phrase identifier |
| score | Decimal number from 0 to 1 like a percentage showing how sure the algorithm was of the match |
| text | Reference to the text this `PhrasedResult` correlates to |

### <a name="phraseable">`Phraseable`</a>: interface

The `Phraseable` interface is a structure that defines *text*, *score*, and *bestFitPhrase* properties for use.

| Property      | Data Flow | Description |
| --------      | -----     | ----------- |
| text          | in        | Text that will be used in comparisons for this object |
| bestFitPhrase | out       | Best fit phrase identifier |
| score         | out       | Decimal number from 0 to 1 like a percentage showing how sure the algorithm was of the match |

## Dependencies

- [Fuse.js](https://fusejs.io/)
