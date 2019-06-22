import Vue from 'vue'
import Router from 'vue-router'
import UseElement from '../components/useElement/useElement'
import Login from '../components/login/login'
import Home from '../components/home/home'
import Users from '@/components/users/users'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/useElement', name: 'useElement', component: UseElement},
    {path: '/login', name: 'login', component: Login},
    {path: '/', redirect: '/home'},
    {path: '/home', name: 'home', component: Home,children:[
      {path:'/users',name:'users',component:Users}
    ]},
   
  ]
})
