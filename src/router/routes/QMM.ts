import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
const procedure = () => import('@/views/QMM/basic/procedure/index.vue');
const functionLocal = () => import('@/views/QMM/basic/device/index.vue');
const tankList = () => import('@/views/QMM/basic/tankList/index.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: Layout,
    meta: { title: '基础设置' },
    children: [
      {
        path: '/QMM/basic/procedure',
        name: 'procedure',
        component: procedure,
        meta: {
          title: '工序设置',
          titleEn: 'procedure',
          keepAlive: true
        }
      },
      {
        path: '/QMM/basic/device',
        name: 'functionLocal',
        component: functionLocal,
        meta: {
          title: '设备清单',
          titleEn: 'functional location',
          keepAlive: true
        }
      },
      {
        path: '/QMM/basic/tankList',
        name: 'tankList',
        component: tankList,
        meta: {
          title: '水箱清单',
          titleEn: 'tank List',
          keepAlive: true
        }
      }
    ]
  }
];

export default routes;
