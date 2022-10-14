import request from '@/utils/request'

const api = {
  userInfo: '/api/dds/system/user',
  getCurrentUser: '/api/dds/system/user/currentUser',
  add: '/api/dds/system/user/add',
  pageList: '/api/dds/system/user/page',
  userList: '/api/dds/system/user/list',
  deleteUser: '/api/dds/system/user/delete',
  updateUser: '/api/dds/system/user/update',
  authRole: '/api/dds/system/user/authRole',
  resetPassword: '/api/dds/system/user/resetPassword'
}
/**
 * 获取登录前需要展示的模块
 */

export const getUserInfo = (params: any) => {
  return request({
    url: api.userInfo + `/${params.userId}`,
    method: 'GET'
  })
}
/**
 * 获取当前登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    url: api.getCurrentUser,
    method: 'GET'
  })
}

export const addUser = (params: any) => {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}
export const getUserList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}
export const getUserListAll = (params: any) => {
  return request({
    url: api.userList,
    method: 'get',
    params: params
  })
}
export const deleteUser = (params: any) => {
  return request({
    url: api.deleteUser + `/${params.userId}`,
    method: 'post'
  })
}
export const updateUser = (params: any) => {
  return request({
    url: api.updateUser,
    method: 'post',
    data: params
  })
}
// 用户授权
export const authRole = (params: any) => {
  return request({
    url: api.authRole,
    method: 'post',
    data: params
  })
}
// 修改密码
export const resetPassword = (params: any) => {
  return request({
    url: api.resetPassword,
    method: 'post',
    data: params
  })
}
