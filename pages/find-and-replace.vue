<template>
  <v-container>
    <v-row class="section">
      <v-col>
        <v-textarea v-model="text" label="Original text" />
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-text-field
          v-model="origin" label="Search value"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="replaced" label="Replace value"
        />
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-textarea v-model="result" label="Updated text" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="1" class="centered-action__wrapper">
        <CopyButton :text-to-copy="result" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const text : Ref<string> = ref('The cat sleeps. The cat eats. The cat is happy. Everyone loves the cat.');
const origin: Ref<string> = ref('cat');
const replaced: Ref<string> = ref('dog');

const result : ComputedRef<string> = computed(() => text.value.replaceAll(origin.value, replaced.value));
</script>
