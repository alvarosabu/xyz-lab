<script setup lang="ts">
import { Renderer, Camera, Scene, Sphere, Plane, BasicMaterial } from 'troisjs'

import { onMounted, Ref, ref } from 'vue'
const renderer = ref(null)

function loop() {}
onMounted(() => {
  if (renderer.value) {
    renderer.value.onBeforeRender(loop)
  }
})
</script>
<template>
  <Renderer ref="renderer" orbit-ctrl alpha resize>
    <Camera :position="{ x: 15, y: 15, z: 15 }" />
    <Scene>
      <Sphere
        :position="{ x: 0, y: 4, z: 0 }"
        :radius="2"
        :width-segments="32"
        :height-segments="32"
      >
        <BasicMaterial :color="'teal'" />
      </Sphere>
      <Plane :scale="{ x: 10, y: 10, z: 10 }" :rotation="{ x: -Math.PI / 2 }">
        <BasicMaterial :color="'#444'" />
      </Plane>
    </Scene>
  </Renderer>
</template>
