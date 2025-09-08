<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <BMILogo />
        </div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          BMI Chart - Visual Guide
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Visual representation of BMI categories and healthy weight ranges for different heights.
        </p>
      </div>

      <!-- 单位切换 -->
      <div class="flex justify-center mb-8">
        <UToggle
          v-model="isMetric"
          :ui="{ 
            container: 'inline-flex items-center',
            wrapper: 'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            base: 'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            active: 'translate-x-6',
            inactive: 'translate-x-1'
          }"
          :labels="{
            on: 'Metric (kg, cm)',
            off: 'Imperial (lbs, ft)'
          }"
        />
      </div>

      <!-- BMI 图表 -->
      <div class="mb-12">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-table-cells" class="w-6 h-6 text-primary" />
              <h2 class="text-2xl font-bold">
                {{ isMetric ? 'Metric BMI Chart (kg/m²)' : 'Imperial BMI Chart (lbs/in²)' }}
              </h2>
            </div>
          </template>
          
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <th class="text-left py-4 px-3 font-semibold">
                    Height {{ isMetric ? '(cm)' : '(ft/in)' }}
                  </th>
                  <th class="text-center py-4 px-3 font-semibold">
                    <div class="flex items-center justify-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Underweight<br>< 18.5</span>
                    </div>
                  </th>
                  <th class="text-center py-4 px-3 font-semibold">
                    <div class="flex items-center justify-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Normal<br>18.5-24.9</span>
                    </div>
                  </th>
                  <th class="text-center py-4 px-3 font-semibold">
                    <div class="flex items-center justify-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Overweight<br>25.0-29.9</span>
                    </div>
                  </th>
                  <th class="text-center py-4 px-3 font-semibold">
                    <div class="flex items-center justify-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Obese<br>> 30.0</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="height in currentHeights"
                  :key="height"
                  class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td class="py-4 px-3 font-medium text-lg">{{ height }}</td>
                  <td class="text-center py-4 px-3">
                    <span class="text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                      {{ getWeightRange(height, 18.5, isMetric ? 'metric' : 'imperial').min }}-{{ getWeightRange(height, 18.5, isMetric ? 'metric' : 'imperial').max }}
                    </span>
                  </td>
                  <td class="text-center py-4 px-3">
                    <span class="text-green-600 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                      {{ getWeightRange(height, 24.9, isMetric ? 'metric' : 'imperial').min }}-{{ getWeightRange(height, 24.9, isMetric ? 'metric' : 'imperial').max }}
                    </span>
                  </td>
                  <td class="text-center py-4 px-3">
                    <span class="text-yellow-600 font-medium bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                      {{ getWeightRange(height, 29.9, isMetric ? 'metric' : 'imperial').min }}-{{ getWeightRange(height, 29.9, isMetric ? 'metric' : 'imperial').max }}
                    </span>
                  </td>
                  <td class="text-center py-4 px-3">
                    <span class="text-red-600 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                      {{ getWeightRange(height, 30, isMetric ? 'metric' : 'imperial').min }}+
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>
      </div>

      <!-- BMI 分类说明 -->
      <div class="mb-12">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-chart-bar-square" class="w-6 h-6 text-primary" />
              <h3 class="text-xl font-semibold">BMI Categories</h3>
            </div>
          </template>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="category in bmiCategories"
              :key="category.label"
              class="p-4 rounded-lg text-center transition-all duration-200 hover:shadow-md"
              :class="category.bgColor"
            >
              <div class="mb-3">
                <UBadge :color="category.color" variant="soft" size="lg">
                  {{ category.range }}
                </UBadge>
              </div>
              <h4 class="font-semibold text-lg mb-2">{{ category.label }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ category.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- 使用说明 -->
      <UCard>
        <template #header>
          <h2 class="text-2xl font-bold">How to Use This Chart</h2>
        </template>
        
        <div class="prose prose-gray dark:prose-invert max-w-none">
          <ol>
            <li><strong>Find your height</strong> in the left column of the appropriate chart (metric or imperial)</li>
            <li><strong>Look across the row</strong> to see the weight ranges for each BMI category</li>
            <li><strong>Compare your weight</strong> to the ranges to determine your BMI category</li>
            <li><strong>Use our calculator</strong> for a precise BMI calculation</li>
          </ol>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
            <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Important Note</h3>
            <p class="text-blue-800 dark:text-blue-200 text-sm">
              This chart is for reference only. BMI is a screening tool and doesn't account for muscle mass, 
              bone density, or body composition. Always consult with a healthcare provider for personalized health advice.
            </p>
          </div>
        </div>
      </UCard>

      <!-- 快速计算器 -->
      <div class="mb-12">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-calculator" class="w-6 h-6 text-primary" />
              <h2 class="text-2xl font-bold">Quick BMI Calculator</h2>
            </div>
          </template>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- 计算器表单 -->
            <div>
              <UForm :state="form" class="space-y-4" @submit="calculateBMI">
                <!-- 身高输入 -->
                <UFormGroup label="Height" required>
                  <div class="space-y-3">
                    <!-- 公制输入 -->
                    <div v-if="isMetric" class="flex items-center gap-3">
                      <div class="flex-1">
                        <UInput
                          v-model.number="form.heightCm"
                          type="number"
                          placeholder="170"
                          size="lg"
                          :ui="{ 
                            base: 'w-full',
                            wrapper: 'relative',
                            input: 'text-center text-lg font-medium'
                          }"
                        />
                      </div>
                      <div class="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">cm</span>
                      </div>
                    </div>
                    
                    <!-- 英制输入 -->
                    <div v-else class="space-y-3">
                      <div class="flex items-center gap-3">
                        <div class="flex-1">
                          <UInput
                            v-model.number="form.heightFeet"
                            type="number"
                            placeholder="5"
                            size="lg"
                            :ui="{ 
                              base: 'w-full',
                              wrapper: 'relative',
                              input: 'text-center text-lg font-medium'
                            }"
                          />
                        </div>
                        <div class="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">ft</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="flex-1">
                          <UInput
                            v-model.number="form.heightInches"
                            type="number"
                            placeholder="10"
                            size="lg"
                            :ui="{ 
                              base: 'w-full',
                              wrapper: 'relative',
                              input: 'text-center text-lg font-medium'
                            }"
                          />
                        </div>
                        <div class="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </UFormGroup>

                <!-- 体重输入 -->
                <UFormGroup label="Weight" required>
                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <UInput
                        v-model.number="form.weight"
                        type="number"
                        :placeholder="isMetric ? '70' : '150'"
                        size="lg"
                        :ui="{ 
                          base: 'w-full',
                          wrapper: 'relative',
                          input: 'text-center text-lg font-medium'
                        }"
                      />
                    </div>
                    <div class="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {{ isMetric ? 'kg' : 'lbs' }}
                      </span>
                    </div>
                  </div>
                </UFormGroup>

                <!-- 计算按钮 -->
                <div class="pt-4">
                  <UButton
                    type="submit"
                    color="primary"
                    size="xl"
                    block
                    :loading="isCalculating"
                    :disabled="!isFormValid"
                    :ui="{
                      base: 'relative inline-flex items-center justify-center gap-2 w-full',
                      font: 'font-semibold',
                      rounded: 'rounded-lg',
                      padding: 'px-6 py-4',
                      size: {
                        xl: 'text-lg'
                      }
                    }"
                  >
                    <UIcon name="i-heroicons-calculator" class="w-6 h-6" />
                    <span v-if="!isCalculating">Calculate BMI</span>
                    <span v-else>Calculating...</span>
                  </UButton>
                </div>
              </UForm>
            </div>

            <!-- 结果显示 -->
            <div v-if="bmiResult" class="text-center">
              <div class="space-y-4">
                <div class="text-4xl font-bold text-primary">
                  {{ bmiResult.value.toFixed(1) }}
                </div>
                <UBadge
                  :color="bmiResult.category.color"
                  variant="soft"
                  size="lg"
                >
                  {{ bmiResult.category.label }}
                </UBadge>
                <UAlert
                  :color="bmiResult.category.color"
                  variant="soft"
                  :title="bmiResult.category.label"
                  :description="bmiResult.category.description"
                />
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- 快速链接 -->
      <div class="text-center">
        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            to="/"
            color="primary"
            size="lg"
          >
            <UIcon name="i-heroicons-calculator" class="w-5 h-5" />
            Full BMI Calculator
          </UButton>
          <UButton
            to="/about-bmi"
            variant="outline"
            color="primary"
            size="lg"
          >
            <UIcon name="i-heroicons-book-open" class="w-5 h-5" />
            Learn More About BMI
          </UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: 'BMI Chart - Visual Guide to Body Mass Index | BMI Calculator',
  meta: [
    { name: 'description', content: 'Interactive BMI chart with weight ranges for different heights. Complete BMI tables for metric and imperial units. Find your healthy weight range and BMI category instantly.' },
    { name: 'keywords', content: 'BMI chart, BMI table, weight chart, height weight chart, BMI ranges, BMI categories, healthy weight chart, BMI calculator chart, weight range chart, BMI visual guide, body mass index chart, weight management chart, fitness chart, health chart, obesity chart, underweight chart, overweight chart, BMI tool, medical chart' }
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

// 单位切换
const isMetric = ref(true)

// 公制高度数据
const metricHeights = [150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200]

// 英制高度数据
const imperialHeights = [
  "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", 
  "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", 
  "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\""
]

// 当前显示的高度数据
const currentHeights = computed(() => {
  return isMetric.value ? metricHeights : imperialHeights
})

// 计算器相关数据
const isCalculating = ref(false)
const bmiResult = ref(null)

// 表单数据
const form = reactive({
  heightCm: null,
  heightFeet: null,
  heightInches: null,
  weight: null
})

// 计算表单验证
const isFormValid = computed(() => {
  if (isMetric.value) {
    return form.heightCm && form.weight && form.heightCm > 0 && form.weight > 0
  } else {
    return form.heightFeet && form.heightInches && form.weight && 
           form.heightFeet > 0 && form.heightInches >= 0 && form.weight > 0
  }
})

// BMI 计算函数
const calculateBMI = async () => {
  if (!isFormValid.value) return
  
  isCalculating.value = true
  
  try {
    let heightInMeters
    
    if (isMetric.value) {
      heightInMeters = form.heightCm / 100
    } else {
      const totalInches = (form.heightFeet * 12) + form.heightInches
      heightInMeters = totalInches * 0.0254
    }
    
    const weightInKg = isMetric.value ? form.weight : form.weight * 0.453592
    const bmi = weightInKg / (heightInMeters * heightInMeters)
    
    // 确定 BMI 分类
    let category
    if (bmi < 18.5) {
      category = bmiCategories.value[0]
    } else if (bmi < 25) {
      category = bmiCategories.value[1]
    } else if (bmi < 30) {
      category = bmiCategories.value[2]
    } else {
      category = bmiCategories.value[3]
    }
    
    bmiResult.value = {
      value: bmi,
      category
    }
    
  } catch (error) {
    console.error('BMI calculation error:', error)
  } finally {
    isCalculating.value = false
  }
}

// BMI 分类数据
const bmiCategories = computed(() => {
  return bmiData.categories.map(category => ({
    ...category,
    bgColor: getCategoryBgColor(category.color)
  }))
})

// 获取分类背景颜色
const getCategoryBgColor = (color) => {
  const bgColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  }
  return bgColors[color] || 'bg-gray-500'
}

// 计算体重范围
const getWeightRange = (height, bmi, unit) => {
  let heightInMeters
  
  if (unit === 'metric') {
    heightInMeters = height / 100
  } else {
    // 解析英制高度 (如 "5'10\"")
    const match = height.match(/(\d+)'(\d+)"/)
    if (match) {
      const feet = parseInt(match[1])
      const inches = parseInt(match[2])
      heightInMeters = (feet * 12 + inches) * 0.0254
    } else {
      return { min: 0, max: 0 }
    }
  }
  
  const weight = bmi * (heightInMeters * heightInMeters)
  
  if (unit === 'metric') {
    return {
      min: Math.round(weight - 2),
      max: Math.round(weight + 2)
    }
  } else {
    const weightInLbs = weight * 2.20462
    return {
      min: Math.round(weightInLbs - 5),
      max: Math.round(weightInLbs + 5)
    }
  }
}
</script>
