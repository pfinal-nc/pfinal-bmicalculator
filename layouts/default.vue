<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 导航栏 -->
    <UHeader>
                <template #left>
                  <NuxtLink to="/" class="flex items-center gap-3">
                    <img 
                      src="/logo.png" 
                      alt="BMI Calculator Logo" 
                      class="w-8 h-8 object-contain"
                    />
                    <UButton
                      variant="ghost"
                      color="primary"
                      size="lg"
                      class="font-bold text-lg"
                    >
                      BMI Calculator
                    </UButton>
                  </NuxtLink>
                </template>
      
      <template #right>
        <NuxtLink to="/about-bmi">
          <UButton
            variant="ghost"
            color="gray"
          >
            About BMI
          </UButton>
        </NuxtLink>
        <NuxtLink to="/bmi-chart">
          <UButton
            variant="ghost"
            color="gray"
          >
            BMI Chart
          </UButton>
        </NuxtLink>
      </template>
    </UHeader>

    <!-- 主内容区域 -->
    <main>
      <slot />
    </main>

    <!-- 页脚 -->
    <UFooter>
      <template #left>
        <p class="text-sm text-gray-500">
          © 2024 BMI Calculator. Free online tool for health assessment.
        </p>
      </template>
      
      <template #right>
        <div class="flex gap-4">
          <NuxtLink to="/about-bmi">
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
            >
              About
            </UButton>
          </NuxtLink>
          <NuxtLink to="/bmi-chart">
            <UButton
              variant="ghost"
              color="gray"
              size="sm"
            >
              Chart
            </UButton>
          </NuxtLink>
        </div>
      </template>
    </UFooter>
  </div>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: 'BMI Calculator - Free Online Body Mass Index Tool',
  meta: [
    { name: 'description', content: 'Calculate your BMI for free. Get instant results and learn about healthy weight ranges.' }
  ]
})
</script>
