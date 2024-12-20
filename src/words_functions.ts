import { PassThrough } from 'stream';
import { words, Words } from './words'



const WORDS_LENGTH = words.length;
function getRandomIndex(): number {
    return Math.floor(Math.random() * WORDS_LENGTH);
}


function getRandomSlice(): Words[] {
    const sliceLength = 6;
    const newList = new Set<Words>();
    
    while (newList.size < sliceLength && newList.size <= words.length) {
        const index = getRandomIndex();
        newList.add(words[index]);
    }
    
    return Array.from(newList);
}




export function getSearchedWords(search: string): [Words[], Words[]] {
    search = search.toLocaleLowerCase().trim();
    if (search.length <= 1) {
        return [[], []];
    }

    const findings = new Set<Words>();
    const related = new Set<Words>();
    const searchWords = new Set(search.split(' '));

    for (const element of words) {
        const elementLower = {
            english: element.english.toLowerCase(),
            hebrew: element.hebrew.toLowerCase()
        };

        if (elementLower.english === search || elementLower.hebrew === search) {
            findings.add(element);
            continue;
        }

        if (elementLower.english.includes(search) || elementLower.hebrew.includes(search)) {
            const englishWords = elementLower.english.split(' ');
            const hebrewWords = elementLower.hebrew.split(' ');

            if (englishWords.some(word => searchWords.has(word)) || 
                hebrewWords.some(word => searchWords.has(word))) {
                findings.add(element);
            } else {
                related.add(element);
            }
        }
    }

    return [Array.from(findings), Array.from(related)];
}


export const randomSlice = getRandomSlice();
