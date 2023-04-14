import Mock from 'mockjs'
import homeAPI from '../api/mockServeData/home'
import userApi from '../api/mockServeData/permission'
import user from '../api/mockServeData/user'
import permissions  from './mockServeData/permissions'
Mock.mock('/home/getData',homeAPI.getStatisticalData)
Mock.mock('/user/getemage',userApi.getemage)

Mock.mock('/user/add','post',user.createUser)
Mock.mock('/user/edit','post',user.updateUser)
Mock.mock('/user/del','post',user.deleteUser)
Mock.mock(/user\/getUser/,user.getUserList)
Mock.mock(/api\/permissions\/getMenu/,'post',permissions.getMenu)
Mock.mock(/api\/permissions\/setMenu/,'post',permissions.setMenu)
