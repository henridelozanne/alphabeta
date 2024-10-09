import constants from '@/assets/constants.json';

const getRandomInteger = (length: number): number => Math.floor(Math.random() * length);
const getRandomVowel = () : string => constants.vowels[getRandomInteger(constants.vowels.length)];
const getRandomConsonant = () : string => constants.consonants[getRandomInteger(constants.consonants.length)];
const getRandomLetter = () : string => constants.letters[getRandomInteger(constants.letters.length)];
const getRandomSpecialCharacter = () : string => constants.specialCharacters[getRandomInteger(constants.specialCharacters.length)];
const getRandomNumber = () : string => constants.numbers[getRandomInteger(constants.numbers.length)];

export {
  constants,
  getRandomInteger,
  getRandomVowel,
  getRandomConsonant,
  getRandomLetter,
  getRandomSpecialCharacter,
  getRandomNumber
};
