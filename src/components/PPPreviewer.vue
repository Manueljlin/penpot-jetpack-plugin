<script setup lang="ts">
import { computed, useId } from 'vue'

const { rawSvg } = defineProps<{
  rawSvg: string
}>()


const adaptedSvg = computed(() => {
  const uuid = useId()
  const parsedSvg: SVGElement = new DOMParser()
    .parseFromString(rawSvg, 'image/svg+xml')
    .documentElement as unknown as SVGElement // lol


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // change from width/height to viewBox
  // (this way, the entire icon can scale in the preview)

  const width  = parsedSvg.getAttribute('width')
  const height = parsedSvg.getAttribute('height')

  parsedSvg.removeAttribute('width')
  parsedSvg.removeAttribute('height')

  if (parsedSvg.getAttribute('viewBox') == null)
    parsedSvg.setAttribute('viewBox', `0 0 ${width} ${height}`)


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // concat uuid to all ids
  // (this is because the svg ids leak into the entire plugin page, so if there
  // are any icons with gradients that have already been optimized to #a, #b and
  // so on, it'll get a mixed preview)

  const defs: SVGDefsElement | null = parsedSvg.querySelector('defs')
  if (defs != null) Array.from(defs.children).forEach(_child => {
    if (_child.tagName == 'STYLE') return
    const oldId = _child.getAttribute('id')
    if (oldId == null) return

    _child.setAttribute('id', uuid + oldId)
  })

  return new XMLSerializer()
    .serializeToString(parsedSvg)
})
</script>

<template>
  <div
    style="
      display: flex;
      flex: 1;
      flex-flow: column;
    "
  >
    <div v-html="adaptedSvg" />
  </div>
</template>
