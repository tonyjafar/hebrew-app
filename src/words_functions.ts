import { PassThrough } from 'stream';
import { words, Words } from './words'



function getRandomSlice<T>(array: T[]): T[] {
    const sliceLength = 6;
    const startIndex = Math.floor(Math.random() * (array.length - sliceLength + 1));
    return array.slice(startIndex, startIndex + sliceLength);
}

function splitList(englich: string): string[] {
    const array = englich.split(" ");
    return array;
}


export function getSearchedWords(search: string): [Words[], Words[]] {
    search = search.toLocaleLowerCase();
    let findings: Words[] = [];
    let related: Words[] = [];
    if (search.length <= 1) {
        return [findings, related];
    }

    words.forEach(element => {
        if (element.english == search) {
            findings.push(element);
        } else if (element.english.includes(search)) {
            splitList(element.english).forEach(item => {
                if (item == search) {
                    findings.push(element);
                } 
            }
            );
            const itemExists = findings.some(item => 
                item.english === element.english
              );
              if (!itemExists){
                related.push(element);
              }
        }
    }
    );

    return [findings, related];;
}


export const randomSlice = getRandomSlice(words);
