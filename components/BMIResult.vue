<template>
  <UCard v-if="result">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-primary" />
        <h3 class="text-lg font-semibold">Your BMI Result</h3>
      </div>
    </template>

    <div class="text-center space-y-4">
      <!-- BMI 数值 -->
      <div class="text-4xl font-bold text-primary">
        {{ result.value.toFixed(1) }}
      </div>
      
      <!-- BMI 分类 -->
      <UBadge
        :color="result.category.color"
        variant="soft"
        size="lg"
      >
        {{ result.category.label }}
      </UBadge>
      
      <!-- 详细信息 -->
      <div class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <p>Height: {{ result.height }}</p>
        <p>Weight: {{ result.weight }}</p>
      </div>
      
      <!-- 健康建议 -->
      <UAlert
        :color="result.category.color"
        variant="soft"
        :title="result.category.label"
        :description="getCategoryDescription(result.category.label)"
      />
      
      <!-- 操作按钮 -->
      <div class="flex gap-2 justify-center">
        <UButton
          variant="outline"
          size="sm"
          @click="shareResult"
        >
          <UIcon name="i-heroicons-share" class="w-4 h-4" />
          Share
        </UButton>
        <UButton
          variant="outline"
          size="sm"
          @click="saveToHistory"
        >
          <UIcon name="i-heroicons-bookmark" class="w-4 h-4" />
          Save
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup>
// 定义 props
const props = defineProps({
  result: {
    type: Object,
    default: null
  }
})

// 获取分类描述
const getCategoryDescription = (categoryLabel) => {
  const descriptions = {
    'Underweight': 'You may need to gain weight. Consult a healthcare provider for personalized advice.',
    'Normal weight': 'Great! You have a healthy weight for your height. Keep up the good work!',
    'Overweight': 'Consider losing weight for better health outcomes. Focus on a balanced diet and regular exercise.',
    'Obese': 'Weight loss is recommended. Consult a healthcare provider for a comprehensive plan.'
  }
  return descriptions[categoryLabel] || 'Please consult with a healthcare provider for personalized advice.'
}

// 分享结果
const shareResult = async () => {
  if (!props.result) return
  
  const shareText = `My BMI is ${props.result.value.toFixed(1)} (${props.result.category.label}). Calculate yours at ${window.location.origin}`
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My BMI Result',
        text: shareText,
        url: window.location.origin
      })
    } catch (error) {
      console.log('Share cancelled')
    }
  } else {
    // 复制到剪贴板
    await navigator.clipboard.writeText(shareText)
    // 这里可以添加一个 toast 通知
  }
}

// 保存到历史记录
const saveToHistory = () => {
  if (!props.result) return
  
  const history = JSON.parse(localStorage.getItem('bmi-history') || '[]')
  history.unshift({
    bmi: props.result.value.toFixed(1),
    category: props.result.category.label,
    date: new Date().toISOString(),
    height: props.result.height,
    weight: props.result.weight
  })
  
  // 只保留最近 10 条记录
  localStorage.setItem('bmi-history', JSON.stringify(history.slice(0, 10)))
  
  // 这里可以添加一个 toast 通知
}
</script>
