<script setup lang="ts">
import type { FromPluginMessageEvent, PokeUIEvent } from './model'
import { onMounted, ref } from 'vue'

const theme = ref<string|null>(null)

onMounted(() => {
  const url = new URL(window.location.href)
  const initialTheme = url.searchParams.get('theme') as string|undefined

  if (initialTheme)
    theme.value = initialTheme

  window.addEventListener("message", (e: MessageEvent<FromPluginMessageEvent>) => {
    console.log(e)
  })
})

const reload = () => window.location.reload()

const poke = () => {
  parent.postMessage({
    type: 'poke',
    content: 'Poking in progress... do not resist'
  } as PokeUIEvent, '*')
}
</script>

<template>
  <div
    style="
      display: flex;
      height: 100%;
      padding: 20px;
      background-color: #ffffff;
    "
    :data-theme="theme"
  >
    <button @click="reload">Reload</button>
    Hello, Penpot! aaaaaa

    <button @click="poke">
      Poke
    </button>
  </div>


</template>
