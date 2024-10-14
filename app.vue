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
main > * {
  margin: 50px 50px 0;
}
</style>
