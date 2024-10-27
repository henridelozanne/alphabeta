<template>
  <div class="app">
    <v-app>
      <v-layout>
        <AppBar />

        <NavigationDrawer />

        <v-main>
          <NuxtPage />
        </v-main>
      </v-layout>
    </v-app>
  </div>
</template>

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
  background: rgb(255, 255, 255);
  border-radius: 4px;
}
</style>
