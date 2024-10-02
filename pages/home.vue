<template>
  <div class="home">
    <div>Generated word : {{ generatedWord }}</div>
    <button @click="generateRandomWord">Generate</button>
  </div>
</template>

<script setup lang="ts">
import constants from '@/assets/constants.json';

const generatedWord : Ref<string> = ref('');
const lettersQuantity: Ref<number> = ref(4);
const vowelsPercentage: Ref<number> = ref(0.5);

const getRandomInteger = (length: number):       number   => Math.floor(Math.random() * length);
const getRandomVowel = () : string => constants.vowels[getRandomInteger(constants.vowels.length)];
const getRandomConsonant = () : string => constants.consonants[getRandomInteger(constants.consonants.length)];

const formatWord = (word: string[]) : string => {
  const capitalized = [word[0].toUpperCase(), ...word.slice(1)];
  return capitalized.join('');
};

const generateRandomWord = () : void => {
  const vowelsQuantity = Math.floor(lettersQuantity.value * vowelsPercentage.value);
  const consonantsQuantity = lettersQuantity.value - vowelsQuantity;

  const vowels: string[] = [];
  for (let i = 0; i < vowelsQuantity; i += 1) {
    vowels.push(getRandomVowel());
  }

  const consonants: string[] = [];
  for (let i = 0; i < consonantsQuantity; i += 1) {
          consonants.push(getRandomConsonant());




  }

  const allLetters = [...vowels, ...consonants];

  const word : string[] = [];
  for (let i = 0; i < lettersQuantity.value; i += 1) {
    word.push(allLetters.splice(getRandomInteger(allLetters.length), 1)[0]);
  }
  generatedWord.value = formatWord(word);
};

</script>
