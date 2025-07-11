<template>
  <v-container>
    <v-row class="page-description">
      <v-col cols="12">
        <h1>Case Converter</h1>
        <p>The case converter tool allows you to instantly change the letter casing of your text to various formats, such as uppercase, lowercase, capitalized case, and more. It's especially useful for developers formatting JSON or code, students preparing essays, and marketers ensuring consistency across titles and headers.</p>

        <h2>Supported formats</h2>
        <ul>
          <li>UPPERCASE</li>
          <li>lowercase</li>
          <li>Capitalized Case</li>
          <li>Sentence case</li>
          <li>snake_case, kebab-case, etc.</li>
        </ul>
        <p>With just a few clicks, you can format your entire text block, saving time and avoiding manual edits.</p>
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-textarea v-model="text" label="Original text" />
      </v-col>
    </v-row>
    <v-row class="section">
      <v-col class="btn-container">
        <v-btn :class="{selected: selectedTransformer === 'upper'}" @click="convertToUpperCase">
          Upper case
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'lower'}" @click="convertToLowerCase">
          Lower case
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'capitalized'}" @click="convertToCapitalized">
          Capitalized
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'camel'}" @click="convertToCamelCase">
          camelCase
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'snake'}" @click="convertToSnakeCase">
          Snake_case
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'kebab'}" @click="convertToKebabCase">
          kebab-case
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'pascal'}" @click="convertToPascalCase">
          PascalCase
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'flat'}" @click="convertToFlatCase">
          flatcase
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'reverse'}" @click="reverseText">
          Reverse
        </v-btn>
        <v-btn :class="{selected: selectedTransformer === 'binary'}" @click="convertToBinary">
          Binary
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="section">
      <v-col>
        <v-textarea
          v-model="result" label="Updated text"
          aria-live="polite"
        />
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
useHead({
  script: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8604734799570647',
      async: true,
      crossorigin: 'anonymous'
    }
  ]
});

useHead({
  title: 'Moditext - Case Converter',
  link: [
    {
      rel: 'canonical',
      href: 'https://moditext.com/case-converter'
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'Easily convert your text to different formats: uppercase, lowercase, camelCase, PascalCase, snake_case, and more. Try the smart online text transformer.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      property: 'og:title',
      content: 'Moditext - Text Case Converter'
    },
    {
      property: 'og:description',
      content: 'Easily convert your text to different formats: uppercase, lowercase, camelCase, PascalCase, snake_case, and more. Try the smart online text transformer.'
    },
    {
      property: 'og:url',
      content: 'https://moditext.com/case-converter'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
});

const text : Ref<string> = ref('This is an example text');
const result : Ref<string> = ref('');
const selectedTransformer = ref('');

const convertToUpperCase = () : void => {
  selectedTransformer.value = 'upper';
  result.value = text.value.toUpperCase();
};

const convertToLowerCase = () : void => {
  selectedTransformer.value = 'lower';
  result.value = text.value.toLowerCase();
};

const convertToCapitalized = () : void => {
  selectedTransformer.value = 'capitalized';
  result.value = text.value.split(/(?:\n| )+/).map((word : string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

const convertToCamelCase = () : void => {
  selectedTransformer.value = 'camel';
  result.value = text.value.split(/(?:\n| )+/).map((word : string, index: number) => {
    if (index === 0) { return word.toLowerCase(); }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
};

const convertToSnakeCase = () : void => {
  selectedTransformer.value = 'snake';
  result.value = text.value.trim().replaceAll(' ', '_');
};

const convertToKebabCase = () : void => {
  selectedTransformer.value = 'kebab';
  result.value = text.value.trim().replaceAll(' ', '-');
};

const convertToPascalCase = () : void => {
  selectedTransformer.value = 'pascal';
  result.value = text.value.split(' ').map((word : string) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
};

const convertToFlatCase = () : void => {
  selectedTransformer.value = 'flat';
  result.value = text.value.trim().replaceAll(' ', '').toLowerCase();
};

const reverseText = () : void => {
  selectedTransformer.value = 'reverse';
  result.value = text.value.split('').reverse().join('');
};

const convertToBinary = () : void => {
  selectedTransformer.value = 'binary';
  result.value = text.value.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
};

onMounted(() => {
  convertToUpperCase();
});
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .selected {
    background: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    color: white;
  }
}

h2 {
  margin-top: 20px;
}

ul {
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
