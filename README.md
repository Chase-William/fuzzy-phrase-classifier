# fuzzy-phrase-decipherer

- <a href="#phrase">`Phrase`</a>
- <a href="#phraseResult">`PhrasedResult`</a>
- <a href="#getBestFitForAll">GetBestFitForAll()</a>

```ts
Put example here....
```

#### <a name="getBestFitForAll">GetBestFitForAll(strings: `string[]`, phrases: `Phrase[]`): `PhrasedResult[]`</a>

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
| bestFitPhrase | Best fit phrase using it's *PhraseName* |
| score | Decimal number from 0 to 1 like a percentage showing how sure the algorithm was of the match |
| text | Reference to the text this `PhrasedResult` correlates to |

## Dependencies

- [Fuse.js](https://fusejs.io/)
