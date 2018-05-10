// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.prototype.setCookie = (name, value, expiredays) => {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + value + ((expiredays === null) ? '' 
  	: ';expires=' + exdate.toGMTString())
}

Vue.prototype.getCookie = (name) => {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)', 'g')
  if (arr === document.cookie.match(reg)) {
    return (arr[2])
  } else {
  	return null
  }
}
Vue.prototype.delCookie = (name) => {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = Vue.prototype.getCookie(name)
  if (cval != null) {
  	document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    console.log('fill')
  }
}	
Vue.config.productionTip = false

Vue.use(mavonEditor)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
