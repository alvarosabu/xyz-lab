import { PerspectiveCamera, Camera, OrthographicCamera } from 'three'

import { useWindowSize } from '@vueuse/core'
import { computed, reactive, watch } from 'vue'

export enum CameraType {
  Perspective = 'Perspective',
  Orthographic = 'Orthographic',
}

export type CameraState = {
  cameras: Array<Camera | PerspectiveCamera | OrthographicCamera>
}

const state = reactive<CameraState>({
  cameras: [],
})

const VERTICAL_FIELD_OF_VIEW = 45
let camera: Camera | PerspectiveCamera | OrthographicCamera

export const useCamera = () => {
  const { width, height } = useWindowSize()

  function createCamera(
    cameraType = CameraType.Perspective,
    options = { fov: VERTICAL_FIELD_OF_VIEW, near: 0.1, far: 1000 },
  ) {
    switch (cameraType) {
      case CameraType.Perspective:
        camera = new PerspectiveCamera(
          options.fov,
          aspectRatio.value,
          options.near,
          options.far,
        )
        break

      default:
        break
    }

    state.cameras.push(camera)
    return camera
  }

  const aspectRatio = computed(() => width.value / height.value)

  function updateCamera() {
    state.cameras.forEach(camera => {
      camera.aspect = aspectRatio.value
      camera.updateProjectionMatrix()
    })
  }

  watch(aspectRatio, updateCamera)

  return {
    cameras: state.cameras,
    camera,
    createCamera,
    updateCamera,
  }
}
