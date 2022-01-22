import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  Light,
  HemisphereLight,
  PointLight,
  SpotLight,
  RectAreaLight,
  HemisphereLightHelper,
  PointLightHelper,
} from 'three'
import { reactive } from 'vue'

export enum LightType {
  AmbientLight,
  DirectionalLight,
  RectAreaLight,
  HemisphereLight,
  PointLight,
  SpotLight,
}

export enum LightHelperType {
  DirectionalLightHelper,
  RectAreaLightHelper,
  HemisphereLightHelper,
  PointLightHelper,
  SpotLightHelper,
}

interface LightOptions {
  color?: string | number
  groundColor?: string | number
  intensity?: number
  width?: number
  height?: number
  distance?: number
  angle?: number
  penumbra?: number
  decay?: number
  shadowBias?: number
  shadowRadius?: number
  shadowMapSize?: number
  shadowCameraNear?: number
  shadowCameraFar?: number
  shadowCameraFov?: number
  shadowCameraVisible?: boolean
  shadowCameraLeft?: number
  shadowCameraRight?: number
  shadowCameraTop?: number
  shadowCameraBottom?: number
}

const state = reactive<{
  lights: Array<any>
  helpers: Array<keyof typeof LightHelperType>
}>({
  lights: [],
  helpers: [],
})

export function useLights() {
  function createLight(
    type = LightType.AmbientLight,
    options: LightOptions = { color: 0xffffff, intensity: 1 },
    castShadow = false,
    useHelper = false,
  ): { light: Light; helper: LightHelperType } | Light {
    let light: Light
    let helper: any

    switch (type) {
      case LightType.AmbientLight:
        light = new AmbientLight(options.color, options.intensity)
        break

      case LightType.DirectionalLight:
        light = new DirectionalLight(options.color, options.intensity)
        if (useHelper) {
          helper = new DirectionalLightHelper(light as DirectionalLight, 5)
        }
        light.shadow.mapSize.set(1024, 1024)
        light.shadow.camera.near = options.shadowCameraNear || 0.5
        light.shadow.camera.far = options.shadowCameraFar || 500
        light.shadow.camera.left = options.shadowCameraLeft || -100
        light.shadow.camera.right = options.shadowCameraRight || 100
        light.shadow.camera.top = options.shadowCameraTop || 100
        light.shadow.camera.bottom = options.shadowCameraBottom || -100
        break

      case LightType.RectAreaLight:
        light = new RectAreaLight(options.color, options.intensity)
        break

      case LightType.HemisphereLight:
        light = new HemisphereLight(
          options.color,
          options.groundColor,
          options.intensity,
        )
        if (useHelper) {
          helper = new HemisphereLightHelper(light as HemisphereLight, 15)
        }
        break

      case LightType.PointLight:
        light = new PointLight(
          options.color,
          options.intensity,
          options.distance,
          options.decay,
        )
        if (useHelper) {
          helper = new PointLightHelper(light as PointLight, 5)
        }
        break

      case LightType.SpotLight:
        light = new SpotLight(
          options.color,
          options.intensity,
          options.distance,
          options.angle,
          options.penumbra,
          options.decay,
        )
        break

      default:
        break
    }
    if (castShadow) {
      light.castShadow = castShadow
    }
    state.lights.push(light)

    if (useHelper) {
      state.helpers.push(helper)
      return {
        light,
        helper,
      }
    }

    return light
  }

  return {
    lights: state.lights,
    createLight,
  }
}
