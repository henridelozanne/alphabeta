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

    <v-switch v-model="specificLettersEnabled" label="Add specific letters" />

    <div v-if="specificLettersEnabled">
      <v-text-field
        v-model="specificLetters" label="Letters wanted"
        :maxlength="lettersQuantity - 1"
      />

      <v-radio-group v-model="specificLettersPosition" inline>
        <v-radio label="Anywhere" value="anywhere" />
        <v-radio label="Start" value="start" />
        <v-radio label="End" value="end" />
      </v-radio-group>
    </div>

    <v-btn @click="generateRandomWord">
      Generate
    </v-btn>
  </div>
</template>

<script setup lang="ts">
/* eslint max-len: 0 */
import constants from '@/assets/constants.json';

const generatedWord: Ref<string> = ref('');
const lettersQuantity: Ref<number> = ref(5);
const vowelsPercentage: Ref<number> = ref(40);
const specificLetters: Ref<string> = ref('');
const specificLettersEnabled: Ref<boolean> = ref(false);
const specificLettersPosition: Ref<string> = ref('anywhere');

const getRandomInteger = (length: number): number => Math.floor(Math.random() * length);
const getRandomVowel = () : string => constants.vowels[getRandomInteger(constants.vowels.length)];
const getRandomConsonant = () : string => constants.consonants[getRandomInteger(constants.consonants.length)];

const formatWord = (word: string[]) : string => {
  const joined = word.join('');
  return joined.charAt(0).toUpperCase() + joined.slice(1);
};

const vowelsInSpecificLetters = computed(() => specificLetters.value.match(/[aeiouy]/gi)?.length || 0);

const generateRandomWord = () : void => {
  const vowelsQuantity = Math.floor(lettersQuantity.value * (vowelsPercentage.value / 100)) - vowelsInSpecificLetters.value;
  const consonantsQuantity = lettersQuantity.value - vowelsQuantity - specificLetters.value.length;

  const vowels: string[] = [];
  for (let i = 0; i < vowelsQuantity; i += 1) {
    vowels.push(getRandomVowel());
  }

  const consonants: string[] = [];
  for (let i = 0; i < consonantsQuantity; i += 1) {
    consonants.push(getRandomConsonant());
  }

  const allLetters = [
    ...vowels,
    ...consonants,
    ...(specificLettersEnabled.value && specificLettersPosition.value === 'anywhere' ? [specificLetters.value] : [])
  ];

  const word : string[] = [];
  for (let i = 0; i < lettersQuantity.value; i += 1) {
    word.push(allLetters.splice(getRandomInteger(allLetters.length), 1)[0]);
  }

  if (specificLettersEnabled.value) {
    if (specificLettersPosition.value === 'start') {
      word.unshift(specificLetters.value);
    } else if (specificLettersPosition.value === 'end') {
      word.push(specificLetters.value);
    }
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
