import { createRouter, createWebHashHistory } from 'vue-router';
import registerRouteGuard from '@/utils/permission';
const Index = () => import('@/views/index.vue')
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: 'Index',
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
// 注册路由守卫
registerRouteGuard(router);
export default router;
