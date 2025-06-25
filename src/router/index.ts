import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
// import { env } from '@/config/env';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'FeAsignmentApp',
      component: HomeView 
    }
  ]
});

export default router;
