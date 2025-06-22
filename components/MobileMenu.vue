<template>
  <div class="mobile-menu">
    <v-btn
      class="close-btn" icon="mdi-close"
      variant="plain"
      @click="closeMobileMenu"
    />
    <v-list class="item-list">
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        link
        :title="item.title"
        :to="item.path"
        :prepend-icon="item.icon"
        @click="closeMobileMenu"
      />
    </v-list>
  </div>
</template>

<script setup>
import navItems from '~/utils/navItems';

const emit = defineEmits(['toggle-mobile-menu']);

const closeMobileMenu = () => {
  emit('toggle-mobile-menu');
};

</script>

<style lang="scss">
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 75vw;
  background: white;
  z-index: 1001;

  .close-btn {
    margin-left: auto;
    display: block;
  }

  .item-list {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
}

</style>
