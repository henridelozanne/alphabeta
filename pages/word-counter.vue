<template>
  <div>
    <v-textarea v-model="text" label="Your text here" />
    <p>Total words : {{ wordCount }}</p>
    <v-text-field
      v-model="specificWord" label="Specific word"
    />
    <p>Number of occurences of {{ specificWord }} : {{ specificWordCount }}</p>
    <p>Total characters : {{ characterCount }}</p>
    <v-text-field
      v-model="specificCharacter" label="Specific character"
      maxlength="1"
    />
    <p>Number of occurences of "{{ specificCharacter }}" : {{ specificCharacterCount }}</p>
    <p>Total lines : {{ lineCount }}</p>
    <p>Total pages : {{ pageCount }}</p>
    <p>Total spaces : {{ spaceCount }}</p>
    <p>Time to read silently : {{ silentReadingTimeDisplay }}</p>
    <p>Time to read aloud : {{ aloudReadingTimeDisplay }}</p>
  </div>
</template>

<script lang="ts" setup>
const text : Ref<string> = ref('');

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
const silentReadingTime : ComputedRef<number> = computed(() => Math.ceil(wordCount.value / 238));
const aloudReadingTime : ComputedRef<number> = computed(() => Math.ceil(wordCount.value / 183));
const silentReadingTimeDisplay: ComputedRef<string> = computed(() => {
  if (wordCount.value === 0) { return '-'; }
  return `${silentReadingTime.value} minute${silentReadingTime.value > 1 ? 's' : ''}`;
});
const aloudReadingTimeDisplay: ComputedRef<string> = computed(() => {
  if (wordCount.value === 0) { return '-'; }
  return `${aloudReadingTime.value} minute${aloudReadingTime.value > 1 ? 's' : ''}`;
});
</script>
