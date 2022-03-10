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
import { BufferGeometry, Points, PointsMaterial } from 'three'
import { parseNumber } from '@tweakpane/core'

const params = {
  count: 10000,
  size: 0.02,
  amplitude: 0.5,
  speed: Math.PI * 4,
  phase: 0,
  insideColor: '#27254c',
  outsideColor: '#1b3984',
}
// Scene
const { scene } = useScene()

const { createCamera } = useCamera()

const camera = createCamera(CameraType.Perspective)

camera.position.set(5, 5, 5)
scene.add(camera)

// Material

// Points
let particles: Points | null = null
let geometry: BufferGeometry | null = null
let material: PointsMaterial | null = null

function generateParticles() {
  if (particles !== null) {
    geometry?.dispose()
    material?.dispose()
    scene.remove(particles)
  }
  geometry = new THREE.BufferGeometry()

  const colorInside = new THREE.Color(params.insideColor)
  const colorOutside = new THREE.Color(params.outsideColor)

  material = new THREE.PointsMaterial({
    size: params.size,
    color: 0xffffff,
    vertexColors: true,
  })
  material.size = params.size
  material.sizeAttenuation = true

  const positions = new Float32Array(params.count * 3) // Multiply by 3 because each position is composed of 3 values (x, y, z)
  const colors = new Float32Array(params.count * 3)

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 2 // x
    positions[i3 + 1] =
      params.amplitude * Math.sin(positions[i3] * params.speed + params.phase) // y
    positions[i3 + 2] = (Math.random() - 0.5) * 2 // z

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, positions[i3 + 1] / params.amplitude)

    colors[i3 + 0] = mixedColor.r // R
    colors[i3 + 1] = mixedColor.g // G
    colors[i3 + 2] = mixedColor.b // B
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  particles = new THREE.Points(geometry, material)
  scene.add(particles)
}

generateParticles()
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

pane
  .addInput(params, 'count', {
    min: 0,
    max: 10000,
    step: 1,
  })
  .on('change', generateParticles)

pane
  .addInput(params, 'size', {
    min: 0,
    max: 0.5,
    step: 0.01,
  })
  .on('change', generateParticles)

pane
  .addInput(params, 'amplitude', {
    min: 0,
    max: 10,
    step: 0.1,
  })
  .on('change', generateParticles)

pane
  .addInput(params, 'speed', {
    min: 0,
    max: 40,
    step: 0.1,
  })
  .on('change', generateParticles)

pane
  .addInput(params, 'phase', {
    min: 0,
    max: 10,
    step: 0.1,
  })
  .on('change', generateParticles)

pane.addInput(params, 'insideColor').on('change', generateParticles)
pane.addInput(params, 'outsideColor').on('change', generateParticles)

const clock = new THREE.Clock()

const loop = () => {
  // Update renderer

  fpsGraph.begin()

  const elapsedTime = clock.getElapsedTime()

  if (geometry) {
    for (let i = 0; i < params.count; i++) {
      let i3 = i * 3

      const x = geometry.attributes.position.array[i3]
      /* geometry.attributes.position.array[i3 + 1] = Math.pow(x, 2) */
      geometry.attributes.position.array[i3 + 1] =
        params.amplitude *
        Math.sin(x * params.speed + params.phase - elapsedTime)
    }
    geometry.attributes.position.needsUpdate = true
  }

  updateControls()

  renderScene(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

onMounted(() => {
  initRenderer(camera, {
    antialias: true,
    preserveDrawingBuffer: true,
  })

  loop()
  updateRenderer()
})

onBeforeUnmount(() => {
  disposeRenderer()
  pane.dispose()
})
</script>
<template>
  <canvas ref="experience"></canvas>
</template>
