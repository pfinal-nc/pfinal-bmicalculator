<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-calculator" class="w-6 h-6 text-primary" />
        <h2 class="text-xl font-semibold">BMI Calculator</h2>
      </div>
    </template>

    <UForm :state="form" class="space-y-6" @submit="calculateBMI">
      <!-- 单位切换 -->
      <div class="flex justify-center">
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

      <!-- 身高输入 -->
      <UFormGroup label="Height" required>
        <div class="flex gap-2">
          <UInput
            v-if="isMetric"
            v-model.number="form.heightCm"
            type="number"
            placeholder="170"
            :ui="{ base: 'flex-1' }"
          />
          <span v-if="isMetric" class="flex items-center text-sm text-gray-500">cm</span>
          
          <template v-else>
            <UInput
              v-model.number="form.heightFeet"
              type="number"
              placeholder="5"
              :ui="{ base: 'flex-1' }"
            />
            <span class="flex items-center text-sm text-gray-500">ft</span>
            <UInput
              v-model.number="form.heightInches"
              type="number"
              placeholder="10"
              :ui="{ base: 'flex-1' }"
            />
            <span class="flex items-center text-sm text-gray-500">in</span>
          </template>
        </div>
      </UFormGroup>

      <!-- 体重输入 -->
      <UFormGroup label="Weight" required>
        <div class="flex gap-2">
          <UInput
            v-model.number="form.weight"
            type="number"
            :placeholder="isMetric ? '70' : '150'"
            :ui="{ base: 'flex-1' }"
          />
          <span class="flex items-center text-sm text-gray-500">
            {{ isMetric ? 'kg' : 'lbs' }}
          </span>
        </div>
      </UFormGroup>

      <!-- 计算按钮 -->
      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        :loading="isCalculating"
        :disabled="!isFormValid"
      >
        <UIcon name="i-heroicons-calculator" class="w-5 h-5" />
        Calculate BMI
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup>
// 定义 props 和 emits
const emit = defineEmits(['bmi-calculated'])

// 响应式数据
const isMetric = ref(true)
const isCalculating = ref(false)

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
      category = { label: 'Underweight', color: 'blue' }
    } else if (bmi < 25) {
      category = { label: 'Normal weight', color: 'green' }
    } else if (bmi < 30) {
      category = { label: 'Overweight', color: 'yellow' }
    } else {
      category = { label: 'Obese', color: 'red' }
    }
    
    const result = {
      value: bmi,
      category,
      height: isMetric.value ? `${form.heightCm}cm` : `${form.heightFeet}'${form.heightInches}"`,
      weight: isMetric.value ? `${form.weight}kg` : `${form.weight}lbs`
    }
    
    emit('bmi-calculated', result)
    
  } catch (error) {
    console.error('BMI calculation error:', error)
  } finally {
    isCalculating.value = false
  }
}

// 监听单位切换，清空表单
watch(isMetric, () => {
  Object.keys(form).forEach(key => {
    form[key] = null
  })
})
</script>
