<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'
import {
  CameraType,
  useCamera,
  useRenderer,
  useScene,
  useTweakPane,
} from '/@/composables'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

// Scene
const { scene } = useScene()

const { createCamera } = useCamera()

const camera = createCamera(CameraType.Perspective)

camera.position.set(15, 15, 15)
scene.add(camera)

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  wireframe: false,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(20, 5) },
    uTime: { value: 0 },
  },
})

const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), material)

sphere.position.set(0, 4, 0)
scene.add(sphere)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10), material)

plane.rotation.set(-Math.PI / 2, 0, 0)

scene.add(plane)

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

pane.addInput(material.uniforms.uFrequency.value, 'x', {
  min: 0,
  max: 100,
  step: 0.1,
})

pane.addInput(material.uniforms.uFrequency.value, 'y', {
  min: 0,
  max: 100,
  step: 0.1,
})

pane.addInput(material, 'wireframe')

const clock = new THREE.Clock()
let prevElapsedTime = 0

const loop = () => {
  // Update renderer
  fpsGraph.begin()

  const elapsedTime = clock.getElapsedTime()

  material.uniforms.uTime.value = elapsedTime

  updateControls()

  renderScene(scene, camera)
  fpsGraph.end()

  requestAnimationFrame(loop)
}

onMounted(() => {
  initRenderer(camera, {
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  })

  loop()
  updateRenderer()
})

onBeforeUnmount(() => {
  disposeRenderer()
})
</script>
<template>
  <canvas ref="experience"></canvas>
</template>
