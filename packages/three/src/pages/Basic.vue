<script setup lang="ts">
import { onMounted, ref, watch, computed, Ref } from 'vue'
import * as THREE from 'three'
/* import { Camera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' */
import { CameraType, useCamera, useRenderer, useScene } from '/@/composables'
/* import { useWindowSize } from '@vueuse/core' */

// Scene
const { scene } = useScene()

const { camera } = useCamera(CameraType.Perspective)

camera.position.set(15, 15, 15)
scene.add(camera)

// Objects
const cube = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 'teal' }),
)

cube.position.set(0, 4, 0)
scene.add(cube)

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
