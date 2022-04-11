import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('/@/pages/Index.vue'),
  },
  {
    path: '/basic',
    name: 'Basic Scene',
    component: () => import('/@/pages/Basic.vue'),
    meta: {
      media: 'basic-scene.png',
      description:
        'Basic ThreeJS Scene with a Geometry, a Plane, Orbit Controls',
      tags: [],
    },
  },
  {
    path: '/lights',
    name: 'Lights',
    component: () => import('/@/pages/Lights.vue'),
    meta: {
      media: 'lights.png',
      description: 'Lights and casting shadows in ThreeJS',
      tags: [
        'ambient',
        'directional',
        'hemisphere',
        'spot',
        'helpers',
        'shadow',
      ],
    },
  },
  {
    path: '/shader',
    name: 'Shader',
    component: () => import('/@/pages/shaders/basic/ShadersBasic.vue'),
    meta: {
      media: 'shader.png',
      description:
        'Add a custom shader to your scene using glsl vertex and fragment shaders',
      tags: ['shader', 'glsl', 'material', 'procedural'],
    },
  },
  {
    path: '/textures',
    name: 'Textures',
    component: () => import('/@/pages/textures/basic/TexturesBasic.vue'),
    meta: {
      media: 'textures.png',
      description:
        'Add a custom shader to your scene using glsl vertex and fragment shaders',
      tags: ['textures', 'displacementMap', 'normalMap', 'roughnessMap'],
    },
  },
  {
    path: '/gltf-loader',
    name: 'GLTF Loader',
    component: () => import('/@/pages/models/GltfLoader.vue'),
    meta: {
      media: 'gltf-loader.png',
      description: 'Load a glTF model using the GLTFLoader',
      tags: ['gltf', 'loader', 'model'],
    },
  },
  {
    path: '/particles',
    name: 'Particles',
    component: () => import('/@/pages/particles/basic/ParticlesBasic.vue'),
    meta: {
      media: 'particles.png',
      description: 'Create a particle system using points material',
      tags: ['particles', 'points', 'pointsMaterial'],
    },
  },
  {
    path: '/portal-journey',
    name: 'Portal Journey',
    component: () => import('/@/pages/portal-journey/PortalJourney.vue'),
    meta: {
      media: 'portal-journey.png',
      description:
        'Create a portal scene with Blender 3.0 and baking technique',
      tags: ['blender', 'gltf', 'baking'],
    },
  },
  {
    path: '/drag-drop-physics',
    name: 'Drag N Drop Physics',
    component: () => import('/@/pages/physics/DragDropPhysics.vue'),
    meta: {
      media: 'portal-journey.png',
      description:
        'Scene with physics using drag and drop physics with CannonJS',
      tags: ['physics', 'gltf', 'drag', 'cannonjs'],
    },
  },
  {
    path: '/gltf-animations',
    name: 'Gltf animations',
    component: () => import('/@/pages/models/GltfAnimations.vue'),
    meta: {
      media: 'gltf-animations.png',
      description:
        'Gltf animations using ThreeJS AnimationMixer and AnimationClip',
      tags: ['gltf', 'animations'],
    },
  },
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
