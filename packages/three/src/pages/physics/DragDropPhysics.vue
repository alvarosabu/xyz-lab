<script setup lang="ts">
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import * as THREE from 'three'
import {
  CameraType,
  useCamera,
  useRenderer,
  useScene,
  useTweakPane,
} from '/@/composables'
import UglyBunny from './uglyBunny'

import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { Color, DirectionalLightHelper } from 'three'
import { useModelLoader } from '/@/composables/useModelLoader'
import * as CANNON from 'cannon-es'
import CannonUtils from './cannonUtils'
import CannonDebugRenderer from './cannonDebugRenderer'

// Physics
const GRAVITY = -9.82
const world = new CANNON.World()
world.gravity.set(0, GRAVITY, 0)

const { pane, fpsGraph } = useTweakPane()

// Scene
const { scene } = useScene()

const { createCamera } = useCamera()

const camera = createCamera(CameraType.Perspective)

camera.position.set(0, 4, 15)
scene.add(camera)

const bgColor = new Color('#111')

scene.background = bgColor

// Lights
const ambientLight = new THREE.AmbientLight('#fff', 1)

const directionalLight = new THREE.DirectionalLight('#FCF9D9', 1)
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

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 5)

scene.add(ambientLight, directionalLight)
scene.add(directionalLightHelper)

// Model
const { loadModel } = useModelLoader()

const uglyBunnyModel = await loadModel(
  'models/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const bunny = UglyBunny(uglyBunnyModel, scene, world)
console.log(bunny)
/* const bunny = bunnyScene.children[0]

const mixer = new THREE.AnimationMixer(bunnyScene)

const actions = animations.map(animation => ({
  action: mixer.clipAction(animation),
  name: animation.name,
}))

const grabbedAction = actions.find(action => action.name === 'Grabbed')

const isDragged = ref(false)

watch(isDragged, isDragged => {
  if (isDragged) {
    grabbedAction.action.play()
  } else {
    grabbedAction.action.stop()
  }
})

const bunnyMesh = bunny.children.find(child => child.name === 'Rabbit')
  .children[0]
const bunnyShape = CannonUtils.CreateTrimesh(bunnyMesh.geometry)

const bunnyBody: CANNON.Body = new CANNON.Body({
  mass: 1,
})

bunny.position.set(0, 8, 0)

bunnyBody.position.copy(bunny.position)

bunnyBody.addShape(bunnyShape)
world.addBody(bunnyBody)

const face = bunny.children.find(child => child.name === 'Face')
face.material.transparent = true

bunny.traverse(child => {
  if (child.isMesh) {
    child.castShadow = true
    child.receiveShadow = true
  }
})
scene.add(bunny) */

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 10, 10),
  new THREE.MeshStandardMaterial({ color: '#E7983B' }),
)

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)

const planeShape = new CANNON.Plane()
const planeBody = new CANNON.Body({ mass: 0 })
planeBody.addShape(planeShape)
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(planeBody)
// Renderer

const {
  experience,
  initRenderer,
  renderScene,
  updateRenderer,
  updateControls,
  disposeRenderer,
} = useRenderer()

const cannonDebugRenderer = new CannonDebugRenderer(scene, world)

const clock = new THREE.Clock()
let oldElapsedTime = 0
const loop = () => {
  // Update renderer
  fpsGraph.begin()

  const elapsedTime = clock.getElapsedTime()
  const delta = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime

  bunny.update(delta)

  /*   cannonDebugRenderer.update()
  if (bunny && !isDragged.value) {
    bunny.position.copy(bunnyBody.position)
    bunny.quaternion.copy(bunnyBody.quaternion)
  }
  if (isDragged.value) {
    bunnyBody.position.copy(bunny.position)
    bunnyBody.quaternion.copy(bunny.quaternion)
  }

  if (mixer !== null) {
    mixer.update(delta)
  } */

  updateControls()
  world.step(1 / 60, delta, 3)

  renderScene(scene, camera)
  fpsGraph.end()
  requestAnimationFrame(loop)
}

watch(experience, value => {
  if (value) {
    try {
      const { renderer, controls } = initRenderer(
        camera,
        {
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        },
        true,
      )

      const dragControls = new DragControls(
        [bunny.model],
        camera,
        experience.value,
      )
      dragControls.transformGroup = true

      dragControls.addEventListener('dragstart', ({ object }) => {
        controls.enabled = false
        bunny.dragBunny()
        world.gravity.set(0, 0, 0)
      })

      dragControls.addEventListener('dragend', something => {
        controls.enabled = true
        bunny.dropBunny()
        world.gravity.set(0, GRAVITY, 0)
      })

      /* controls.enabled = false */

      /* const dragControls = new DragControls([bunny], camera, experience.value)
      dragControls.transformGroup = true

      dragControls.addEventListener('dragstart', ({ object }) => {
        isDragged.value = true
        world.gravity.set(0, 0, 0)
        console.log('dragstart', object)
      })

      dragControls.addEventListener('dragend', something => {
        isDragged.value = false
        world.gravity.set(0, GRAVITY, 0)
        console.log('dragend', something)
      }) */

      loop()
      updateRenderer()
    } catch (error) {
      console.error(error)
    }
  }
})

onBeforeUnmount(() => {
  disposeRenderer()
})
</script>
<template>
  <canvas ref="experience"></canvas>
</template>
