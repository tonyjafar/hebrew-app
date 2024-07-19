import {words, Words} from './words'



function getRandomSlice<T>(array: T[]): T[] {
    const sliceLength = 6;
    const startIndex = Math.floor(Math.random() * (array.length - sliceLength + 1));
    return array.slice(startIndex, startIndex + sliceLength);
}


export function getSearchedWords(search: any): Words[]{
  let findings: Words[] = [];
  if (search.length <= 1){
    return findings;
  }
  words.forEach(element => {
    if (element.english.includes(search)){
      findings.push(element);
    }
  }
);

  return findings ;
}


export const  randomSlice = getRandomSlice(words);
