<template>
  <v-container>
    <v-row class="page-description">
      <h1>
        Random word generator
      </h1>
      <p>
        This random word generator helps you instantly produce random words for creative writing, brainstorming, name generation, or language learning. You can set the word length and generate new ideas on the fly. It’s a valuable tool for writers with writer’s block, teachers creating vocabulary games, or anyone looking to expand their lexicon.
      </p>
      <p>
        With just one click, get inspiration in the form of fresh, unexpected words that can unlock creativity and enrich your writing. It’s also perfect for people looking for band names, project titles, or anything that needs a spark of originality — one random word could be the seed for your next great idea.
      </p>
      <p>
        It’s also perfect for people looking for band names, project titles, or anything that needs a spark of originality — one random word could be the seed for your next great idea.
      </p>
    </v-row>

    <v-row>
      <v-col class="result-wrapper section">
        <span v-if="generatedWords.length" class="generated-word">{{ generatedWords[currentWordIndex] }}</span>
        <div v-if="generatedWords.length > 1" class="navigation-buttons-wrapper">
          <v-btn
            :disabled="currentWordIndex === 0" aria-label="Previous word"
            @click="displayPreviousWord"
          >
            <v-icon icon="mdi-arrow-left" />
          </v-btn>
          <v-btn
            :disabled="currentWordIndex === generatedWords.length - 1" aria-label="Next word"
            @click="displayNextWord"
          >
            <v-icon icon="mdi-arrow-right" />
          </v-btn>
        </div>

        <div v-if="generatedWords.length" class="save-wrapper">
          <v-btn
            :disabled="savedWords.includes(generatedWords[currentWordIndex])" prepend-icon="mdi-content-save"
            aria-label="Save current word"
            @click="saveWord"
          >
            <template #prepend>
              <v-icon />
            </template>
            Save
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="1" class="centered-action__wrapper">
        <v-btn aria-label="Generate new word" @click="generateRandomWord">
          Generate new
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="settings section">
      <v-col cols="12">
        <h2 class="text-h5">
          Generation settings
        </h2>
      </v-col>

      <v-col>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-number-input
              v-model="lettersQuantity"
              :max="15"
              :min="1"
              label="Number of letters"
              :hide-input="false"
              :inset="false"
            />
          </v-col>
          <v-col
            cols="12"
            md="6" class="vowel-percentage-wrapper"
          >
            <v-slider
              v-model="vowelsPercentage"
              min="0" max="100"
              thumb-label
              step="10"
              show-ticks
              label="Vowel percentage"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-switch v-model="specificLettersEnabled" label="Add specific letters" />
          </v-col>
        </v-row>

        <v-row v-if="specificLettersEnabled">
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="specificLetters" label="Letters wanted"
              :maxlength="lettersQuantity - 1"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="position-wrapper"
          >
            <v-radio-group v-model="specificLettersPosition" inline>
              <v-radio label="Anywhere" value="anywhere" />
              <v-radio label="Start" value="start" />
              <v-radio label="End" value="end" />
            </v-radio-group>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col cols="12">
        <h2 class="text-h5">
          Saved words
        </h2>
      </v-col>

      <v-col class="saved-words-wrapper section">
        <v-chip v-if="!savedWords.length" class="ma-2">
          No saved words for now
        </v-chip>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8604734799570647',
      async: true,
      crossorigin: 'anonymous'
    }
  ]
});

useHead({
  title: 'Moditext - Random Word Generator',
  link: [
    {
      rel: 'canonical',
      href: 'https://moditext.com/random-word-generator'
    }
  ],
  meta: [
    { name: 'description', content: 'Generate random words with specific length and vowel percentage. Save your favorite generated words and tweak advanced settings.' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Moditext - Random Word Generator' },
    { property: 'og:description', content: 'Generate random words with specific length and vowel percentage. Save your favorite generated words and tweak advanced settings.' },
    { property: 'og:url', content: 'https://moditext.com/random-word-generator' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Moditext - Random Word Generator' },
    { name: 'twitter:description', content: 'Generate random words with specific length and vowel percentage.' }
  ]
});

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

  generateRandomWord();
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
.result-wrapper {
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .generated-word {
    font-size: 2.7rem;
  }

  .navigation-buttons-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  @media screen and (min-width: 1280px)  {
    .navigation-buttons-wrapper {
      position: absolute;
      right: 10px;
      top: 10px;
      left: unset;
    }
  }

  .save-wrapper {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
}

.settings {
  padding: 20px;

  .vowel-percentage-wrapper {
    display: flex;
    align-items: center;
  }

  .position-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    .v-selection-control-group {
      display: flex;
      justify-content: space-evenly;
    }
  }
}

.saved-words-wrapper {
  .saved-word .saved-word-close-icon {
    display: none;
  }

  .saved-word:hover {
    .saved-word-close-icon {
      display: block;
    }
  }
}

.v-input__details {
  display: none;
}

p {
  margin-bottom: 20px;
}
</style>
