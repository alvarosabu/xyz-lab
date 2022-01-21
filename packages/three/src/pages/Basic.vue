<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'
import { CameraType, useCamera, useRenderer, useScene } from '/@/composables'

// Scene
const { scene } = useScene()

const { camera } = useCamera(CameraType.Perspective)

camera.position.set(15, 15, 15)
scene.add(camera)

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 'teal' }),
)

sphere.position.set(0, 4, 0)
scene.add(sphere)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshBasicMaterial({ color: '#444' }),
)

plane.rotation.set(-Math.PI / 2, 0, 0)

scene.add(plane)

// Renderer

const {
  experience,
  initRenderer,
  renderScene,
  updateRenderer,
  updateControls,
} = useRenderer()

const loop = () => {
  // Update renderer

  updateControls()

  renderScene(scene, camera)
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
  loop()
})
</script>
<template>
  <canvas ref="experience"></canvas>
</template>
