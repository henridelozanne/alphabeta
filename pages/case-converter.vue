<template>
  <div>
    <v-row class="section">
      <v-col>
        <v-textarea v-model="text" label="Original text" />
      </v-col>
    </v-row>
    <v-row class="section">
      <v-col class="btn-container">
        <v-btn @click="convertToUpperCase">
          Upper case
        </v-btn>
        <v-btn @click="convertToLowerCase">
          Lower case
        </v-btn>
        <v-btn @click="convertToCapitalized">
          Capitalized
        </v-btn>
        <v-btn @click="convertToCamelCase">
          camelCase
        </v-btn>
        <v-btn @click="convertToSnakeCase">
          Snake_case
        </v-btn>
        <v-btn @click="convertToKebabCase">
          kebab-case
        </v-btn>
        <v-btn @click="convertToPascalCase">
          PascalCase
        </v-btn>
        <v-btn @click="convertToFlatCase">
          flatcase
        </v-btn>
        <v-btn @click="reverseText">
          Reverse
        </v-btn>
        <v-btn @click="convertToBinary">
          Binary
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="1" class="centered-action__wrapper">
        <CopyButton :text-to-copy="result" />
      </v-col>
    </v-row>
    <v-row class="section">
      <v-col>
        <v-textarea v-model="result" label="Updated text" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
const text : Ref<string> = ref('');
const result : Ref<string> = ref('');

const convertToUpperCase = () : void => {
  result.value = text.value.toUpperCase();
};

const convertToLowerCase = () : void => {
  result.value = text.value.toLowerCase();
};

const convertToCapitalized = () : void => {
  result.value = text.value.split(/(?:\n| )+/).map((word : string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

const convertToCamelCase = () : void => {
  result.value = text.value.split(/(?:\n| )+/).map((word : string, index: number) => {
    if (index === 0) { return word.toLowerCase(); }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
};

const convertToSnakeCase = () : void => {
  result.value = text.value.trim().replaceAll(' ', '_');
};

const convertToKebabCase = () : void => {
  result.value = text.value.trim().replaceAll(' ', '-');
};

const convertToPascalCase = () : void => {
  result.value = text.value.split(' ').map((word : string) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
};

const convertToFlatCase = () : void => {
  result.value = text.value.trim().replaceAll(' ', '').toLowerCase();
};

const reverseText = () : void => {
  result.value = text.value.split('').reverse().join('');
};

const convertToBinary = () : void => {
  result.value = text.value.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
};
</script>

<style scoped>
.btn-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 12px;
}
</style>
