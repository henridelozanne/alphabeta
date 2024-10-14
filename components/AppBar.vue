<template>
  <v-app-bar title="Alphabeta" :elevation="2">
    <template v-if="mobile" #prepend>
      <v-app-bar-nav-icon />
    </template>
    <template #append>
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme" />
    </template>
  </v-app-bar>
</template>

<script setup>
import { useDisplay, useTheme } from 'vuetify';

const { mobile } = useDisplay();
const theme = useTheme();

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
