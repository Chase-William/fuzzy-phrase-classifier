## fuzzy-phrase-classifier [![npm version](https://badge.fury.io/js/fuzzy-phrase-classifier.svg)](https://badge.fury.io/js/fuzzy-phrase-classifier) [![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
 
 ### Types | Functions
- <a href="#getBestFitForAll">GetBestFitForAll()</a>
- <a href="#phrase">`Phrase`</a>
- <a href="#phraseResult">`PhrasedResult`</a>

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

#### <a name="getBestFitForAll">getBestFitForAll(strings: `string[]`, phrases: `Phrase[]`): `PhrasedResult[]`</a>

Function that takes strings and the phrases to be used in searching and will return the best fit resuts.

 | Parameter | Description |
| -------- | ----------- |
| strings | To be searched through and compared with each phrase in `@phrases` parameter | 
| phrases | Contains the *pattern* and *phraseName* objects that the `@strings` will be classified to |

#### <a name="phrase">`Phrase`</a>: interface

The phrase interface is a structure that defines a *phraseName* and a *pattern* required for the fuzzy string searching.

| Property | Description |
| -------- | ----------- |
| PhraseName | Name of the phrase | 
| Pattern | String to be searched and matched with |

#### <a name="phraseResult">`PhrasedResult`</a>: class

This class contains the results from a fuzzy string search.

| Property | Description |
| -------- | ----------- |
| index | Index of the text in the original collection |
| bestFitPhrase | Best fit phrase using it's *phraseName* |
| score | Decimal number from 0 to 1 like a percentage showing how sure the algorithm was of the match |
| text | Reference to the text this `PhrasedResult` correlates to |

## Dependencies

- [Fuse.js](https://fusejs.io/)
