// 这个文件用来封装接口，发送请求
import axios from 'axios'
import QS from 'qs'
import { MessageBox } from 'element-ui';
// 请求携带cookie
axios.defaults.withCredentials = true
// console.log(axios.defaults)

// axios.defaults.baseURL = 'http://172.16.106.35:9527'
// axios.defaults.baseURL = 'http://47.92.64.56:9527'
axios.defaults.baseURL = 'http://192.168.1.51:9527'
// axios.defaults.baseURL = 'http://35h5wk.natappfree.cc'
// 登陆函数
export const login = function (obj) {
  return axios.post('login', obj)
}
// 用户菜单权限列表获取
export const getUserJurisdiction = obj => axios.get('menu/' + obj)

// 用户数据列表获取
export const getUserList = obj => axios.get('user', { params: obj })
// 添加用户
export const addUser = obj => axios.post('user', obj)
// 删除用户
export const delUser = id => axios.delete(`user/${id}`)
// 查看用户详情
export const detailsUser = username => axios.get(`user/${username}`)
// 编辑用户
export const editUser = obj => axios.put('user', obj)   //`user/${obj.id}`

// 修改用户状态
// export const chageUserState = (uid, type) => axios.put(`user/${uid}/state/${type}`)

// 获取角色列表
export const getRoleList = (obj) => axios.get('role', { params: obj })
// 添加角色
export const addRole = (obj) => axios.post('role', obj)
// 编辑角色
export const editRole = obj => axios.put('role', obj)

// 删除角色
export const delRole = (obj) => axios.delete('role/' + obj)
// 删除品牌
export const delBrand = (obj) => axios.delete('brand/' + obj)
// 删除门店
export const delHotel = (obj) => axios.delete('hotel/' + obj)
// 删除建筑
export const delBuilding = (obj) => axios.delete('building/' + obj)
// 删除楼层
export const delFloor = (obj) => axios.delete('floor/' + obj)
// 删除客房
export const delRoom = (obj) => axios.delete('room/' + obj)
// 删除客房类型
export const delRoomType = (obj) => axios.delete('roomType/' + obj)
// 删除操作日志
export const delLog = (obj) => axios.delete('log/' + obj)
// 删除设备
export const delEq = (obj) => axios.delete('eq/' + obj)
// 删除字典
export const delDict = (obj) => axios.delete('dict/' + obj)

// 给用户分配角色
export const grantUserRole = (id, rid) => axios.put(`user/${id}/role`, { rid: rid })
// 获取权限列表数据
export const getRights = (type) => axios.get('menu/')
// 获取权限ID列表数据
export const getRightsId = (type) => axios.get('role/menu/' + type)
// 删除角色指定权限
export const delUserRight = (roleId, rightId) => axios.delete(`roles/${roleId}/rights/${rightId}`)
// 角色授权
export const grantRoleRight = (roleId, rids) => axios.post(`roles/${roleId}/rights`, { rids })
// 左侧菜单权限获取
export const getMenus = () => axios.get('menus')
// 获取商品分类数据
export const getCates = (type, pagenum, pagesize) => axios.get('categories', { params: { type, pagenum, pagesize } })
// 添加分类
export const addCate = obj => axios.post('categories', obj)

// 品牌列表
export const getBrandList = () => axios.get('brand')
// 品牌查询
export const getBrandSeek = (obj) => axios.get('brand/', { params: obj })


// 门店列表
export const getHotelList = (obj) => axios.get('hotel', { params: obj })
// 门店查询
export const getHotelSeek = (obj) => axios.get(`hotel/`, { params: obj })
// 建筑查询
export const getBuildinglList = (obj) => axios.get('building', { params: obj })
// 楼层查询
export const getFloorlList = (obj) => axios.get('floor', { params: obj })
// 客房查询
export const getRoomlList = (obj) => axios.get('room', { params: obj })
// 客房类型查询
export const getBoomTypelList = (obj) => axios.get('roomType', { params: obj })
// 设备查询
export const getEqlList = (obj) => axios.get('eq', { params: obj })
// 操作日志查询
export const getLoglList = (obj) => axios.get('log', { params: obj })
// 字典查询
export const getDictList = (obj) => axios.get('dict', { params: obj })
// 客房监控查询
export const getRoomStatusList = (obj) => axios.get('roomStatus', { params: obj })

// 添加品牌
export const addBrand = (obj) => axios.post('brand', obj)

// 添加门店
export const addHotel = (obj) => axios.post('hotel', obj)

// 添加建筑
export const addBuilding = (obj) => axios.post('building', obj)
// 添加楼层
export const addFloor = (obj) => axios.post('floor', obj)
// 添加客房
export const addRoom = (obj) => axios.post('room', obj)
// 添加客房类型
export const addRoomType = (obj) => axios.post('roomType', obj)
// 添加设备
export const addEq = (obj) => axios.post('eq', obj)



// 房间类型下拉框
export const getBoomTypelSelect = (id) => axios.get('roomType/list/' + id)

// 品牌下拉框
export const getBrandSelect = (obj) => axios.get('brand/list', { params: obj })
// 门店下拉框
export const getHotelSelect = (id) => axios.get('hotel/list/' + id)
// 建筑下拉框
export const getBuildingSelect = (id) => axios.get('building/list/' + id)
// 楼层下拉框
export const getFloorSelect = (id) => axios.get('floor/list/' + id)
// 角色下拉框
export const getRoleSelect = () => axios.get('role/list/')
// 设备下拉框
export const getEqSelect = () => axios.get('eq/list/')
// 获取操作日志
export const getLog = () => axios.get('log')
// 获取设备类型
export const getEqTypeSelect = () => axios.get('dict/list', {
  params: { parentId: 'EQUIPMENT' }
})





// 品牌编辑
export const editBrand = obj => axios.put('brand', obj)
// 门店编辑
export const editHotel = obj => axios.put('hotel', obj)
// 建筑编辑
export const editBuilding = obj => axios.put('building', obj)
// 楼层编辑
export const editFloor = obj => axios.put('floor', obj)
// 客房编辑
export const editRoom = obj => axios.put('room', obj)
// 设备编辑
export const editEq = obj => axios.put('eq', obj)
// 客房类型编辑
export const editRoomType = obj => axios.put('roomType', obj)
// 修改密码
export const editpassword = obj => axios.put('/user/password', obj)



// 使用请求拦截, 作用将所有的请求拦截下来，执行自己的逻辑。当前的需求是给所有的请求添加请求头。通过config请求对象的headers属性设置
axios.interceptors.request.use(function (config) {
  // config表示请求对象，这个请求对象必须return回去
  let token = localStorage.getItem('token')
  if (token) {
    // Authorization字段不是随便加的，它是前后台约定好的字段
    config.headers.Authentication = token
  }

  // console.log(config)
  // 将请求类型改为普通的表单类型
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (config.method === 'post' || 'put') {
    config.data = QS.stringify({
      ...config.data  // 将参数变成  a=xx&b=xx&c=xx这样的参数列表
    });
  }

  return config
}, function (error) {
  // Do something with request error

  return Promise.reject(error)
})

// 拦截响应
axios.interceptors.response.use((config) => {
  return config
}, (error) => {
  if (error.response) {
    let errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message

    switch (error.response.status) {
      case 404:
        Vue.prototype.$message.error('很抱歉，资源未找到');

        break
      case 400:
        // console.log(errorMessage)
        Vue.prototype.$message.error(errorMessage);
        break
      case 401:
        // console.log(errorMessage + '401')
        // console.log(Vue.prototype)
        // Vue.prototype.$message.error('很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效');

        // MessageBox.$alert('登陆失效，请重新登陆', '错误提示', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        window.location.href = '#/login'

        //   }
        // });
        break
      default:
        console.log(errorMessage)
        // Vue.prototype.$message.error(errorMessage);
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });

        break
    }
  }
  return Promise.reject(error)
})