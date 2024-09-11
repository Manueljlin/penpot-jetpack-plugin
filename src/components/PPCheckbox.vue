<script setup lang="ts">
const model = defineModel()

const {
  label
} = defineProps<{
  label: string
}>()
</script>


<template>
  <div
    class="checkbox-container"
  >
    <label class="body-small">
      <input
        type="checkbox"
        class="checkbox-input"
        :value="modelValue"
        @click="model = !model"
      />
      {{ label }}
    </label>
  </div>
</template>
