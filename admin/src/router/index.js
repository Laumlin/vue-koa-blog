import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Admin = resolve => require(['../components/admin'], resolve)
const Login = resolve => require(['../components/login'], resolve)
const ArticleEdit = resolve => require(['../components/ArticleEdit'], resolve)
const adminArticleList = resolve => require(['../components/adminArticleList'], resolve)
const ArticleModify = resolve => require(['../components/ArticleModify'], resolve)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/article',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'article',
          component: ArticleEdit,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'adminArticleList',
          component: adminArticleList
        },
        {
          path: 'ArticleModify',
          component: ArticleModify
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
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
