<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      <li>
        <NuxtLink 
          to="/" 
          class="hover:text-primary transition-colors duration-200"
          title="BMI Calculator Home"
        >
          <UIcon name="i-heroicons-home" class="w-4 h-4" />
          <span class="sr-only">Home</span>
        </NuxtLink>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 mx-2" />
        <NuxtLink 
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="hover:text-primary transition-colors duration-200"
          :title="item.title"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="text-gray-900 dark:text-white font-medium">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>
