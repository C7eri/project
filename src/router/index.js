import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect:'/home',
    children:[
      {path:'home',component:Home},
      {path:'user',component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')},
      {path:'mall',component:()=>import('../views/Mall.vue')},
      {path:'page1',component:()=>import('../views/PageOne.vue')},
      {path:'page2',component:()=>import('../views/PageTwo.vue')}
    ]
  },
  {path:'/login',name:'login',component:Login}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const users = localStorage.getItem('token')
    if ( !users && to.path !== '/login') {
      next('/login')
    }else{
      next()
    }
})
export default router
