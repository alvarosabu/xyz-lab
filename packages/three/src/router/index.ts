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
]

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
})
