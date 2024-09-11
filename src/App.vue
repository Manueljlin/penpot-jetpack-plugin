<script setup lang="ts">
import { PenpotShape } from '@penpot/plugin-types';
import PPButton from './components/PPButton.vue'
import PPPreviewer from './components/PPPreviewer.vue';
import { usePenpot } from './UsePenpot'
import PPCheckbox from './components/PPCheckbox.vue';

const {
  theme,
  colors,
  contentRawSvg,
  isLoading,
  config
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
    <div
      style="
        display: grid;
        grid-template-columns: 1fr 1fr;
      "
    >
      <div
        v-for="_color in colors"
        :style="{
          backgroundColor: _color.color,
        }"
        style="
          color: white;
          padding: 12px;
        "
      >
        {{ _color.name }}
      </div>
    </div>

    {{
      isLoading ? 'Loading...' : ''
    }}

    <PPPreviewer
      v-for="svg in contentRawSvg"
      :rawSvg="svg"
    />

    <PPCheckbox
      label="Multipass"
      v-model="config.multipass"
    />
    <PPCheckbox
      label="Prettify"
      v-model="config.prettify"
    />
    <PPCheckbox
      label="Define library colors"
      v-model="config.defineLibColors"
    />

    <PPButton
      @click="reload"
      appearance="primary"
      variant="destructive"
    >
      debug reload
    </PPButton>
    <PPButton
      appearance="primary"
    >
      export
    </PPButton>
  </div>


</template>
