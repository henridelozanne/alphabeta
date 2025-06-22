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
import navItems from '~/utils/navItems';

</script>
