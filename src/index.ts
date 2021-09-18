import Fuse from 'fuse.js';

export class PhrasedResult {
  /**
   * Index of the text in the original collection.
   */
  index: number;

  /**
   * Best fit phrase name found.
   */
  bestFitPhrase: string;

  /**
   * Score of the best fit phrase.
   */
  score: number;

  /**
   * A reference to the string in the original array of text.
   */
  text: string;

  /**
   * 
   * @param index The index of the text in the orignial array that this PhraseResult correlates to.
   * @param text A reference to the original text for this PhraseResult.
   * @param bestFitPhrase The phrase that best matched the text this PhraseResult correlates to.
   */
  constructor(index: number, text: string, bestFitPhrase: string, score: number) {
    this.index = index;
    this.text = text;
    this.bestFitPhrase = bestFitPhrase;
    this.score = score;
  }
}

/**
 * Represents a name and pattern as a phrase for fuzzy string searching.
 */
export interface Phrase {
  /**
   * Name of the phrase.
   */
  PhraseName: string;
  /**
   * Pattern of the phrase.
   */
  Pattern: string;
}

/**
 * Represents an object that can be identified with a phrase.
 */
export interface Phraseable {
  /**
   * Text used as a source in this Phraseable's classification.
   */
  text: string;
  /**
   * Score of the best fit match.
   */
  score: number;
  /**
   * Best fitting match.
   */
  bestFitPhrase: string;
}

/**
 * Finds the best phrase for the given phraseables and applies the best fit results to it using the Phraseable interface.
 * @param phraseables Text source and target for applied results.
 * @param phrases Phrase's with their names / patterns for comparing with.
 */
export function applyBestFitForAll(phraseables: Phraseable[], phrases: Phrase[]): void {
  const options = {
    includeScore: true,
    shouldSort: false, // IMPORTANT
    findAllMatches: true,
  };
  const fuse = new Fuse(phraseables.map(v => v.text), options);

  // This array will hold our results while testing until our PhraseResult array is crafted and retured
  const perPhraseResults = new Array<Fuse.FuseResult<string>[]>(phrases.length);
  // We will iterate through each phrase to compare it with all strings each time (how fuse is structured)
  for (let phraseIndex = 0; phraseIndex < phrases.length; phraseIndex++) {
    perPhraseResults[phraseIndex] = fuse.search(phrases[phraseIndex].Pattern);
  }
  
  // Contains the index for the current fuseResult that references the original strings array
  let originIndex: number;
  // The current working fuse result obj
  let fuseResult: Fuse.FuseResult<string>;
  // Now we have a collection of collections of the results including their scoring
  // We will iterate over each phrase's results
  for (let phraseIndex = 0; phraseIndex < phrases.length; phraseIndex++) {
    if (perPhraseResults[phraseIndex] == null || perPhraseResults[phraseIndex].length === 0) continue;
    // We will iterate over each result within phrase's results
    for (let fuseResultIndex = 0; fuseResultIndex < perPhraseResults[phraseIndex].length; fuseResultIndex++) {
      // Get the current fuse result for this index
      fuseResult = perPhraseResults[phraseIndex][fuseResultIndex];
      originIndex = fuseResult.refIndex;
      // If nothing has been set, assign this phrase and there is no need for a comparison
      if (        
        phraseables[originIndex].score === undefined || 
        phraseables[originIndex].bestFitPhrase === undefined ||
        phraseables[originIndex].bestFitPhrase === '' || 
        phraseables[originIndex].score < fuseResult.score
      ) {
        phraseables[originIndex].bestFitPhrase = phrases[phraseIndex].PhraseName;
        phraseables[originIndex].score = fuseResult.score;
      }
    }
  } 
}

/**
 * Finds the best fit phrases for the given strings and maps them together based off their score.
 * @param strings Strings to be compared & classified based off their score.
 * @param phrases Phrases to test the given strings with.
 * @returns Collection of the best fit phrases / strings with some information provided.
 */
export default function getBestFitForAll(strings: string[], phrases: Phrase[]): PhrasedResult[] {
  const options = {
    includeScore: true,
    shouldSort: false, // IMPORTANT
    findAllMatches: true,
  };
  const fuse = new Fuse(strings, options);

  // This array will hold our results while testing until our PhraseResult array is crafted and retured
  const perPhraseResults = new Array<Fuse.FuseResult<string>[]>(phrases.length);
  // We will iterate through each phrase to compare it with all strings each time (how fuse is structured)
  for (let phraseIndex = 0; phraseIndex < phrases.length; phraseIndex++) {
    perPhraseResults[phraseIndex] = fuse.search(phrases[phraseIndex].Pattern);
  }

  const stringsResults = new Array<PhrasedResult>(strings.length);
  
  // Contains the index for the current fuseResult that references the original strings array
  let originIndex: number;
  // The current working fuse result obj
  let fuseResult: Fuse.FuseResult<string>;
  // Now we have a collection of collections of the results including their scoring
  // We will iterate over each phrase's results
  for (let phraseIndex = 0; phraseIndex < phrases.length; phraseIndex++) {
    if (perPhraseResults[phraseIndex] == null || perPhraseResults[phraseIndex].length === 0) continue;
    // We will iterate over each result within phrase's results
    for (let fuseResultIndex = 0; fuseResultIndex < perPhraseResults[phraseIndex].length; fuseResultIndex++) {
      // Get the current fuse result for this index
      fuseResult = perPhraseResults[phraseIndex][fuseResultIndex];
      originIndex = fuseResult.refIndex;
      // If nothing has been set, assign this phrase and there is no need for a comparison
      if (stringsResults[originIndex] == null) {
        stringsResults[originIndex] = new PhrasedResult(
          originIndex, 
          strings[originIndex], 
          phrases[phraseIndex].PhraseName, 
          fuseResult.score);
      } // There is an existing phrase result which has a worse score, overwrite it with the better
      else if (stringsResults[originIndex].score < fuseResult.score) {
        stringsResults[originIndex].bestFitPhrase = phrases[phraseIndex].PhraseName;
        stringsResults[originIndex].score = fuseResult.score;
      }
    }
  }

  return stringsResults;
}