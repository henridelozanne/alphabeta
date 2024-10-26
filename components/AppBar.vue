<template>
  <v-app-bar :elevation="2">
    <div class="v-toolbar-title">
      <div class="v-toolbar-title__placeholder">
        Alphabeta
      </div>
    </div>
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

<style>
.v-toolbar-title__placeholder {
  background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
  font-weight: 700;
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
</style>
