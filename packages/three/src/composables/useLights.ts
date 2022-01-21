import { AmbientLight, DirectionalLight, Light } from 'three'
import { reactive } from 'vue'

export enum LightType {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  SpotLight,
}

interface LightOptions {
  color?: string | number
  intensity?: number
  castShadow?: boolean
}

const state = reactive<{
  lights: Array<Light>
}>({
  lights: [],
})

export function useLights() {
  function createLight(
    type = LightType.AmbientLight,
    options: LightOptions = { color: 0xffffff, intensity: 1 },
    castShadow = false,
  ) {
    let light: Light

    switch (type) {
      case LightType.AmbientLight:
        light = new AmbientLight(options.color, options.intensity)
        break

      case LightType.DirectionalLight:
        light = new DirectionalLight(options.color, options.intensity)
        light.shadow.mapSize.set(1024, 1024)
        break

      case LightType.HemisphereLight:
        light = new AmbientLight(options.color, options.intensity)
        break

      case LightType.PointLight:
        light = new AmbientLight(options.color, options.intensity)
        break

      case LightType.SpotLight:
        light = new AmbientLight(options.color, options.intensity)
        break

      default:
        break
    }
    light.castShadow = castShadow
    state.lights.push(light)
    return light
  }

  return {
    lights: state.lights,
    createLight,
  }
}
