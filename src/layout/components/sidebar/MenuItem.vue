<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <svg-icon :icon="icon" />
  <span>{{ title }}</span>
</template>
