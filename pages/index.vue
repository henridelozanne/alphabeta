<template>
  <v-container>
    <v-row class="page-description">
      <h1>Welcome to Moditext</h1>
      <p>Moditext offers a collection of free, fast, and easy-to-use online text tools for developers, writers, students, and creatives. Whether you need to convert case, count words, generate random ideas, or create strong passwords, our tools are built to save you time and effort — directly in your browser, with no signup required.</p>

      <h2>What makes Moditext unique?</h2>
      <p>Each tool is focused, lightweight, and designed for instant productivity. No clutter, no tracking, no distractions. Just pure utility for your writing, coding, or content tasks.</p>
    </v-row>

    <v-row>
      <v-col
        v-for="tool in tools" :key="tool.name"
        cols="12" md="6"
      >
        <v-card>
          <v-card-title class="text-h6 tool-card">
            <v-icon :icon="tool.icon" />
            {{ tool.name }}
          </v-card-title>
          <v-card-text>
            <p>{{ tool.description }}</p>
          </v-card-text>
          <v-card-actions>
            <NuxtLink :to="tool.link" class="text-blue-600">
              Open {{ tool.name }}
            </NuxtLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
useHead({
  title: 'Moditext - Free Online Text Tools',
  link: [
    {
      rel: 'canonical',
      href: 'https://moditext.com/'
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'Free and fast browser-based text tools: case converter, word counter, random word generator, password generator, and more.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      property: 'og:title',
      content: 'Moditext - Free Online Text Tools'
    },
    {
      property: 'og:description',
      content: 'Free and fast browser-based text tools: case converter, word counter, random word generator, password generator, and more.'
    },
    {
      property: 'og:url',
      content: 'https://moditext.com/'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
});

const tools = [
  {
    name: 'Random Word Generator',
    link: '/random-word-generator',
    icon: 'mdi-lightbulb-on-outline',
    description: 'Generate random words for creative writing, brainstorming, or naming ideas like a group or project.'
  },
  {
    name: 'Password Generator',
    link: '/password-generator',
    icon: 'mdi-lock-outline',
    description: 'Generate strong and secure passwords with customizable length and characters.'
  },
  {
    name: 'Case Converter',
    link: '/case-converter',
    icon: 'mdi-swap-horizontal',
    description: 'Easily change text casing: UPPERCASE, lowercase, Capitalized, camelCase, PascalCase, and more.'
  },
  {
    name: 'Word & Character Counter',
    link: '/word-counter',
    icon: 'mdi-counter',
    description: 'Count characters, words, lines, and more. Ideal for students, writers, and SEO optimization.'
  },
  {
    name: 'Find and Replace',
    link: '/find-and-replace',
    icon: 'mdi-find-replace',
    description: 'Quickly find and replace words or characters in your text, great for bulk editing or code formatting.'
  }
];
</script>

<style lang="scss" scoped>
.page-description {
  flex-direction: column;
  margin-bottom: 2rem;

}

.tool-card {
  display: flex;
  align-items: center;

  .v-icon {
    font-size: 17px;
    margin-right: 8px;
  }
}

h2 {
  margin-top: 20px;
}
</style>
