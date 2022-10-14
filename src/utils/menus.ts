import setting from '@/pages/menu/setting';
import welcome from '@/pages/menu/welcome';
export default [
  welcome,
  {
    path: '',
    title: '基础设置',
    titleEn: 'base setting',
    icon: 'HomeOutlined',
    children: [
      {
        path: '/QMM/basic/procedure',
        titleEn: 'procedure',
        title: '工序设置'
      },
      {
        path: '/QMM/basic/device',
        titleEn: 'functional location',
        title: '设备清单'
      },
      {
        path: '/QMM/basic/tankList',
        titleEn: 'tank List',
        title: '水箱清单'
      }
    ]
  },
  {
    path: '',
    title: '3D',
    titleEn: '3D',
    icon: 'HomeOutlined',
    children: [
      {
        path: '/chart/3d',
        titleEn: '3d',
        title: '3D立体相册'
      }
    ]
  },
  {
    path: '基础功能',
    title: '基础功能',
    titleEn: '基础功能',
    icon: 'HomeOutlined',
    children: [
      {
        path: '/plug/helloword',
        titleEn: 'helloword',
        title: 'helloword'
      }
    ]
  },
  setting
]
