<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import {
  useScene,
  useCamera,
  CameraType,
  useRenderer,
  useTweakPane,
} from '/@/composables'
import {
  Mesh,
  SphereBufferGeometry,
  MeshBasicMaterial,
  PlaneGeometry,
  MeshStandardMaterial,
  DirectionalLight,
  LoadingManager,
  TextureLoader,
  DirectionalLightHelper,
  Clock,
} from 'three'

// Scene
const { scene } = useScene()

// Camera
const { createCamera } = useCamera()
const camera = createCamera(CameraType.Perspective)

camera.position.set(15, 15, 15)
scene.add(camera)

// Lights
const ambientLight = new DirectionalLight(0xffffff, 0.5)

const directionalLight = new DirectionalLight('#FCF9D9', 1)
directionalLight.position.set(-8, 16, 8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.left = -100
directionalLight.shadow.camera.right = 100
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 5)

scene.add(ambientLight, directionalLight)
scene.add(directionalLightHelper)

// Add Texture
const loadingManager = new LoadingManager()

const textureLoader = new TextureLoader(loadingManager)

const grassMaterial = {
  color: textureLoader.load(
    '/textures/stylized-leaves-material/Stylized_Leaves_002_basecolor.jpg',
  ),
  roughness: textureLoader.load(
    '/textures/stylized-leaves-material/Stylized_Leaves_002_roughness.jpg',
  ),
  normal: textureLoader.load(
    '/textures/stylized-leaves-material/Stylized_Leaves_002_normal.jpg',
  ),
  height: textureLoader.load(
    '/textures/stylized-leaves-material/Stylized_Leaves_002_height.png',
  ),
}

const pebblesTextures = {
  color: textureLoader.load('/textures/pebbles/Pebbles_026_basecolor.jpg'),
  roughness: textureLoader.load('/textures/pebbles/Pebbles_026_roughness.jpg'),
  normal: textureLoader.load('/textures/pebbles/Pebbles_026_normal.jpg'),
  height: textureLoader.load('/textures/pebbles/Pebbles_026_height.png'),
}

const standardMaterial = new MeshStandardMaterial({
  map: grassMaterial.color,
  roughnessMap: grassMaterial.roughness,
  normalMap: grassMaterial.normal,
  displacementMap: grassMaterial.height,
})

const sphere = new Mesh(new SphereBufferGeometry(3, 32, 32), standardMaterial)

sphere.position.set(0, 8, 0)
sphere.castShadow = true
sphere.receiveShadow = true
scene.add(sphere)

const pebblesMaterial = new MeshStandardMaterial({
  map: pebblesTextures.color,
  roughnessMap: pebblesTextures.roughness,
  normalMap: pebblesTextures.normal,
  displacementMap: pebblesTextures.height,
})

const plane = new Mesh(new PlaneGeometry(30, 30, 10, 10), pebblesMaterial)

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
  disposeRenderer,
} = useRenderer()

const { pane, fpsGraph } = useTweakPane()

const clock = new Clock()

const loop = () => {
  const elapsedTime = clock.getElapsedTime()
  // Update renderer
  fpsGraph.begin()

  sphere.rotation.y = elapsedTime * 0.6

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
})

onBeforeUnmount(() => {
  disposeRenderer()
  pane.dispose()
})
</script>
<template>
  <canvas ref="experience" class="bg-gray-800"></canvas>
</template>
