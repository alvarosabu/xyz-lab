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
import { Object3D } from 'three'

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
scene.add(ambientLight as Object3D)

const { light: directionalLight, helper: directionalLightHelper } = createLight(
  LightType.DirectionalLight,
  {
    color: '#FCF9D9', // Warm Light
    intensity: 0.5,
  },
  true,
  true,
)
directionalLight.position.set(5, 20, 0)
scene.add(directionalLight)
scene.add(directionalLightHelper)

const rectAreaLight = createLight(LightType.RectAreaLight, {
  color: 'purple',
  intensity: 1,
})

rectAreaLight.position.set(-3, 0, 3)
rectAreaLight.lookAt(0, 0, 0)

scene.add(rectAreaLight)

// Hemisphere light
const { light: hemisphereLight, helper: hemisphereLightHelper } = createLight(
  LightType.HemisphereLight,
  {
    color: 'red',
    groundColor: 'blue',
    intensity: 0.5,
  },
  false,
  true,
)
scene.add(hemisphereLight)
scene.add(hemisphereLightHelper)

// Spot light
const spotLight = createLight(
  LightType.SpotLight,
  {
    color: 'green',
    intensity: 0.8,
    distance: 100,
    angle: Math.PI / 4,
    penumbra: 0.25,
    decay: 1,
  },
  true,
)
spotLight.position.set(0, 2, -8)
scene.add(spotLight)

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({ color: 'teal' }),
)
sphere.castShadow = true
sphere.receiveShadow = true
sphere.position.set(0, 4, 0)
scene.add(sphere)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(2, 0.5, 16, 100),
  new THREE.MeshStandardMaterial({ color: '#5447AA' }),
)
torus.position.set(8, 8, 0)
torus.rotation.set(0, Math.PI / 2, 0)
torus.castShadow = true
scene.add(torus)

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
    min: -100,
    max: 100,
    step: 1,
  })
})

DirectionalLightFolder.addInput(directionalLight, 'intensity', {
  min: 0,
  max: 1,
  step: 0.1,
})

DirectionalLightFolder.addInput(directionalLightHelper, 'visible', {
  label: 'Helper visible',
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
  <canvas ref="experience" class="bg-gray-800"></canvas>
</template>
