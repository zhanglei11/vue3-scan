import { RouteRecordRaw } from 'vue-router';
const ERROR403 = () => import('@/views/error/403.vue');
const ERROR404 = () => import('@/views/error/404.vue');
const ERROR500 = () => import('@/views/error/500.vue');
const Helloword = () => import('@/views/plug/helloword.vue')

const baseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/plug',
    meta: {
      title: '/',
      keepAlive: true
    }
  }, {
    path: '/plug',
    name: 'helloword',
    component: Helloword,
    meta: {
      title: 'helloword',
      keepAlive: true
    }
  },

  {
    path: '/403',
    name: 'ERROR403',
    component: ERROR403,
    meta: {
      title: '403',
      keepAlive: true
    }
  },
  {
    path: '/404',
    name: 'ERROR404',
    component: ERROR404,
    meta: {
      title: '404',
      keepAlive: true
    }
  },
  {
    path: '/500',
    name: 'ERROR500',
    component: ERROR500,
    meta: {
      title: '500',
      keepAlive: true
    }
  }
];

export default baseRoute;
