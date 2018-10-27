import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from '@/router/auth-guard'
import NoAuth from '@/router/no-auth'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Signin from '@/pages/User/Signin'
import Signup from '@/pages/User/Signup'
import Perfil from '@/pages/User/Perfil'
import Veiculo from '@/pages/Veiculo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: NoAuth
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      beforeEnter: NoAuth
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      beforeEnter: NoAuth
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: AuthGuard
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil,
      beforeEnter: AuthGuard
    },
    {
      path: '/veiculo',
      name: 'Veiculo',
      component: Veiculo,
      beforeEnter: AuthGuard
    },
  ]
})
