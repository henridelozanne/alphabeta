<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        link
        :title="item.title"
        :to="item.path"
        :prepend-icon="item.icon"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
const navItems = [
  {
    title: 'Random word generator',
    path: '/random-word-generator',
    icon: 'mdi-lightbulb-on-outline'
  },
  {
    title: 'Password generator',
    path: '/password-generator',
    icon: 'mdi-lock-outline'
  },
  {
    title: 'Case converter',
    path: '/case-converter',
    icon: 'mdi-swap-horizontal'
  },
  {
    title: 'Word counter',
    path: '/word-counter',
    icon: 'mdi-counter'
  },
  {
    title: 'Find and replace',
    path: '/find-and-replace',
    icon: 'mdi-find-replace'
  }
];
</script>
