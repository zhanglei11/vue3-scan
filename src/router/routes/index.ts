import { RouteRecordRaw } from 'vue-router';
import baseRoutes from './base'; //基础
import pagesRoutes from '@/pages/router'; //基础
import QMM from './QMM'; //基础
import Chart from './chart' //基础
import plug from './plug' //基础

const routes: RouteRecordRaw[] = [...baseRoutes, ...pagesRoutes, ...QMM, ...Chart, ...plug]

export default routes;
