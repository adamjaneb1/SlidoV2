import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/LandingPage.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('@/views/Lab.vue')
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/LandingPage.vue') // Temporary
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/views/LandingPage.vue') // Temporary
    }
  ]
})

export default router
