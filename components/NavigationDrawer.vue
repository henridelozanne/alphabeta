<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        link
        :title="item.title"
        :to="item.path"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const navItems = [
  {
    title: 'Random word generator',
    path: '/random-word-generator'
  },
  {
    title: 'Password generator',
    path: '/password-generator'
  },
  {
    title: 'Case converter',
    path: '/case-converter'
  },
  {
    title: 'Word counter',
    path: '/word-counter'
  },
  {
    title: 'Find and replace',
    path: '/find-and-replace'
  }
];
</script>
