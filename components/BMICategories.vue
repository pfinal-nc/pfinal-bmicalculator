<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold">BMI Categories</h3>
    </template>

    <div class="space-y-3">
      <div
        v-for="category in categories"
        :key="category.label"
        class="flex items-center justify-between p-3 rounded-lg transition-colors"
        :class="[
          category.bgColor,
          { 'ring-2 ring-primary': highlightCategory === category.label }
        ]"
      >
        <div>
          <div class="font-medium">{{ category.label }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ category.range }}</div>
        </div>
        <UBadge :color="category.color" variant="soft">
          {{ category.range }}
        </UBadge>
      </div>
    </div>

    <!-- 说明文字 -->
    <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        <strong>Note:</strong> BMI is a screening tool and doesn't account for muscle mass, bone density, 
        or body composition. Always consult with a healthcare provider for comprehensive health assessment.
      </p>
    </div>
  </UCard>
</template>

<script setup>
// 定义 props
const props = defineProps({
  highlightCategory: {
    type: String,
    default: null
  }
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
const categories = computed(() => {
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
