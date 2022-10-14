import { RouteRecordRaw } from 'vue-router';
const Index = () => import('@/views/index.vue')
const baseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      title: 'Index',
    }
  }
];

export default baseRoute;
