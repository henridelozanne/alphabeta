<template>
  <v-container>
    <v-row class="page-description">
      <v-col cols="12">
        <h1>Privacy Policy</h1>
        <p>
          At Moditext, we are committed to protecting your privacy. This page explains what data we collect, how it is used, and your rights regarding your information.
        </p>

        <h2>1. Data Collection</h2>
        <p>
          We do not collect any personal data directly. You can use all tools without creating an account or entering personal information.
        </p>

        <h2>2. Cookies and Third-Party Services</h2>
        <p>
          We use third-party services that may collect data through cookies or similar technologies:
        </p>
        <ul>
          <li><strong>Google Analytics</strong> – collects anonymous usage data to help us understand how the site is used.</li>
          <li><strong>Google AdSense</strong> – displays advertising. Ads may use cookies to personalize content based on your activity.</li>
        </ul>
        <p>
          You can control cookie settings through your browser or use <a href="https://myadcenter.google.com/" target="_blank">Google Ad Center</a> to manage ad personalization.
        </p>

        <h2>3. Data Sharing</h2>
        <p>
          We do not share or sell your data. Any data collected via third-party tools is managed by their respective privacy policies.
        </p>

        <h2>4. Your Rights</h2>
        <p>
          You can disable cookies in your browser settings. For more control over your data, consult the privacy settings offered by Google and other service providers.
        </p>

        <h2>5. Contact</h2>
        <p>
          If you have any questions about this policy, contact us at <a href="mailto:hnr.delozanne@gmail.com">hnr.delozanne@gmail.com</a>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
useHead({
  title: 'Moditext - Privacy Policy',
  meta: [
    {
      name: 'description',
      content: 'Learn how Moditext handles user privacy, cookies, analytics, and advertising data on this privacy policy page.'
    }
  ]
});
</script>

<style scoped lang="scss">
.page-description {
  h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
}
</style>
