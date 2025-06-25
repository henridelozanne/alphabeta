import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Moditext',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ]
    },
    baseURL: '/'
  },
  ssr: true,
  nitro: { preset: 'static' },
  sitemap: {
    siteUrl: 'https://moditext.com',
    routes: [
      '/random-word-generator',
      '/case-converter',
      '/find-and-replace',
      '/password-generator',
      '/word-counter'
    ],
    xsl: false
  },
  site: {
    url: 'https://www.moditext.com'
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  routeRules: {
    '/': {
      redirect: '/random-word-generator'
    }
  },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@nuxtjs/sitemap',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    }
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  }
});
