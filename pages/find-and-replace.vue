<template>
  <div>
    <v-textarea v-model="text" label="Original text" />
    <v-text-field
      v-model="origin" label="Search value"
    />
    <v-text-field
      v-model="replaced" label="Replace value"
    />
    <v-textarea v-model="result" label="Updated text" />
    <v-row justify="center">
      <v-col cols="1" class="centered-action__wrapper">
        <CopyButton :text-to-copy="result" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
const text : Ref<string> = ref('');
const origin: Ref<string> = ref('');
const replaced: Ref<string> = ref('');

const result : ComputedRef<string> = computed(() => text.value.replaceAll(origin.value, replaced.value));
</script>
