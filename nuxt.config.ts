export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // 静态站点生成配置
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  // 应用配置
  app: {
    head: {
      title: 'Free BMI Calculator - Online Body Mass Index Tool',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Free BMI calculator online - Calculate your Body Mass Index instantly. Get BMI categories, health recommendations, and BMI chart. Accurate BMI calculation for adults in metric and imperial units.' 
        },
                    { name: 'keywords', content: 'BMI calculator, body mass index calculator, free BMI calculator, BMI chart, BMI categories, weight calculator, health calculator, BMI formula, calculate BMI, BMI ranges, healthy weight, obesity calculator, underweight calculator, overweight calculator, BMI tool, body fat calculator, health assessment, weight management, fitness calculator, medical calculator, pfnalclub' },
        { property: 'og:title', content: 'Free BMI Calculator - Online Body Mass Index Tool' },
        { property: 'og:description', content: 'Free BMI calculator online - Calculate your Body Mass Index instantly. Get BMI categories, health recommendations, and BMI chart. Accurate BMI calculation for adults.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bmicalculator.friday-go.icu' },
        { property: 'og:image', content: 'https://bmicalculator.friday-go.icu/logo.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Free BMI Calculator - Online Body Mass Index Tool' },
        { name: 'twitter:description', content: 'Free BMI calculator online - Calculate your Body Mass Index instantly. Get BMI categories, health recommendations, and BMI chart.' },
        { name: 'twitter:image', content: 'https://bmicalculator.friday-go.icu/logo.png' },
        { name: 'author', content: 'BMI Calculator' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'en' },
        { name: 'revisit-after', content: '7 days' },
        { name: 'distribution', content: 'global' },
        { name: 'rating', content: 'general' },
        { name: 'geo.region', content: 'US' },
        { name: 'geo.placename', content: 'United States' },
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'BMI Calculator' }
      ],
                link: [
                  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                  { rel: 'apple-touch-icon', href: '/logo.png' },
                  { rel: 'icon', type: 'image/png', href: '/logo.png' }
                ]
    }
  },

  // CSS 配置
  css: ['~/assets/css/main.css'],

  // 模块配置
  modules: [
    '@nuxt/ui'
  ],

  // UI 配置
  ui: {
    global: true,
    icons: ['heroicons', 'lucide']
  },

  // 颜色模式配置 - 强制深色模式
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
    dataValue: 'dark'
  },

  // 路由规则
  routeRules: {
    '/': { prerender: true },
    '/about-bmi': { prerender: true },
    '/bmi-chart': { prerender: true }
  },

  // 性能优化
  experimental: {
    payloadExtraction: true
  },

  // 构建优化
  build: {
    transpile: ['@nuxt/ui']
  },

  // 图片优化
  image: {
    quality: 80,
    format: ['webp', 'avif']
  }
})
