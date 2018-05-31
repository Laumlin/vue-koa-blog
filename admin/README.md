### myblog admin篇

> vue2,koa2和mongodb搭建的单用户博客

### Build Setup

```
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
# build for production and view the bundle analyzer report
npm run build --report
```



后台效果展示:

![后台主页](http://owu8c85uh.bkt.clouddn.com/show.png)

![文章管理页](http://owu8c85uh.bkt.clouddn.com/articles.png)

![文章详情](http://owu8c85uh.bkt.clouddn.com/article_datail.png)

![发布文章成功](http://owu8c85uh.bkt.clouddn.com/subArticle.png)

### 代理

后台的默认端口是8000, 下面是vue-cli本地环境API的代理设置，解决跨域问题。

```javascript
    proxyTable: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true
        }
    },
```



### 单页无滚动布局

就是说整个后台的展示空间永远只是浏览器显示的界面那样大小，但文章列表的长度超过屏幕的高度时，就会分页，例如文章管理页面每个页面最多是显示8篇文章，多余的被分到第二页。

```javascript
# 页面结构
body
	page
		header
		aside
		section
```

```css
# 绝对定位实现全屏拉伸
.page {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #FFFFCC;
}
```

```css
header {
  position: absolute;
  top: 0;
  height: 50px;
  width: 100%;
  background: #FFFFFF;
  border-bottom: 1px solid gray;
}
aside {
  position: fixed;
  width: 150px;
  top: 50px;
  left: 0;
  height: 92%;
  background: #2b3340;
}
section {
  position: absolute;
  top: 55px;
  left: 150px;
  min-width: 630px;
}
```

### 后台使用的是Element－UI框架

使用的感受挺好的，人性化的ui设计和舒服的搭配，我一开始是想用它的弹窗来实行消息提示的，后面开的时候也用了它的其他组件，如Tag,Dialog等，使用的感觉很好。

### 使用浏览器的sessionStorage存储用户信息

由于项目比较简单没有使用vuex来管理状态也没有使用`jsonwebtoken`模块来实现登录逻辑这一块，

而是用浏览器的sessionStorage来实现登录逻辑

*login.vue*

```javascript
  	  axios.post('api/login', { username, password })
  	  	.then(res => {
  	  	  if (res.data.success === true) {
            //登录成功后将user存到浏览器中
            sessionStorage.setItem('user', res.data.data.username) 
            this.$notify({
              title: '',
              message: '登录成功！',
              type: 'success'
            })
            this.$router.push({path: '/admin'})
  	  	  }
  	  	})
  	}
```

#### 在后台主页检测session

*admin.vue*

```javascript
  watch: {
    '$route': 'checkLogin'
  },
  created () {
    this.checkLogin()
  },
  methods: {
    logout () {
      sessionStorage.removeItem('user')
      this.$message({
        type: 'success',
        message: '登出成功!'
      })
      this.$router.push('/login')
    },
    checkLogin () {
      if (!sessionStorage.getItem('user')) {
        this.$router.push('/login')
      }
    }
  }
```

#### 实现路由登录拦截

*router/index.js*

```javascript
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('user') //检测session
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
```

#### mavon-editor作为markdown编辑器

在*main.js*中引入

```javascript
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
```

具体使用方法：

[推荐一款基于Vue的Markdown编辑器插件——mavonEditor](https://juejin.im/post/5adab398f265da0b9671ca25)

#### 使用axios请求后台数据

用法很简单：例子如下

```javascript
axios.get('/api/tags').then((result) => {
        let res = result.data
        if (res.code === 200) {
          this.tags = res.data
        } else {
          this.tags = []
        }
      })
```

---

不足之处：

​	项目好像有点大，初始化时`npm start`跑得比较慢，看来要学着给项目‘减减肥了’。

