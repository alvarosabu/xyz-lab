import { PerspectiveCamera, Camera, OrthographicCamera } from 'three'

import { useWindowSize } from '@vueuse/core'
import { computed, watch } from 'vue'

export enum CameraType {
  Perspective = 'Perspective',
  Orthographic = 'Orthographic',
}

const VERTICAL_FIELD_OF_VIEW = 45
let camera: Camera | PerspectiveCamera | OrthographicCamera

export const useCamera = (
  cameraType = CameraType.Perspective,
  options = { fov: VERTICAL_FIELD_OF_VIEW, near: 0.1, far: 1000 },
) => {
  const { width, height } = useWindowSize()

  const aspectRatio = computed(() => width.value / height.value)

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

  function updateCamera() {
    if (cameraType === CameraType.Perspective) {
      camera.aspect = aspectRatio.value
      camera.updateProjectionMatrix()
    }

    /* console.log('updateCamera')
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix() */
  }

  watch(aspectRatio, updateCamera)

  return {
    camera,
    updateCamera,
  }
}
