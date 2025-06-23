<template>
  <v-btn
    :prepend-icon="copySuccessIsDisplayed ? 'mdi-check' : 'mdi-content-copy'" aria-label="Copy text"
    @click="copyText"
  >
    <template #prepend>
      <v-icon />
    </template>
    {{ copySuccessIsDisplayed ? 'Copied' : 'Copy' }}
  </v-btn>
</template>

<script lang="ts" setup>
const props = defineProps({
  textToCopy: {
    type: String,
    default: ''
  }
});

const copySuccessIsDisplayed: Ref<boolean> = ref(false);

const copyText = () : void => {
  navigator.clipboard.writeText(props.textToCopy);
  copySuccessIsDisplayed.value = true;
  setTimeout(() => {
    copySuccessIsDisplayed.value = false;
  }, 2000);
};
</script>
