import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
const Helloword = () => import('@/views/plug/helloword.vue')
// const QueryStringDemo = () => import('@/views/plug/query-string-demo.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: Layout,
    meta: { title: '基础功能' },
    children: [
      {
        path: '/plug/helloword',
        name: 'helloword',
        component: Helloword,
        meta: {
          title: 'helloword',
          titleEn: 'helloword',
          keepAlive: true
        }
      },
      // {
      //   path: '/plug/query-string-demo',
      //   name: 'QueryStringDemo',
      //   component: QueryStringDemo,
      //   meta: {
      //     title: 'QueryStringDemo',
      //     titleEn: 'QueryStringDemo',
      //     keepAlive: true
      //   }
      // }
    ]
  }
]

export default routes;
