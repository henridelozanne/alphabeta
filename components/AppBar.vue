<template>
  <v-app-bar :elevation="2">
    <div class="v-toolbar-title">
      <div class="v-toolbar-title__placeholder">
        ModiText - <span class="current-page">{{ currentPageName }}</span>
      </div>
    </div>
    <template v-if="mobile" #prepend>
      <v-app-bar-nav-icon @click="openMobileMenu" />
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentPageName = computed(() => {
  const pathParts = route.path.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1] || 'home';
  return formatPageTitle(lastPart);
});

function formatPageTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const { mobile } = useDisplay();

const emit = defineEmits(['toggle-mobile-menu']);

const openMobileMenu = () => {
  emit('toggle-mobile-menu');
};

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
