<template>
  <div class="flex items-center justify-center">
    <!-- 专业 BMI Logo 占位符 -->
    <div class="relative">
      <!-- 主圆形背景 -->
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
        <!-- 内部设计 -->
        <div class="w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
          <!-- BMI 文字 -->
          <div class="text-center">
            <div class="text-xs font-bold text-blue-600 dark:text-blue-400 leading-tight">BMI</div>
            <div class="text-xs font-bold text-green-600 dark:text-green-400 leading-tight">CALC</div>
          </div>
        </div>
      </div>
      
      <!-- 装饰性元素 -->
      <div class="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
        <UIcon name="i-heroicons-calculator" class="w-3 h-3 text-yellow-800" />
      </div>
      
      <!-- 底部装饰线 -->
      <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
    </div>
  </div>
</template>

<script setup>
// BMI Logo 组件 - 专业的占位符设计
</script>

<style scoped>
/* 添加微妙的动画效果 */
.relative {
  transition: transform 0.2s ease-in-out;
}

.relative:hover {
  transform: scale(1.05);
}
</style>
