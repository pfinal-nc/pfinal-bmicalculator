<template>
  <UContainer class="py-8">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <img 
            src="/logo.png" 
            alt="BMI Calculator Logo" 
            class="w-16 h-16 object-contain"
          />
        </div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About BMI - Body Mass Index
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Learn everything about BMI, how it's calculated, and its importance for health assessment.
        </p>
      </div>

      <!-- 主要内容 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 主要内容区域 -->
        <div class="lg:col-span-2 space-y-8">
          <!-- 什么是 BMI -->
          <UCard>
            <template #header>
              <h2 class="text-2xl font-bold">What is BMI?</h2>
            </template>
            
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <p>
                Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. 
                It was developed by Belgian statistician Adolphe Quetelet in the 1830s and is now widely used as a screening tool 
                to identify potential weight problems.
              </p>
              
              <p>
                BMI provides a simple numeric measure of a person's thickness or thinness, allowing health professionals to discuss 
                weight problems more objectively with their patients.
              </p>
            </div>
          </UCard>

          <!-- BMI 计算方法 -->
          <UCard>
            <template #header>
              <h2 class="text-2xl font-bold">How is BMI Calculated?</h2>
            </template>
            
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <p>BMI is calculated using a simple formula:</p>
              
              <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center my-6">
                <div class="text-2xl font-bold text-primary mb-2">BMI = weight (kg) / height (m)²</div>
                <p class="text-sm text-gray-600 dark:text-gray-400">For imperial units: BMI = (weight in pounds × 703) / (height in inches)²</p>
              </div>
              
              <h3>Example Calculation</h3>
              <p>If you weigh 70 kg and are 1.75 m tall:</p>
              <ul>
                <li>BMI = 70 ÷ (1.75 × 1.75)</li>
                <li>BMI = 70 ÷ 3.0625</li>
                <li>BMI = 22.9</li>
              </ul>
            </div>
          </UCard>

          <!-- BMI 分类 -->
          <UCard>
            <template #header>
              <h2 class="text-2xl font-bold">BMI Categories</h2>
            </template>
            
            <div class="space-y-4">
              <div
                v-for="category in bmiCategories"
                :key="category.label"
                class="flex items-center justify-between p-4 rounded-lg"
                :class="category.bgColor"
              >
                <div>
                  <div class="font-semibold text-lg">{{ category.label }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">{{ category.range }}</div>
                </div>
                <UBadge :color="category.color" variant="soft" size="lg">
                  {{ category.range }}
                </UBadge>
              </div>
            </div>
          </UCard>

          <!-- BMI 局限性 -->
          <UCard>
            <template #header>
              <h2 class="text-2xl font-bold">Limitations of BMI</h2>
            </template>
            
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <p>While BMI is a useful screening tool, it has several limitations:</p>
              
              <h3>Doesn't Account for Muscle Mass</h3>
              <p>
                BMI doesn't distinguish between muscle and fat. Athletes with high muscle mass may have a high BMI 
                but low body fat percentage.
              </p>
              
              <h3>Age and Sex Differences</h3>
              <p>
                BMI doesn't account for age or sex differences in body composition. Women tend to have more body fat 
                than men with the same BMI.
              </p>
              
              <h3>Ethnic Variations</h3>
              <p>
                Different ethnic groups may have different body compositions at the same BMI level. 
                Some populations may be at higher risk for health problems at lower BMI values.
              </p>
              
              <h3>Doesn't Measure Body Fat Distribution</h3>
              <p>
                BMI doesn't indicate where body fat is located. Abdominal fat (visceral fat) is more dangerous 
                than fat in other areas of the body.
              </p>
            </div>
          </UCard>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1 space-y-6">
          <!-- 快速计算器 -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Quick BMI Calculator</h3>
            </template>
            
            <div class="text-center">
              <UButton
                to="/"
                color="primary"
                size="lg"
                block
              >
                <UIcon name="i-heroicons-calculator" class="w-5 h-5" />
                Calculate Your BMI
              </UButton>
            </div>
          </UCard>

          <!-- 健康建议 -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Health Tips</h3>
            </template>
            
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-heart" class="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <div class="font-medium">Regular Exercise</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Aim for at least 150 minutes of moderate exercise per week
                  </div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-cake" class="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div class="font-medium">Balanced Diet</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Focus on whole foods, fruits, vegetables, and lean proteins
                  </div>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-moon" class="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <div class="font-medium">Adequate Sleep</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Get 7-9 hours of quality sleep each night
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- 相关链接 -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Related Tools</h3>
            </template>
            
            <div class="space-y-2">
              <UButton
                to="/bmi-chart"
                variant="ghost"
                color="gray"
                block
                justify="start"
              >
                <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
                BMI Chart
              </UButton>
              
              <UButton
                to="/"
                variant="ghost"
                color="gray"
                block
                justify="start"
              >
                <UIcon name="i-heroicons-calculator" class="w-4 h-4" />
                BMI Calculator
              </UButton>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: 'About BMI - Complete Guide to Body Mass Index | BMI Calculator',
  meta: [
    { name: 'description', content: 'Complete guide to BMI (Body Mass Index): Learn how BMI is calculated, understand BMI categories, BMI ranges, and BMI limitations. Expert health assessment information.' },
    { name: 'keywords', content: 'BMI, body mass index, BMI calculation, BMI formula, BMI categories, BMI ranges, BMI limitations, health assessment, weight management, obesity, underweight, overweight, healthy weight, BMI chart, BMI tool, medical calculator, health calculator, fitness calculator, body fat percentage, weight loss, weight gain, health recommendations' }
  ]
})

// BMI 分类数据
const bmiData = {
  categories: [
    {
      label: 'Underweight',
      range: 'Below 18.5',
      color: 'blue',
      description: 'You may need to gain weight. Consult a healthcare provider for personalized advice.',
      recommendations: [
        'Eat more nutrient-dense foods',
        'Consider strength training to build muscle',
        'Consult with a healthcare provider'
      ]
    },
    {
      label: 'Normal weight',
      range: '18.5 - 24.9',
      color: 'green',
      description: 'Great! You have a healthy weight for your height.',
      recommendations: [
        'Maintain your current lifestyle',
        'Continue regular exercise',
        'Eat a balanced diet'
      ]
    },
    {
      label: 'Overweight',
      range: '25.0 - 29.9',
      color: 'yellow',
      description: 'Consider losing weight for better health outcomes.',
      recommendations: [
        'Increase physical activity',
        'Reduce calorie intake',
        'Focus on whole foods'
      ]
    },
    {
      label: 'Obese',
      range: '30.0 and above',
      color: 'red',
      description: 'Weight loss is recommended. Consult a healthcare provider for a comprehensive plan.',
      recommendations: [
        'Consult with a healthcare provider',
        'Create a structured weight loss plan',
        'Consider professional support'
      ]
    }
  ]
}

// 处理分类数据，添加背景颜色
const bmiCategories = computed(() => {
  return bmiData.categories.map(category => ({
    ...category,
    bgColor: getCategoryBgColor(category.color)
  }))
})

// 获取分类背景颜色
const getCategoryBgColor = (color) => {
  const bgColors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20',
    green: 'bg-green-50 dark:bg-green-900/20',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20',
    red: 'bg-red-50 dark:bg-red-900/20'
  }
  return bgColors[color] || 'bg-gray-50 dark:bg-gray-800'
}
</script>
