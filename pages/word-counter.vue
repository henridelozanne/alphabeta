<template>
  <v-container>
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

        <p>Time to read silently : {{ silentReadingTimeDisplay }}</p>

        <p>Time to read aloud : {{ aloudReadingTimeDisplay }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
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

<style lang="scss" scoped>
.input-with-margin {
  margin-bottom: 15px;
}
</style>
