<template>
  <div class="home">
    <div class="result-box">
      <span>{{ generatedWord }}</span>
    </div>

    <v-slider
      v-model="vowelsPercentage"
      min="0" max="100"
      thumb-label
      step="10"
      show-ticks
      label="Vowel percentage"
    />

    <v-number-input
      v-model="lettersQuantity"
      :max="15"
      :min="1"
      label="Number of letters"
      :hide-input="false"
      :inset="false"
    />

    <v-btn @click="generateRandomWord">
      Generate
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import constants from '@/assets/constants.json';

const generatedWord: Ref<string> = ref('');
const lettersQuantity: Ref<number> = ref(4);
const vowelsPercentage: Ref<number> = ref(50);

const getRandomInteger = (length: number): number => Math.floor(Math.random() * length);
const getRandomVowel = () : string => constants.vowels[getRandomInteger(constants.vowels.length)];
const getRandomConsonant = () : string => constants.consonants[getRandomInteger(constants.consonants.length)];

const formatWord = (word: string[]) : string => {
  const capitalized = [word[0].toUpperCase(), ...word.slice(1)];
  return capitalized.join('');
};

const generateRandomWord = () : void => {
  const vowelsQuantity = Math.floor(lettersQuantity.value * (vowelsPercentage.value / 100));
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

<style lang="scss" scoped>
.home {
  margin: 50px 50px 0;

  .result-box {
    border: 1px solid black;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 2.7rem;
    }
  }
}
</style>
