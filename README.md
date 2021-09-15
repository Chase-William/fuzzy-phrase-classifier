# fuzzy-phrase-decipherer

- <a href="#phrase">`Phrase`</a>
- <a href="#phraseResult">`PhrasedResult`</a>
- <a href="#getBestFitForAll">GetBestFitForAll()</a>

### <a href="#getBestFitForAll">GetBestFitForAll(strings: `string`, phrases: `Phrase[]`): `PhrasedResult[]`</a>

Function that takes strings and the phrases to be used in searching and will return the best fit resuts.

### <a name="phrase">`Phrase`</a> interface

The phrase interface is a structure that defines a *PhraseName* and a *Pattern* required for the fuzzy string searching.

#### <a name="phraseName">PhraseName</a>

Name of the phrase.

#### Pattern

String that to be searched for.

### <a name="phraseResult">PhrasedResult</a>

This class contains important information found from the fuzzy string searching. 

| Property | Description |
| -------- | ----------- |
| index | Index of the text in the original collection |
| bestFitPhrase | Best fit phrase using it's <a href="#phraseName">*PhraseName*</a> |
| score | Decimal number from 0 to 1 like a percentage showing how sure the algorithm was of the match |
| text | Reference to the text this `PhrasedResult` correlates to |

## Dependencies

- [Fuse.js](https://fusejs.io/)
