import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
const threeD = () => import('@/views/chart/3d/index.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: Layout,
    meta: { title: '基础设置' },
    children: [
      {
        path: '/chart/3d',
        name: 'threeD',
        component: threeD,
        meta: {
          title: '3D立体相册',
          titleEn: 'threeD',
          keepAlive: true
        }
      }
    ]
  }
]

export default routes;
