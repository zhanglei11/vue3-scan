import { RouteRecordRaw } from 'vue-router';
const Helloword = () => import('@/views/helloword.vue')
const baseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'helloword',
    component: Helloword,
    meta: {
      title: 'helloword',
    }
  }
];

export default baseRoute;
