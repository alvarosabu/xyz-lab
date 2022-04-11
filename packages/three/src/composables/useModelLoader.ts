import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export enum ModelType {
  GLTF,
  GLB,
}

const gltfLoader = new GLTFLoader()

const MapLoaders = {
  [ModelType.GLTF]: gltfLoader,
  [ModelType.GLB]: gltfLoader,
}

export function useModelLoader() {
  function loadModel(url: string) {
    if (!url) {
      console.error('[useModelLoader] - No url provided')
      return Promise.resolve(null)
    }
    const extension = url.split('.').pop() as unknown
    const loader = MapLoaders[ModelType[extension.toUpperCase()] as ModelType]

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        gltf => resolve(gltf),
        () => {},
        () => {
          reject(new Error('[useModelLoader] - Failed to load model'))
        },
      )
    })
  }

  return {
    loadModel,
  }
}
