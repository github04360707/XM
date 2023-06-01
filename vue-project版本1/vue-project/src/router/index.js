import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/login/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      
    },
   {
      path: '/index',
      name: 'index',
      component: () => import('../views/IndexView.vue'),
      meta: {
        title: '主页'
      },
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/ShouyeView.vue'),
          meta:{
            requireAuth:true,
            title: '主页'
          },
        },
        {
          path: '/Students',
          name: 'Students',
          meta:{
            requireAuth:true,
            title: '主页'
          },
          component: () => import('../views/StudentsView.vue')
        },
        {
          path: '/Teacher',
          name: 'Teacher',
          component: () => import('../views/TeacherView.vue'),
          meta:{
            requireAuth:true,
            title: '主页'
          },
        },
        {
          path: '/Teacher',
          name: 'Teacher',
          component: () => import('../views/TeacherView.vue'),
          meta:{
            requireAuth:true,
            title: '主页'
          },
        },
        {
          path: '/Classroom',
          name: 'Classroom',
          component: () => import('../views/ClassroomView.vue'),
          meta:{
            requireAuth:true,
            title: '主页'
          },
        },
        {
          path: '/My',
          name: 'my',
          component: () => import('../views/MyView.vue'),
          meta:{
            requireAuth:true,
            title: '主页'
          },
        },
        {
          path: '/Table',
          name: 'Table',
          component: () => import('../views/TableView.vue'),
          meta:{
            requireAuth:true,
            title: '主页'
          },
        },
      ]
   },
    
  ]
});


router.beforeEach((to,from,next)=>{
  if(to.path === '/index') { 
    var tokeninfo=localStorage.getItem('token')
   if(tokeninfo){
   return next() 
   } 
   else { 
    alert('暂无权限查看')
   return next('/')
 
  } 
　}else if(to.path==='/'){
  
  
  

}

if(to.meta.requireAuth){ 
  var tokeninfo=localStorage.getItem('token')
  if(tokeninfo){ 
    next() 
  }else{
    alert('暂无权限查看')
   
  }
}else{
  next() 
}


})
export default router
