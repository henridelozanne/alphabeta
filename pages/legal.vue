<template>
  <v-container>
    <v-row class="page-description">
      <p>This page provides the legal information about this website, including publisher and hosting details, in compliance with applicable regulations.</p>
    </v-row>

    <v-row class="section">
      <v-col cols="12">
        <h1 class="text-h4">
          Legal Notice
        </h1>
        <p>This website is published by:</p>
        <ul>
          <li><strong>Name:</strong> Henri D.</li>
          <li><strong>Legal status:</strong> Sole proprietorship (autoentrepreneur)</li>
          <li><strong>Business ID:</strong> SIRET 88258800700030</li>
          <li><strong>Address:</strong> Available upon request</li>
          <li><strong>Email:</strong> hnr.delozanne@gmail.com</li>
        </ul>

        <p class="mt-4">
          Website hosted by:
        </p>
        <ul>
          <li><strong>Company:</strong> Hostinger International Ltd.</li>
          <li><strong>Address:</strong> 61 Lordou Vironos Street, 6023 Larnaca, Cyprus</li>
          <li><strong>Website:</strong> <a href="https://www.hostinger.com" target="_blank">www.hostinger.com</a></li>
        </ul>

        <p class="mt-4">
          <strong>Publication director:</strong> Henri D.
        </p>
        <p><strong>Purpose of the website:</strong> Free online text tools with advertising</p>
      </v-col>
    </v-row>

    <v-row class="section">
      <h2 class="text-h5 mt-8">
        Privacy Policy
      </h2>
      <p>
        This website does not collect personal data without your consent. Any data collected through contact forms or email communication is used solely for responding to inquiries and is never shared with third parties.
      </p>

      <h2 class="text-h5 mt-8">
        Cookies
      </h2>
      <p>
        This website uses cookies provided by Google AdSense to serve personalized or non-personalized advertisements. These cookies may track your browsing activity. By using this site, you consent to the use of such cookies as governed by Google's policies.
      </p>
      <p>
        You can manage or disable cookies directly from your browser settings. For more information on how Google uses your data, please refer to their <a href="https://policies.google.com/technologies/ads" target="_blank">advertising policies</a>.
      </p>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
useHead({
  title: 'Moditext - Legal Notice',
  meta: [
    { name: 'description', content: 'Legal notice, privacy and cookie policy, and business information for Moditext, a website offering online text tools.' }
  ]
});
</script>

<style scoped lang="scss">
.text-h4 {
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}

ul {
  list-style-type: none;
}
</style>
