import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Landing/index.vue')
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('@/views/Editor/index.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/Landing/index.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/views/Landing/index.vue')
    }
  ]
})

export default router
