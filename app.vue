<template>
  <div class="app" :class="{ 'no-scroll': mobileMenuVisible }">
    <v-app>
      <v-layout>
        <AppBar @toggle-mobile-menu="toggleMobileMenu" />

        <NavigationDrawer />

        <transition name="fade-blur">
          <div
            v-if="mobileMenuVisible"
            class="mobile-menu-overlay"
            @click="toggleMobileMenu"
          />
        </transition>

        <transition name="slide-in-left">
          <MobileMenu
            v-if="mobileMenuVisible"
            @toggle-mobile-menu="toggleMobileMenu"
          />
        </transition>

        <v-main>
          <NuxtPage />
        </v-main>
      </v-layout>
    </v-app>
  </div>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-51QC7QPJ63'
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-51QC7QPJ63');
      `,
      type: 'text/javascript'
    },
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8604734799570647',
      async: true,
      crossorigin: 'anonymous'
    }
  ]
});

const mobileMenuVisible = ref(false);

const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value;
};
</script>

<style lang="scss">
@import './assets/css/vuetify-overwrite.scss';
@import './assets/css/style.scss';

main {
  background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
}
main > * {
  margin: 50px 50px 0;
}
.section {
  background: white;
  border-radius: 4px;
  padding: 20px;
}

// Scroll lock
.no-scroll {
  overflow: hidden;
  height: 100vh;
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  transition: backdrop-filter 0.3s ease;
  cursor: pointer;
}

// === Fade for overlay ===
.fade-blur-enter-active,
.fade-blur-leave-active {
  transition: opacity 0.3s ease;
}
.fade-blur-enter-from,
.fade-blur-leave-to {
  opacity: 0;
}
.fade-blur-enter-to,
.fade-blur-leave-from {
  opacity: 1;
}

// === Slide for menu ===
.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-in-left-enter-from {
  transform: translateX(-100%);
}
.slide-in-left-enter-to {
  transform: translateX(0);
}
.slide-in-left-leave-from {
  transform: translateX(0);
}
.slide-in-left-leave-to {
  transform: translateX(-100%);
}
</style>
