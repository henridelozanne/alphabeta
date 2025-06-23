<template>
  <v-container>
    <v-row class="page-description">
      <h1>
        Word counter
      </h1>
      <p>
        This comprehensive text analyzer helps you understand your writing better by counting words, characters, lines, and spaces. It also tracks the frequency of any word or character you specify, and estimates the time needed to read your text silently or aloud based on average reading speeds. Use it to improve readability, prepare speeches, or optimize your writing.
      </p>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-textarea v-model="text" label="Your text here" />
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col cols="12">
        <v-text tag="h2" class="text-h5 mb-4">
          Words and characters
        </v-text>
      </v-col>

      <v-col cols="12">
        <p>Total words : {{ wordCount }}</p>
        <p>Total characters : {{ characterCount }}</p>
        <p>Total spaces : {{ spaceCount }}</p>
      </v-col>

      <v-row>
        <v-col cols="6">
          <v-switch v-model="specificWordEnabled" label="Count specific word" />

          <div v-if="specificWordEnabled">
            <v-text-field
              v-model="specificWord" label="Specific word"
              class="input-with-margin"
            />
            <p>Number of occurences : {{ specificWordCount }}</p>
          </div>
        </v-col>

        <v-col cols="6">
          <v-switch v-model="specificCharacterEnabled" label="Count specific character" />

          <div v-if="specificCharacterEnabled">
            <v-text-field
              v-model="specificCharacter" label="Specific character"
              class="input-with-margin"
              maxlength="1"
            />
            <p>Number of occurences : {{ specificCharacterCount }}</p>
          </div>
        </v-col>
      </v-row>
    </v-row>

    <v-row class="section">
      <v-col cols="12">
        <v-text tag="h2" class="text-h5 mb-4">
          Lines, pages and reading time
        </v-text>
      </v-col>

      <v-col cols="12">
        <p>Total lines : {{ lineCount }}</p>

        <p>Total pages : {{ pageCount }}</p>

        <p>
          Time to read silently

          <v-tooltip class="tooltip-trigger" text="Reading time is estimated based on an average reading speed of 238 words per minute, as referenced from Scholar Within.">
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                icon="mdi-information" end
              />
            </template>
          </v-tooltip>

          : {{ silentReadingTimeDisplay }}
        </p>

        <p>
          Time to read aloud <v-tooltip class="tooltip-trigger" text="Reading time aloud is estimated based on an average reading speed of 183 words per minute, as referenced from Scholar Within.">
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                icon="mdi-information" end
              />
            </template>
          </v-tooltip> : {{ aloudReadingTimeDisplay }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
useHead({
  title: 'Moditext - Word counter',
  meta: [
    {
      name: 'description',
      content: 'Analyze your text instantly with our Text Analyzer tool. Count words, characters, lines, and spaces. Track specific word and character occurrences. Estimate reading times silently and aloud for better writing and presentation preparation.'
    },
    {
      name: 'keywords',
      content: 'text analyzer, word count, character count, reading time, text analysis, writing tool, reading speed, speech preparation'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:title',
      content: 'Text Analyzer — Word & Character Count, Reading Time Estimation'
    },
    {
      property: 'og:description',
      content: 'Analyze your text instantly with our Text Analyzer tool. Count words, characters, lines, and spaces. Track specific word and character occurrences. Estimate reading times silently and aloud for better writing and presentation preparation.'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Text Analyzer — Word & Character Count, Reading Time Estimation'
    },
    {
      name: 'twitter:description',
      content: 'Analyze your text instantly with our Text Analyzer tool. Count words, characters, lines, and spaces. Track specific word and character occurrences. Estimate reading times silently and aloud for better writing and presentation preparation.'
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://ton-site-exemple.com/text-analyzer' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ]
});

const text : Ref<string> = ref('Lorem ipsum dolor sit amet. Et consequatur quibusdam in dolores fuga id quia facilis ex quae architecto aut quia rerum qui earum debitis. Qui quod mollitia et pariatur consequatur et consequatur enim non fuga commodi. Et odio nesciunt et quis voluptatibus aut explicabo aliquam ut doloremque expedita aut dolorem maiores.');

const specificWordEnabled = ref(false);
const specificCharacterEnabled = ref(false);

const wordList: ComputedRef<string[] | null> = computed(() => {
  if (text.value === '') { return null; }
  const split = text.value.trim().split(/(?:\n| )+/);
  const withoutSpecialCharacters = split.filter(chunk => !constants.specialCharacters.includes(chunk));
  return withoutSpecialCharacters;
});
const characterList : ComputedRef<string[]> = computed(() => text.value.split(''));

const wordCount : ComputedRef<number> = computed(() => wordList.value?.length || 0);
const characterCount : ComputedRef<number> = computed(() => characterList.value.length);

const specificWord : Ref<string> = ref('');
const specificWordCount: ComputedRef<number> = computed(() => wordList.value?.filter(word => word === specificWord.value).length || 0);

const specificCharacter : Ref<string> = ref('');
const specificCharacterCount: ComputedRef<number> = computed(() => characterList.value?.filter(character => character === specificCharacter.value).length || 0);

const lineCount : ComputedRef<number> = computed(() => {
  if (text.value === '') { return 0; }
  return text.value.split(/\r\n|\r|\n/).length;
});
const pageCount : ComputedRef<number> = computed(() => {
  if (text.value === '') { return 0; }
  return Math.ceil(wordCount.value / 450);
});
const spaceCount : ComputedRef<number> = computed(() => characterList.value.filter(character => character === ' ').length);

// according to https://scholarwithin.com/average-reading-speed#
const silentReadingTime : number = Math.ceil(wordCount.value / 238);
const aloudReadingTime : number = Math.ceil(wordCount.value / 183);
const silentReadingTimeDisplay: ComputedRef<string> = computed(() => {
  if (wordCount.value === 0) { return '-'; }
  return `${silentReadingTime} minute${silentReadingTime > 1 ? 's' : ''}`;
});
const aloudReadingTimeDisplay: ComputedRef<string> = computed(() => {
  if (wordCount.value === 0) { return '-'; }
  return `${aloudReadingTime} minute${aloudReadingTime > 1 ? 's' : ''}`;
});
</script>

<style lang="scss" scoped>
.input-with-margin {
  margin-bottom: 15px;
}

.tooltip-trigger  {
  // background:
}
</style>
