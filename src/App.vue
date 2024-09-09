<script setup lang="ts">
import PPButton from './components/PPButton.vue'
import { FromPluginMessageEvent } from './model';
import { usePenpot } from './UsePenpot'

const {
  theme
} = usePenpot()

const reload = () => window.location.reload()
</script>

<template>
  <div
    style="
      padding-top: 24px;
      display: flex;
      flex-flow: column;
      /* background-color: var(--db-primary); */
    "
    :data-theme="theme"
  >

    <PPButton
      @click="reload"
      appearance="primary"
      variant="destructive"
    >
      debug reload
    </PPButton>
  </div>


</template>
