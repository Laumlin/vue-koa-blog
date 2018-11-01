import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Admin = () => import('^/admin')
const Login = () => import('^/login')
const ArticleEdit = () => import('@/ArticleEdit')
const adminArticleList = () => import('@/adminArticleList')
const ArticleModify = () => import('@/ArticleModify')

let router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'admin',
      path: '/admin',
      component: Admin,
      redirect: {
        name: 'adminArticleList'
      },
      meta: {
        requiresAuth: true
      },
      children: [
        {
          name: 'article',
          path: 'article',
          component: ArticleEdit,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'adminArticleList',
          path: 'adminArticleList',
          component: adminArticleList
        },
        {
          name: 'ArticleModify',
          path: 'ArticleModify',
          component: ArticleModify
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('user')
  if (to.meta.requiresAuth) {
    if (token) {
      return next()
    }
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
