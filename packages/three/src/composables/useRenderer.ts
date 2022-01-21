import { ref, watch, computed, Ref } from 'vue'
import { Camera, Scene, WebGLRenderer, WebGLRendererParameters } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { useWindowSize } from '@vueuse/core'

const experience = ref(null)
const renderer: Ref<WebGLRenderer | null> = ref(null)
const controls: Ref<OrbitControls | null> = ref(null)

export const useRenderer = () => {
  const { width, height } = useWindowSize()
  const aspectRatio = computed(() => width.value / height.value)

  watch(aspectRatio, updateRenderer)

  function initRenderer(
    camera: Camera,
    options: Partial<WebGLRendererParameters>,
  ) {
    if (experience.value) {
      renderer.value = new WebGLRenderer({
        canvas: experience.value,
        ...options,
      })
      controls.value = new OrbitControls(camera, renderer.value.domElement)
      controls.value.enableDamping = true
    }
  }

  function updateRenderer() {
    if (renderer.value) {
      renderer.value.setSize(width.value, height.value)
      renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
  }

  function renderScene(scene: Scene, camera: THREE.Camera) {
    if (renderer.value) {
      renderer.value.render(scene, camera)
    }
  }

  function updateControls() {
    if (controls.value) {
      controls.value.update()
    }
  }

  return {
    experience,
    aspectRatio,
    updateRenderer,
    initRenderer,
    renderer,
    renderScene,
    controls,
    updateControls,
  }
}
