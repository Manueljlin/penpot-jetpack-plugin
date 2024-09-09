<script setup lang="ts">
// see https://penpot-plugins-styles.pages.dev/

const {
  appearance = 'secondary',
  variant,
  disabled = false
} = defineProps<{
  appearance?:
    | 'primary'
    | 'secondary'

  variant?:
    | 'destructive'

  disabled?: boolean
}>()
</script>

<template>
  <button
    type="button"
    :data-appearance="appearance"
    :data-disabled="disabled"
    :data-variant="variant"
  >
    <slot />
  </button>
</template>
