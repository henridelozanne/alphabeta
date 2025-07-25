<template>
  <v-container>
    <v-row class="page-description">
      <v-col>
        <h1>Find and Replace</h1>
        <p>This tool lets you search and replace words or phrases in your text with ease. It's ideal for editing large blocks of content, fixing typos, or cleaning up repeated terms.</p>

        <h2>Example</h2>
        <p>Replace all instances of “John” with “Jane” in one click. Useful for batch edits, content migration, or quick cleanup.</p>
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-textarea v-model="text" label="Original text" />
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-text-field
          v-model="origin" label="Search value"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="replaced" label="Replace value"
        />
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-textarea v-model="result" label="Updated text" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="1" class="centered-action__wrapper">
        <CopyButton :text-to-copy="result" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
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
  title: 'Moditext - Find and replace',
  meta: [
    {
      name: 'description',
      content: 'Quickly search and replace text with our Text Replacer tool. Enter your original text, specify the search value and replacement, and get updated text immediately.'
    },
    {
      name: 'keywords',
      content: 'text replacer, search and replace, text editing, string replacement, text tool, replace words, text manipulation'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    // Open Graph
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:title',
      content: 'Text Replacer — Search and Replace Text Instantly'
    },
    {
      property: 'og:description',
      content: 'Quickly search and replace text with our Text Replacer tool. Enter your original text, specify the search value and replacement, and get updated text immediately.'
    },
    {
      name: 'twitter:title',
      content: 'Text Replacer — Search and Replace Text Instantly'
    },
    {
      name: 'twitter:description',
      content: 'Quickly search and replace text with our Text Replacer tool. Enter your original text, specify the search value and replacement, and get updated text immediately.'
    }
  ],
  link: [
    { rel: 'canonical', href: 'https://ton-site-exemple.com/text-replacer' },
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ]
});

const text : Ref<string> = ref('The cat sleeps. The cat eats. The cat is happy. Everyone loves the cat.');
const origin: Ref<string> = ref('cat');
const replaced: Ref<string> = ref('dog');

const result : ComputedRef<string> = computed(() => text.value.replaceAll(origin.value, replaced.value));
</script>

<style scoped>
h2 {
  margin-top: 20px;
}
</style>
