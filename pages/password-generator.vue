<template>
  <v-container class="password-generator">
    <v-row class="page-description">
      <v-col>
        <h1>Password Generator</h1>
        <p>Generate strong and secure passwords instantly. Choose your desired length and customize the use of uppercase letters, numbers, and special symbols. This tool helps you protect your online accounts with best-practice passwords.</p>

        <h2>Why strong passwords matter</h2>
        <p>Weak passwords are a common entry point for cyberattacks. A complex password created with this tool greatly improves your digital safety.</p>
      </v-col>
    </v-row>

    <v-row class="result-wrapper section">
      <span aria-live="polite">{{ generatedPassword }}</span>

      <div v-if="generatedPassword.length" class="copy-wrapper">
        <CopyButton :text-to-copy="generatedPassword" />
      </div>
    </v-row>

    <v-row justify="center">
      <v-col cols="1" class="centered-action__wrapper">
        <v-btn @click="generatePassword">
          Generate new
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="settings section">
      <v-col cols="12">
        <h2 class="text-h5">
          Generation settings
        </h2>
      </v-col>

      <v-col>
        <v-row>
          <v-col>
            <v-number-input
              v-model="charactersQuantity"
              :max="15"
              :min="1"
              label="Number of characters"
              :hide-input="false"
              :inset="false"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox v-model="specialCharactersEnabled" label="Include special characters" />
          </v-col>
          <v-col>
            <v-checkbox v-model="numbersEnabled" label="Include numbers" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
useHead({
  title: 'Moditext - Password Generator',
  link: [
    {
      rel: 'canonical',
      href: 'https://moditext.com/password-generator'
    }
  ],
  meta: [
    {
      name: 'description',
      content: 'Create strong, secure passwords in seconds. This advanced password generator lets you customize length, special characters, and numbers to meet your security needs. Save time, stay protected.'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      property: 'og:title',
      content: 'Moditext - Password Generator'
    },
    {
      property: 'og:description',
      content: 'Create strong, secure passwords in seconds. This advanced password generator lets you customize length, special characters, and numbers to meet your security needs. Save time, stay protected.'
    },
    {
      property: 'og:url',
      content: 'https://moditext.com/password-generator'
    },
    {
      property: 'og:type',
      content: 'website'
    }
  ]
});

const generatedPassword: Ref<string> = ref('');
const charactersQuantity: Ref<number> = ref(13);
const specialCharactersEnabled: Ref<boolean> = ref(true);
const numbersEnabled: Ref<boolean> = ref(true);

const letterPercentage = computed(() => 1 - specialCharactersPercentage.value - numbersPercentage.value);
const specialCharactersPercentage = computed(() => (specialCharactersEnabled.value ? 0.2 : 0));
const numbersPercentage = computed(() => (numbersEnabled.value ? 0.2 : 0));

const letterQuantity = computed(() => Math.floor(charactersQuantity.value * letterPercentage.value));
const specialCharactersQuantity = computed(() => {
  if (!specialCharactersEnabled.value) { return 0; }
  if (!numbersEnabled.value) { return charactersQuantity.value - letterQuantity.value; }
  return Math.floor(charactersQuantity.value * specialCharactersPercentage.value);
});
const numbersQuantity = computed(() => {
  if (!numbersEnabled.value) { return 0; }
  if (!specialCharactersQuantity.value) { return charactersQuantity.value - numbersPercentage.value; }
  return charactersQuantity.value - letterQuantity.value - specialCharactersQuantity.value;
});

const formatPassword = (password: string[]) : string => {
  const mixedUpperCaseAndLowerCase = password.map(character => (Math.random() < 0.6 ? character.toLowerCase() : character.toUpperCase()));
  return mixedUpperCaseAndLowerCase.join('');
};

const generatePassword = () : void => {
  const letters: string[] = [];
  for (let i = 0; i < letterQuantity.value; i += 1) {
    letters.push(getRandomLetter());
  }

  const specialCharacters: string[] = [];
  for (let i = 0; i < specialCharactersQuantity.value; i += 1) {
    specialCharacters.push(getRandomSpecialCharacter());
  }

  const numbers: string[] = [];
  for (let i = 0; i < numbersQuantity.value; i += 1) {
    numbers.push(getRandomNumber());
  }

  const allCharacters = [...letters, ...specialCharacters, ...numbers];

  const password : string[] = [];
  for (let i = 0; i < charactersQuantity.value; i += 1) {
    password.push(allCharacters.splice(getRandomInteger(allCharacters.length), 1)[0]);
  }

  generatedPassword.value = formatPassword(password);
};

onMounted(() => {
  generatePassword();
});

</script>

<style lang="scss" scoped>
.password-generator {
  .result-wrapper {
    min-height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    span {
      font-size: 2.7rem;
    }

    .copy-wrapper {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
}

h2 {
  margin-top: 20px;
}
</style>
