<template>
  <UContainer class="py-8">
        <!-- Hero Section -->
        <div class="text-center mb-12">
          <div class="flex justify-center mb-6">
            <BMILogo />
          </div>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Free Online BMI Calculator - Calculate Body Mass Index Instantly
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Use our free BMI calculator to calculate your Body Mass Index instantly. Get accurate BMI results, 
            learn about BMI categories, and receive personalized health recommendations. 
            Our BMI tool supports both metric and imperial units for precise calculations.
          </p>
        </div>

    <!-- BMI 计算器区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- BMI 计算器 -->
      <div>
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-calculator" class="w-6 h-6 text-primary" />
              <h2 class="text-xl font-semibold">BMI Calculator</h2>
            </div>
          </template>

          <UForm :state="form" class="space-y-6" @submit="calculateBMI">
            <!-- 单位切换 - 优化版本 -->
            <div class="flex justify-center mb-6">
              <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                <div class="flex items-center gap-4">
                  <!-- 单位标签 -->
                  <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-scale" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Units:</span>
                  </div>
                  
                  <!-- 切换按钮组 -->
                  <div class="flex bg-white dark:bg-gray-700 rounded-lg p-1 shadow-sm">
                    <button
                      @click="isMetric = true"
                      :class="[
                        'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                        isMetric 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      ]"
                    >
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-globe-europe-africa" class="w-4 h-4" />
                        <span>Metric</span>
                        <span class="text-xs opacity-75">(kg, cm)</span>
                      </div>
                    </button>
                    
                    <button
                      @click="isMetric = false"
                      :class="[
                        'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                        !isMetric 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      ]"
                    >
                      <div class="flex items-center gap-2">
                        <UIcon name="i-heroicons-globe-americas" class="w-4 h-4" />
                        <span>Imperial</span>
                        <span class="text-xs opacity-75">(lbs, ft)</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 错误提示 -->
            <UAlert
              v-if="errors.general"
              color="red"
              variant="soft"
              :title="errors.general"
              class="mb-4"
            />

            <!-- 身高输入 -->
            <UFormGroup 
              label="Height" 
              required
              :error="errors.height"
            >
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
                      @blur="validateInput('heightCm', form.heightCm)"
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
                      @blur="validateInput('heightFeet', form.heightFeet)"
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
                      @blur="validateInput('heightInches', form.heightInches)"
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
            <UFormGroup 
              label="Weight" 
              required
              :error="errors.weight"
            >
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
                    @blur="validateInput('weight', form.weight)"
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
                :color="isFormValid ? 'green' : 'gray'"
                size="xl"
                block
                :loading="isCalculating"
                :disabled="!isFormValid"
                :ui="{
                  base: 'relative inline-flex items-center justify-center gap-2 w-full transition-all duration-200',
                  font: 'font-semibold',
                  rounded: 'rounded-lg',
                  padding: 'px-6 py-4',
                  size: {
                    xl: 'text-lg'
                  }
                }"
                class="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <UIcon 
                  :name="isCalculating ? 'i-heroicons-arrow-path' : 'i-heroicons-calculator'" 
                  :class="[
                    'w-6 h-6',
                    isCalculating ? 'animate-spin' : ''
                  ]"
                />
                <span v-if="!isCalculating">
                  {{ isFormValid ? 'Calculate BMI' : 'Fill in all fields' }}
                </span>
                <span v-else>Calculating...</span>
              </UButton>
              
              <!-- 按钮提示 -->
              <div v-if="!isFormValid" class="mt-2 text-center">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Please fill in all required fields to calculate your BMI
                </p>
              </div>
            </div>
          </UForm>
        </UCard>
      </div>

      <!-- 结果展示 -->
      <div>
        <UCard v-if="bmiResult">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-primary" />
              <h3 class="text-lg font-semibold">Your BMI Result</h3>
            </div>
          </template>

          <div class="text-center space-y-4">
            <!-- BMI 数值 -->
            <div class="text-4xl font-bold text-primary">
              {{ bmiResult.value.toFixed(1) }}
            </div>
            
            <!-- BMI 分类 -->
            <UBadge
              :color="bmiResult.category.color"
              variant="soft"
              size="lg"
            >
              {{ bmiResult.category.label }}
            </UBadge>
            
            <!-- 健康建议 -->
            <UAlert
              :color="bmiResult.category.color"
              variant="soft"
              :title="bmiResult.category.label"
              :description="bmiResult.category.description"
            />
          </div>
        </UCard>
      </div>
    </div>

    <!-- BMI 分类表 - 独占一行 -->
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

    <!-- BMI 介绍区域 -->
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 什么是 BMI -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-information-circle" class="w-6 h-6 text-blue-500" />
              <h2 class="text-2xl font-bold">What is BMI?</h2>
            </div>
          </template>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <p>
              Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women. 
              It's a useful screening tool to identify potential weight problems, though it doesn't directly measure body fat.
            </p>
            
            <h3>How is BMI calculated?</h3>
            <p>
              BMI is calculated by dividing your weight in kilograms by your height in meters squared:
            </p>
            <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
              <code class="text-lg font-mono">BMI = weight (kg) / height (m)²</code>
            </div>
          </div>
        </UCard>

        <!-- BMI 局限性 -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-yellow-500" />
              <h2 class="text-2xl font-bold">BMI Limitations</h2>
            </div>
          </template>

          <div class="prose prose-gray dark:prose-invert max-w-none">
            <p>
              While BMI is a useful screening tool, it has several limitations:
            </p>
            
            <ul class="space-y-2">
              <li><strong>Muscle Mass:</strong> Doesn't distinguish between muscle and fat</li>
              <li><strong>Body Composition:</strong> Doesn't account for bone density or water weight</li>
              <li><strong>Age & Sex:</strong> May not be accurate for all demographics</li>
              <li><strong>Fat Distribution:</strong> Doesn't indicate where body fat is located</li>
            </ul>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                <strong>Important:</strong> Always consult with a healthcare provider for a comprehensive health assessment.
              </p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- 快速链接 -->
      <div class="mt-8 text-center">
        <div class="flex flex-wrap justify-center gap-4">
                     <NuxtLink to="/about-bmi" class="block" title="Learn more about BMI calculation and categories">
                       <UButton
                         variant="outline"
                         color="primary"
                         size="lg"
                         block
                         class="max-w-xs"
                       >
                         <UIcon name="i-heroicons-book-open" class="w-4 h-4" />
                         Learn More About BMI
                       </UButton>
                     </NuxtLink>
                     <NuxtLink to="/bmi-chart" class="block" title="View interactive BMI chart and weight ranges">
                       <UButton
                         variant="outline"
                         color="primary"
                         size="lg"
                         block
                         class="max-w-xs"
                       >
                         <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
                         View BMI Chart
                       </UButton>
                     </NuxtLink>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
// 设置页面元数据
useHead({
  title: 'Free BMI Calculator - Calculate Your Body Mass Index Online',
  meta: [
    { name: 'description', content: 'Calculate your BMI instantly with our free online calculator. Get your weight category and health insights in seconds.' },
    { name: 'keywords', content: 'BMI calculator, body mass index, weight calculator, health calculator, BMI chart, free BMI tool, pfnalclub' }
  ]
})

// 响应式数据
const isMetric = ref(true)
const isCalculating = ref(false)
const bmiResult = ref(null)

// 表单数据
const form = reactive({
  heightCm: null,
  heightFeet: null,
  heightInches: null,
  weight: null
})

// 错误状态
const errors = reactive({
  height: '',
  weight: '',
  general: ''
})

// 输入验证规则
const validationRules = {
  heightCm: {
    min: 50,
    max: 272,
    message: 'Height must be between 50cm and 272cm'
  },
  heightFeet: {
    min: 3,
    max: 8,
    message: 'Height must be between 3ft and 8ft'
  },
  heightInches: {
    min: 0,
    max: 11,
    message: 'Inches must be between 0 and 11'
  },
  weight: {
    min: 20,
    max: 300,
    message: 'Weight must be between 20kg and 300kg (44lbs and 660lbs)'
  }
}

// BMI 分类数据
const bmiCategories = ref([
  {
    label: 'Underweight',
    range: 'Below 18.5',
    color: 'blue',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    description: 'You may need to gain weight. Consult a healthcare provider.'
  },
  {
    label: 'Normal weight',
    range: '18.5 - 24.9',
    color: 'green',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    description: 'Great! You have a healthy weight for your height.'
  },
  {
    label: 'Overweight',
    range: '25.0 - 29.9',
    color: 'yellow',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    description: 'Consider losing weight for better health.'
  },
  {
    label: 'Obese',
    range: '30.0 and above',
    color: 'red',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    description: 'Weight loss is recommended. Consult a healthcare provider.'
  }
])

// 输入验证函数
const validateInput = (field, value) => {
  const rule = validationRules[field]
  if (!rule) return true
  
  if (value === null || value === undefined || value === '') {
    return true // 空值不显示错误，只在提交时验证
  }
  
  if (value < rule.min || value > rule.max) {
    return rule.message
  }
  
  return true
}

// 验证所有输入
const validateAllInputs = () => {
  errors.height = ''
  errors.weight = ''
  errors.general = ''
  
  let isValid = true
  
  if (isMetric.value) {
    const heightError = validateInput('heightCm', form.heightCm)
    if (heightError !== true) {
      errors.height = heightError
      isValid = false
    }
  } else {
    const feetError = validateInput('heightFeet', form.heightFeet)
    const inchesError = validateInput('heightInches', form.heightInches)
    if (feetError !== true) {
      errors.height = feetError
      isValid = false
    } else if (inchesError !== true) {
      errors.height = inchesError
      isValid = false
    }
  }
  
  const weightError = validateInput('weight', form.weight)
  if (weightError !== true) {
    errors.weight = weightError
    isValid = false
  }
  
  return isValid
}

// 计算表单验证
const isFormValid = computed(() => {
  if (isMetric.value) {
    return form.heightCm && form.weight && 
           form.heightCm > 0 && form.weight > 0 &&
           validateAllInputs()
  } else {
    return form.heightFeet && form.heightInches && form.weight && 
           form.heightFeet > 0 && form.heightInches >= 0 && form.weight > 0 &&
           validateAllInputs()
  }
})

// BMI 计算函数
const calculateBMI = async () => {
  // 验证输入
  if (!validateAllInputs()) {
    errors.general = 'Please fix the input errors above'
    return
  }
  
  if (!isFormValid.value) {
    errors.general = 'Please fill in all required fields'
    return
  }
  
  isCalculating.value = true
  errors.general = ''
  
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
    
    // 保存到本地存储
    const history = JSON.parse(localStorage.getItem('bmi-history') || '[]')
    history.unshift({
      bmi: bmi.toFixed(1),
      category: category.label,
      date: new Date().toISOString(),
      height: isMetric.value ? `${form.heightCm}cm` : `${form.heightFeet}'${form.heightInches}"`,
      weight: isMetric.value ? `${form.weight}kg` : `${form.weight}lbs`
    })
    localStorage.setItem('bmi-history', JSON.stringify(history.slice(0, 10)))
    
  } catch (error) {
    console.error('BMI calculation error:', error)
    errors.general = 'An error occurred while calculating BMI. Please try again.'
  } finally {
    isCalculating.value = false
  }
}

// 监听单位切换，清空结果
watch(isMetric, () => {
  bmiResult.value = null
})
</script>
