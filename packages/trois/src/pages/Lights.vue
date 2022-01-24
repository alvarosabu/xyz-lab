<script setup lang="ts">
import { Vector3 } from 'three'
import {
  Renderer,
  Camera,
  Scene,
  Sphere,
  Torus,
  Plane,
  StandardMaterial,
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  RectAreaLight,
  SpotLight,
} from 'troisjs'

import { onMounted, Ref, ref } from 'vue'
import { useTweakPane } from '/@/composables'
const renderer = ref(null)
const directionalLight = ref(null)
const sphere = ref(null)
const torus = ref(null)
const { pane, fpsGraph } = useTweakPane()

const params = {
  directionalLightPosition: new Vector3(5, 20, 0),
  spherePosition: new Vector3(0, 4, 0),
}

let consoleFlag = true
function loop() {
  fpsGraph.begin()
  if (directionalLight.value) {
    directionalLight.value.light.position.copy(params.directionalLightPosition)
  }
  if (sphere.value) {
    sphere.value.mesh.position.copy(params.spherePosition)
  }
  /* directionalLight.value.position.copy(params.directionalLightPosition) */

  fpsGraph.end()
}

onMounted(() => {
  if (renderer.value) {
    renderer.value.onBeforeRender(loop)

    const sphereFolder = pane.addFolder({
      title: 'Sphere',
    })

    Object.keys(params.spherePosition).forEach(key => {
      sphereFolder.addInput(params.spherePosition, key as string, {
        min: -10,
        max: 10,
        step: 0.1,
      })
    })

    const DirectionalLightFolder = pane.addFolder({
      title: 'Directional Light',
    })

    Object.keys(params.directionalLightPosition).forEach(key => {
      DirectionalLightFolder.addInput(
        params.directionalLightPosition,
        key as keyof Vector3,
        {
          min: -100,
          max: 100,
          step: 1,
        },
      )
    })
  }
})
</script>
<template>
  <Renderer ref="renderer" orbit-ctrl alpha resize shadow>
    <Camera :position="{ x: 15, y: 15, z: 15 }" />
    <Scene background="#222">
      <AmbientLight color="#fff" />
      <DirectionalLight
        ref="directionalLight"
        color="#FCF9D9"
        :intensity="0.5"
        cast-shadow
        :position="{ x: 5, y: 20, z: 0 }"
        :shadow-map-size="{ width: 1024, height: 1024 }"
        :shadow-camera="{
          left: -100,
          right: 100,
          top: 100,
          bottom: -100,
          near: 0.5,
          far: 500,
        }"
      />
      <HemisphereLight color="red" groundColor="blue" :intensity="0.5" />
      <RectAreaLight
        color="purple"
        :position="{ x: -3, y: 0, z: 3 }"
        :look-at="{ x: 0, y: 0, z: 0 }"
      />
      <SpotLight
        color="green"
        :intensity="0.8"
        cast-shadow
        :position="{ x: 0, y: 2, z: -8 }"
        :distance="100"
        :angle="Math.PI / 4"
        :penumbra="0.25"
        :decay="1"
      />
      <Sphere
        ref="sphere"
        :position="{ x: 0, y: 4, z: 0 }"
        :radius="2"
        :width-segments="32"
        :height-segments="32"
        receive-shadow
        cast-shadow
      >
        <StandardMaterial :color="'teal'" />
      </Sphere>
      <Torus
        ref="torus"
        :radius="2"
        :tube="0.5"
        :radial-segments="16"
        :tubular-segments="100"
        :position="{ x: 8, y: 8, z: 0 }"
        :rotation="{ x: 0, y: -Math.PI / 2, z: 0 }"
        cast-shadow
      >
        <StandardMaterial color="#5447AA" />
      </Torus>
      <Plane
        :width="30"
        :height="30"
        :rotation="{ x: -Math.PI / 2 }"
        receive-shadow
      >
        <StandardMaterial :color="'#444'" />
      </Plane>
    </Scene>
  </Renderer>
</template>
