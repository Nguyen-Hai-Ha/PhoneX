// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app/',
  devtools: { enabled: true },

  modules: ['nuxt-swiper', '@nuxtjs/robots', '@pinia/nuxt', '@nuxt/icon'],
  css: ['~/assets/css/main.css'],

  swiper: {
    bundled: true,
  },

  build: {
    transpile: ['@prisma/client']
  },

  serverDir: 'server',

  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        host: 'localhost',
        port: 6379
      }
    },
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    },
    externals: {
      external: ['@prisma/client', '.prisma/client']
    },
    imports: {
      dirs: ['utils']
    }
  },
  
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL
  },

  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      meta: [
        { name: 'theme-color', content: '#d70018' },
        { property: 'og:site_name', content: 'PhoneX' },
        { property: 'og:locale', content: 'vi_VN' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  }
})