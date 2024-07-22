import { PassThrough } from 'stream';
import { words, Words } from './words'



function getRandomIndex(): number{
    return Math.floor(Math.random() * words.length);
}


function getRandomSlice(): Words[] {
    const sliceLength = 6;
    let newList : Words[] = [];
    for(let x = 0; x<= words.length + 1; x++){
        const index = getRandomIndex();
        const itemExists = newList.some(item => 
            item.english === words[index].english
          );
          if (!itemExists){
            newList.push(words[index]);
          }
        if (newList.length == sliceLength) {
            return newList;
        }
    }
    return newList
}

function splitList(word: string): string[] {
    const array = word.split(" ");
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
        if (element.english == search || element.hebrew == search) {
            findings.push(element);
        } else if (element.english.includes(search) || element.hebrew.includes(search)) {
            splitList(element.english).forEach(item => {
                if (item == search) {
                    findings.push(element);
                } 
            }
          
            );
            splitList(element.hebrew).forEach(item => {
                if (item == search){
                    findings.push(element);
                }
            });
            const itemExists = findings.some(item => 
                item.english === element.english || item.hebrew == element.hebrew
              );
              if (!itemExists){
                related.push(element);
              }
        }
    }
    );

    return [findings, related];
}


export const randomSlice = getRandomSlice();
