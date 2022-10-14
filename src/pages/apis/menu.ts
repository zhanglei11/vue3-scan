import request from '@/utils/request'
const api = {
  menuInfo: '/api/dds/system/menu',
  add: '/api/dds/system/menu/add',
  pageList: '/api/dds/system/menu/page',
  listByUser: '/api/dds/system/menu/list/authorized/byUser', //获取用户已授权的菜单列表
  listByRole: '/api/dds/system/menu/menuIds/authorized/byRole', //获取角色已授权的菜单ID列表
  listAll: '/api/dds/system/menu/list',
  deleteMenu: '/api/dds/system/menu/delete',
  updateMenu: '/api/dds/system/menu/update'
}
/**
 * 获取登录前需要展示的模块
 */

export const getMenuInfo = (params: any) => {
  return request({
    url: api.menuInfo,
    method: 'GET',
    params: params
  })
}
export const addMenu = (params: any) => {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}
export const getMenuList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}
export const getMenuListByUser = (params: any) => {
  return request({
    url: api.listByUser,
    method: 'get',
    params: params
  })
}

export const getMenuListByRole = (params: any) => {
  return request({
    url: api.listByRole,
    method: 'get',
    params: params
  })
}

export const menuPageList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}

export const deleteMenu = (params: any) => {
  return request({
    url: api.deleteMenu + `/${params.id}`,
    method: 'post'
  })
}
export const updateMenu = (params: any) => {
  return request({
    url: api.updateMenu,
    method: 'post',
    data: params
  })
}
