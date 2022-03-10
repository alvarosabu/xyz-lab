<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import {
  useScene,
  useCamera,
  CameraType,
  useRenderer,
  useTweakPane,
  useAxeHelper,
} from '/@/composables'
import { Clock, RectAreaLight, Fog, Color } from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// Scene
const { scene } = useScene()

// Camera
const { createCamera } = useCamera()
const camera = createCamera(CameraType.Perspective)

const bgColor = new Color('#111')
// Fog
scene.fog = new Fog(bgColor, 0.1, 75)
scene.background = bgColor

// Lights
const rectAreaLight = new RectAreaLight(0xffffff, 0.4, 4, 4)
rectAreaLight.rotation.set(Math.PI / 2, 0, 0)

const reactAreaLightHelper = new RectAreaLightHelper(rectAreaLight, 5)
scene.add(rectAreaLight)

camera.position.set(8, 8, 8)
scene.add(camera)

// Lights

// Model
const gltfLoader = new GLTFLoader()

gltfLoader.load('models/AkuAku.gltf', gltf => {
  /* gltf.scene.scale.set(0.1, 0.1, 0.1) */
  console.log(gltf.scene)
  scene.add(gltf.scene)
})

// Renderer

const {
  experience,
  initRenderer,
  renderScene,
  updateRenderer,
  updateControls,
  disposeRenderer,
} = useRenderer()

const { pane, fpsGraph } = useTweakPane()
useAxeHelper(scene)

const clock = new Clock()

const loop = () => {
  const elapsedTime = clock.getElapsedTime()
  // Update renderer
  fpsGraph.begin()

  updateControls()

  renderScene(scene, camera)
  fpsGraph.end()
  requestAnimationFrame(loop)
}

onMounted(() => {
  initRenderer(
    camera,
    {
      antialias: true,
      preserveDrawingBuffer: true,
    },
    true,
  )
  loop()
  updateRenderer()
})

onBeforeUnmount(() => {
  disposeRenderer()
  pane.dispose()
})
</script>
<template>
  <canvas ref="experience" class="bg-gray-800"></canvas>
</template>
