import * as THREE from 'three'
import { Scene } from 'three'

export function useAxeHelper(scene: Scene) {
  const axesHelper = new THREE.AxesHelper()

  scene.add(axesHelper)

  return {
    axesHelper,
  }
}
