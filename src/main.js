import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import './api/mock'
import Cookies from 'js-cookie';


//完整引入
Vue.use(ElementUI);
Vue.config.productionTip = false

/* Vue.use(Button);
Vue.use(Row)
 */

router.beforeEach((to, from,next)=>{
  //判断token存不存在
    const token = Cookies.get('token');
  //token不存在，说明当前用户未登录，应该跳转至登录页
    if(!token && to.name !== 'login'){
      next({name:'login'})
    }else if(token && to.name === 'login')  {//token存在，用户登录，跳转至首页
      next({name:'home'})
    }else{
      next()
    }
})

new Vue({
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
  render: h => h(App),

}).$mount('#app')

