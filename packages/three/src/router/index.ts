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
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
