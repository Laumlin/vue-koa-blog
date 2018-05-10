import Vue from 'vue'
import Router from 'vue-router'

const article = resolve => require(['../components/article'], resolve)
const articleList = resolve => require(['../components/articleList'], resolve)
const messages = resolve => require(['../components/messages'], resolve)
const category = resolve => require(['../components/category'], resolve)
const about = resolve => require(['../components/about'], resolve)

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'articleList',
      component: articleList
    },
    {
    	path: '/article',
    	name: 'article',
    	component: article
    },
    {
      path: '/messages',
      name: 'messages',
      component: messages
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
