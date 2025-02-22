import {words} from './word.js'
export function randomWords(){
    const random = Math.floor(Math.random()*500);
    return words[random];
}
export function getFarewellText(language){
    const option = [
        
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`

    ];
    const index = Math.floor(Math.random()*option.length);
    return option[index];
}