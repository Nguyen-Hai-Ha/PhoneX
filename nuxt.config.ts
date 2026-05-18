// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app',
//   vite: process.env.NODE_ENV === 'development' ? {
//     server: {
//       allowedHosts: ['hhpas.asia']
//     }
//   } : {},
  devtools: { enabled: true },

  modules: ['nuxt-swiper', '@pinia/nuxt', '@nuxt/icon', '@nuxtjs/sitemap', '@nuxt/image' ],
  css: ['~/assets/css/main.css'],

  swiper: {
    bundled: true,
  },

  build: {
    transpile: ['@prisma/client']
  },

  serverDir: 'server',

  nitro: {
    // storage: {
    //   redis: {
    //     driver: 'redis',
    //     host: 'localhost',
    //     port: 6379
    //   }
    // },
    prerender: {
      routes: ['/sitemap.xml']
    },
    externals: {
      external: ['@prisma/client', '.prisma/client']
    },
    imports: {
      dirs: ['utils']
    }
  },
  
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    }
  },
  
  routeRules: {
    '/images/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }
  },
  
  experimental: {
    appManifest: false  
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
        { rel: 'preconnect', href: 'https://hhpas.asia' },
      ]
    }
  },

  sitemap: {
    hostname: 'https://hhpas.asia',
    urls: async () => {
        const products = await $fetch('/api/products')
        return products.data.map(p => ({
            loc: `/products/${p.slug}`,
            lastmod: p.updatedAt,
        }))
    }
  }
})