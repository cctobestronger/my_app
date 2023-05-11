import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import permission from './mockServeData/permission'
import user from './mockServeData/user'
/* Mock.mock('/api/home/getData',function(){
    //拦截到请求后的处理逻辑
    console.log('拦截成功')
}) */
//get请求 可以省略参数
//折线图数据
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)
//登录权限接口，需要用相对路径，需要传输数据
Mock.mock(/api\/permission\/getMenu/,'post',permission.getMenu)
