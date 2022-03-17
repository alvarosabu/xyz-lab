<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

import {
  CameraType,
  useCamera,
  useRenderer,
  useScene,
  useTweakPane,
} from '/@/composables'
import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  sRGBEncoding,
  TextureLoader,
} from 'three'

import FireFliesVertex from './shaders/fireflies/vertex.glsl'
import FireFliesFragment from './shaders/fireflies/fragment.glsl'
import PortalVertex from './shaders/portal/vertex.glsl'
import PortalFragment from './shaders/portal/fragment.glsl'
//

const debugObject = {
  clearColor: '#201919',
  portalColorStart: '#f2e1c7',
  portalColorEnd: '#faf8db',
}

// Scene
const { scene } = useScene()

const { createCamera } = useCamera()

const camera = createCamera(CameraType.Perspective)

camera.position.set(5, 5, 5)
scene.add(camera)

/**
 * Loaders
 */

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// Texture Loader
const bakedTexture = new TextureLoader().load('/models/portal/baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = sRGBEncoding

/*
 * Materials
 */
// Baked material
const bakedMaterial = new MeshBasicMaterial({
  map: bakedTexture,
  side: THREE.DoubleSide,
})

const portalLightMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
    uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) },
  },
  vertexShader: PortalVertex,
  fragmentShader: PortalFragment,
  side: THREE.DoubleSide,
})

/**
 * Model
 */
gltfLoader.load('/models/portal/portal.glb', gltf => {
  console.log(gltf.scene)
  const bakedMesh = gltf.scene.children.find(child => child.name === 'baked')
  ;(bakedMesh as Mesh).material = bakedMaterial
  const portalCircle = gltf.scene.children.find(
    child => child.name === 'portalCircle',
  )
  ;(portalCircle as Mesh).material = portalLightMaterial
  console.log(bakedMesh)
  scene.add(gltf.scene)
})

/*
 * Fireflies
 */
const firefliesGeometry = new BufferGeometry()
const firefliesCount = 30
const firefliesPosition = new Float32Array(firefliesCount * 3)
const firefliesScale = new Float32Array(firefliesCount)

for (let i = 0; i < firefliesCount; i++) {
  firefliesPosition[i * 3 + 0] = (Math.random() - 0.5) * 4
  firefliesPosition[i * 3 + 1] = Math.random() * 1.5
  firefliesPosition[i * 3 + 2] = (Math.random() - 0.5) * 4

  firefliesScale[i] = Math.random()
}

firefliesGeometry.setAttribute(
  'position',
  new BufferAttribute(firefliesPosition, 3),
)

firefliesGeometry.setAttribute('aScale', new BufferAttribute(firefliesScale, 1))

const firefliesMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: {
      value: Math.min(window.devicePixelRatio, 2),
    },
    uSize: {
      value: 200,
    },
  },
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  vertexShader: FireFliesVertex,
  fragmentShader: FireFliesFragment,
  transparent: true,
})

const fireflies = new Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

const {
  experience,
  initRenderer,
  renderScene,
  renderer,
  updateRenderer,
  updateControls,
  disposeRenderer,
  setClearColor,
} = useRenderer()

const { pane, fpsGraph } = useTweakPane()

pane.addInput(debugObject, 'clearColor').on('change', ({ value }) => {
  setClearColor(value)
})

const firefliesCtrls = pane.addFolder({ title: 'Fireflies' })
firefliesCtrls
  .addInput(firefliesMaterial.uniforms.uSize, 'value', {
    label: 'size',
    min: 0,
    max: 400,
    step: 1,
  })
  .on('change', ({ value }) => {
    firefliesMaterial.uniforms.uSize.value = value
  })

const portalCtrls = pane.addFolder({ title: 'Portal' })
portalCtrls
  .addInput(debugObject, 'portalColorStart', {
    label: 'color start',
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on('change', ({ value }) => {
    portalLightMaterial.uniforms.uColorStart.value.set(value)
  })
portalCtrls
  .addInput(debugObject, 'portalColorEnd', {
    label: 'color end',
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on('change', ({ value }) => {
    portalLightMaterial.uniforms.uColorEnd.value.set(value)
  })

const clock = new THREE.Clock()

const loop = () => {
  // Update renderer

  fpsGraph.begin()

  const elapsedTime = clock.getElapsedTime()

  firefliesMaterial.uniforms.uTime.value = elapsedTime
  portalLightMaterial.uniforms.uTime.value = elapsedTime

  updateControls()

  renderScene(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

onMounted(() => {
  initRenderer(camera, {
    antialias: true,
    preserveDrawingBuffer: true,
    alpha: true,
  })

  loop()
  updateRenderer()
  setClearColor(debugObject.clearColor)
})

onBeforeUnmount(() => {
  disposeRenderer()
  pane.dispose()
})
</script>
<template>
  <canvas ref="experience"></canvas>
</template>
