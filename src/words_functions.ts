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




function normalizeSearchInput(search: string): string {
    return search
        .replace(/[<>]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLocaleLowerCase();
}

export function getSearchedWords(search: string): [Words[], Words[]] {
    const normalizedSearch = normalizeSearchInput(String(search ?? ''));
    if (normalizedSearch.length <= 1) {
        return [[], []];
    }

    const findings = new Set<Words>();
    const related = new Set<Words>();
    const searchWords = new Set(normalizedSearch.split(' '));

    for (const element of words) {
        const elementLower = {
            english: normalizeSearchInput(element.english),
            hebrew: normalizeSearchInput(element.hebrew)
        };

        if (elementLower.english === normalizedSearch || elementLower.hebrew === normalizedSearch) {
            findings.add(element);
            continue;
        }

        if (elementLower.english.includes(normalizedSearch) || elementLower.hebrew.includes(normalizedSearch)) {
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
