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
import {
  Clock,
  RectAreaLight,
  Fog,
  Color,
  AmbientLight,
  DirectionalLight,
  AnimationMixer,
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
} from 'three'
import { useModelLoader } from '/@/composables/useModelLoader'

// Scene
const { scene } = useScene()

// Camera
const { createCamera } = useCamera()
const camera = createCamera(CameraType.Perspective)
camera.position.set(0, 4, 15)
scene.add(camera)

// Fog
const bgColor = new Color('#111')
/* scene.fog = new Fog(bgColor, 0.1, 75) */
scene.background = bgColor

// Lights
const ambientLight = new AmbientLight('#fff', 1)

const directionalLight = new DirectionalLight('#FCF9D9', 1)
directionalLight.position.set(5, 5, 0)
directionalLight.lookAt(0, 0, 0)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 500
directionalLight.shadow.camera.left = -100
directionalLight.shadow.camera.right = 100
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100
directionalLight.shadow.normalBias = 0.8

scene.add(ambientLight, directionalLight)
// Lights

// Model
const { loadModel } = useModelLoader()

const { scene: bunnyScene, animations } = await loadModel(
  'models/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const bunny = bunnyScene.children[0]
bunny.position.set(0, 0, 0)

const face = bunny.children.find(child => child.name === 'Face')
face.material.transparent = true
console.log(face)

bunny.traverse(child => {
  if (child.isMesh) {
    child.castShadow = true
    child.receiveShadow = true
  }
})
scene.add(bunny)

const mixer = new AnimationMixer(scene)

const actions = animations.reduce((prev, animation) => {
  prev[animation.name.toLowerCase()] = mixer.clipAction(animation)
  return prev
}, {})

const plane = new Mesh(
  new PlaneGeometry(20, 20, 10, 10),
  new MeshStandardMaterial({ color: '#E7983B' }),
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
  disposeRenderer,
} = useRenderer()

const { pane, fpsGraph } = useTweakPane()
useAxeHelper(scene)

let currentAction = actions['0tpose']
currentAction.play()

pane
  .addBlade({
    view: 'list',
    label: 'animations',
    options: Object.keys(actions).map(name => ({
      text: name,
      value: name,
    })),
    value: '0tpose',
  })
  .on('change', ({ value }) => {
    if (currentAction) {
      currentAction.stop()
    }

    currentAction = actions[value.toLowerCase()]

    currentAction.play()
  })

const clock = new Clock()
let oldElapsedTime = 0

const loop = () => {
  // Update renderer
  fpsGraph.begin()

  const elapsedTime = clock.getElapsedTime()
  const delta = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  updateControls()

  if (mixer !== null) {
    mixer.update(delta)
  }

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
