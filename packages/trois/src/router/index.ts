import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('/@/pages/Index.vue'),
  },
  {
    path: '/basic',
    name: 'Basic Scene',
    component: () => import('/@/pages/Basic.vue'),
    meta: {
      media: 'basic-scene.png',
      description:
        'Basic TroisJS Scene with a Geometry, a Plane, Orbit Controls',
      tags: [],
    },
  },
  {
    path: '/lights',
    name: 'Lights',
    component: () => import('/@/pages/Lights.vue'),
    meta: {
      media: 'lights.png',
      description: 'Lights in TroisJS',
      tags: ['ambient', 'directional', 'hemisphere', 'point', 'spot'],
    },
  },
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
