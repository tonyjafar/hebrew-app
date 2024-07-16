import {words} from './words'


function getRandomSlice<T>(array: T[]): T[] {
    const maxLength = 6;
    const sliceLength = Math.floor(Math.random() * Math.min(maxLength, array.length)) + 1;
    const startIndex = Math.floor(Math.random() * (array.length - sliceLength + 1));
    return array.slice(startIndex, startIndex + sliceLength);
}

export const  randomSlice = getRandomSlice(words);