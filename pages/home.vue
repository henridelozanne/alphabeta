<template>
  <div class="home">
    <div class="result-wrapper">
      <span v-if="generatedWords.length">{{ generatedWords[currentWordIndex] }}</span>
      <div v-if="generatedWords.length > 1" class="navigation-buttons-wrapper">
        <v-btn :disabled="currentWordIndex === 0" @click="displayPreviousWord">
          <v-icon icon="mdi-arrow-left" />
        </v-btn>
        <v-btn :disabled="currentWordIndex === generatedWords.length - 1" @click="displayNextWord">
          <v-icon icon="mdi-arrow-right" />
        </v-btn>
      </div>

      <div v-if="generatedWords.length" class="save-wrapper">
        <v-btn
          :disabled="savedWords.includes(generatedWords[currentWordIndex])" prepend-icon="mdi-content-save"
          @click="saveWord"
        >
          <template #prepend>
            <v-icon />
          </template>
          Save
        </v-btn>
      </div>
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

    <div class="saved-words-wrapper">
      <v-chip
        v-for="word in savedWords"
        :key="word"
        class="saved-word ma-2"
        variant="outlined"
      >
        {{ word }}
        <v-icon
          class="saved-word-close-icon"
          icon="mdi-close-circle" end
          @click="deleteSavedWord(word)"
        />
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const generatedWords: Ref<string[]> = ref([]);
const lettersQuantity: Ref<number> = ref(5);
const vowelsPercentage: Ref<number> = ref(40);
const specificLetters: Ref<string> = ref('');
const specificLettersEnabled: Ref<boolean> = ref(false);
const specificLettersPosition: Ref<string> = ref('anywhere');
const currentWordIndex: Ref<number> = ref(0);
const savedWords: Ref<string[]> = ref([]);

onMounted(() => {
  savedWords.value = localStorage.getItem('savedWords')?.split(',') || [];
});

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

  generatedWords.value.push(formatWord(word));
  currentWordIndex.value = generatedWords.value.length - 1;
};

const displayPreviousWord = () : void => {
  currentWordIndex.value -= 1;
};

const displayNextWord = () : void => {
  currentWordIndex.value += 1;
};

const saveWord = () : void => {
  savedWords.value.push(generatedWords.value[currentWordIndex.value]);
  updateLocalStorage();
};

const deleteSavedWord = (word: string) : void => {
  savedWords.value.splice(savedWords.value.indexOf(word), 1);
  if (!savedWords.value.length) {
    deleteLocalStorage();
  } else {
    updateLocalStorage();
  }
};

const updateLocalStorage = () : void => {
  localStorage.setItem('savedWords', savedWords.value.join());
};

const deleteLocalStorage = () : void => {
  localStorage.removeItem('savedWords');
};

</script>

<style lang="scss" scoped>
.home {
  margin: 50px 50px 0;

  .result-wrapper {
    border: 1px solid black;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 30px;

    span {
      font-size: 2.7rem;
    }

    .navigation-buttons-wrapper {
      position: absolute;
      right: 0;
      top: 0;
    }

    .save-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .saved-words-wrapper {
    border: 1px solid black;
    min-height: 100px;
    margin-top: 30px;

    .saved-word .saved-word-close-icon {
      display: none;
    }

    .saved-word:hover {
      .saved-word-close-icon {
        display: block;
      }
    }
  }
}
</style>
