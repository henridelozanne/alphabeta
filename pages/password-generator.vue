<template>
  <div class="password-generator">
    <div class="result-wrapper">
      <span v-if="generatedPassword.length">{{ generatedPassword }}</span>

      <div v-if="generatedPassword.length" class="copy-wrapper">
        <v-btn
          :prepend-icon="copySuccessDisplay ? 'mdi-check' : 'mdi-content-copy'"
          @click="copyPassword"
        >
          <template #prepend>
            <v-icon />
          </template>
          {{ copySuccessDisplay ? 'Copied' : 'Copy' }}
        </v-btn>
      </div>
    </div>

    <v-number-input
      v-model="charactersQuantity"
      :max="15"
      :min="1"
      label="Number of characters"
      :hide-input="false"
      :inset="false"
    />

    <div>
      <v-checkbox v-model="specialCharactersEnabled" label="Include special characters" />
      <v-checkbox v-model="numbersEnabled" label="Include numbers" />
    </div>

    <v-btn @click="generatePassword">
      Generate
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import constants from '@/assets/constants.json';

const generatedPassword: Ref<string> = ref('');
const charactersQuantity: Ref<number> = ref(13);
const specialCharactersEnabled: Ref<boolean> = ref(true);
const numbersEnabled: Ref<boolean> = ref(true);
const copySuccessDisplay: Ref<boolean> = ref(false);

const getRandomInteger = (length: number): number => Math.floor(Math.random() * length);
const getRandomLetter = () : string => constants.letters[getRandomInteger(constants.letters.length)];
const getRandomSpecialCharacter = () : string => constants.specialCharacters[getRandomInteger(constants.specialCharacters.length)];
const getRandomNumber = () : string => constants.numbers[getRandomInteger(constants.numbers.length)];

const letterPercentage = computed(() => 1 - (specialCharactersEnabled.value ? 0.2 : 0) - (numbersEnabled.value ? 0.2 : 0));
const specialCharactersPercentage = computed(() => (specialCharactersEnabled.value ? 0.2 : 0));
const numbersPercentage = computed(() => (numbersEnabled.value ? 0.2 : 0));

const letterQuantity = computed(() => Math.floor(charactersQuantity.value * letterPercentage.value));
const specialCharactersQuantity = computed(() => {
  if (!specialCharactersEnabled.value) { return 0; }
  if (!numbersEnabled.value) {
    return charactersQuantity.value - letterQuantity.value;
  }
  return Math.floor(charactersQuantity.value * specialCharactersPercentage.value);
});
const numbersQuantity = computed(() => {
  if (!numbersEnabled.value) { return 0; }
  if (!specialCharactersQuantity.value) {
    return charactersQuantity.value - numbersPercentage.value;
  }
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

  const allCharacters = [
    ...letters,
    ...specialCharacters,
    ...numbers
  ];

  const password : string[] = [];
  for (let i = 0; i < charactersQuantity.value; i += 1) {
    password.push(allCharacters.splice(getRandomInteger(allCharacters.length), 1)[0]);
  }

  generatedPassword.value = formatPassword(password);
};

const copyPassword = () : void => {
  navigator.clipboard.writeText(generatedPassword.value);
  copySuccessDisplay.value = true;
  setTimeout(() => {
    copySuccessDisplay.value = false;
  }, 2000);
};

</script>

<style lang="scss" scoped>
.password-generator {
  margin: 50px 50px 0;

  .result-wrapper {
    border: 1px solid black;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 30px;

    span {
      font-size: 2.7rem;
    }

    .copy-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
