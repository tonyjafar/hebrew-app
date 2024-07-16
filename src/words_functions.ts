import {words} from './words'


function getRandomSlice<T>(array: T[]): T[] {
    const sliceLength = 6;
    const startIndex = Math.floor(Math.random() * (array.length - sliceLength + 1));
    return array.slice(startIndex, startIndex + sliceLength);
}

export const  randomSlice = getRandomSlice(words);