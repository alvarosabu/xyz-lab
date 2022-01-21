<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import {
  CameraType,
  LightType,
  useCamera,
  useLights,
  useRenderer,
  useScene,
  useTweakPane,
} from '/@/composables'

// Scene
const { scene } = useScene()

// Camera
const { createCamera } = useCamera()
const camera = createCamera(CameraType.Perspective)

camera.position.set(15, 15, 15)
scene.add(camera)

// Lights
const { createLight } = useLights()

const ambientLight = createLight(LightType.AmbientLight, { color: '#fff' })
scene.add(ambientLight)

const directionalLight = createLight(
  LightType.DirectionalLight,
  {
    color: '#fff',
  },
  true,
)
directionalLight.position.set(5, 10, 0)
scene.add(directionalLight)

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({ color: 'teal' }),
)
sphere.castShadow = true
sphere.position.set(0, 4, 0)
scene.add(sphere)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30, 10, 10),
  new THREE.MeshStandardMaterial({ color: '#444' }),
)

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)

// Renderer

const {
  experience,
  initRenderer,
  renderScene,
  updateRenderer,
  updateControls,
} = useRenderer()

const { pane, fpsGraph } = useTweakPane()

console.log(Object.entries(sphere.position))

const sphereFolder = pane.addFolder({
  title: 'Sphere',
})
Object.keys(sphere.position).forEach(key => {
  sphereFolder.addInput(sphere.position, key as string, {
    min: -10,
    max: 10,
    step: 0.1,
  })
})

const DirectionalLightFolder = pane.addFolder({
  title: 'Directional Light',
})

Object.keys(directionalLight.position).forEach(key => {
  DirectionalLightFolder.addInput(directionalLight.position, key as string, {
    min: -10,
    max: 10,
    step: 0.1,
  })
})

const loop = () => {
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
      alpha: true,
      preserveDrawingBuffer: true,
    },
    true,
  )

  loop()
  updateRenderer()
  loop()
})
</script>
<template>
  <canvas ref="experience"></canvas>
</template>
