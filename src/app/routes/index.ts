import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'FeAsignmentApp',
      component: () => import('../../pages/home/ui/Home.vue')
    }
  ]
});

export default router;
