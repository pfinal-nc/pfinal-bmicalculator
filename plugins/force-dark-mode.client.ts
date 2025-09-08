// 强制深色模式插件
export default defineNuxtPlugin(() => {
  // 强制设置深色模式
  if (process.client) {
    // 设置 HTML 属性
    document.documentElement.setAttribute('data-theme', 'dark')
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    
    // 设置 color-scheme
    document.documentElement.style.colorScheme = 'dark'
    
    // 强制设置 Nuxt Color Mode
    if (window.__NUXT_COLOR_MODE__) {
      window.__NUXT_COLOR_MODE__.preference = 'dark'
      window.__NUXT_COLOR_MODE__.value = 'dark'
    }
    
    // 监听颜色模式变化，强制保持深色模式
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement
          if (!target.classList.contains('dark')) {
            target.classList.add('dark')
            target.classList.remove('light')
          }
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })
    
    // 页面加载完成后再次确保深色模式
    window.addEventListener('load', () => {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.documentElement.style.colorScheme = 'dark'
    })
  }
})
