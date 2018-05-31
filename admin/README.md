### myblog font篇

> vue2,koa2和mongodb搭建的单用户博客

### Build Setup

```javascript
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
# build for production and view the bundle analyzer report
npm run build --report
```

前台没有用eslint模块来统一代码风格，主要使用jquery && bootstrap框架实现布局和优化，不仅支持pc端也支持手机端，风格是极简风格，看起来比较舒服，前台可以说是一个单页应用，它只有一个`<router-view></router-view>`插槽来显示所有的路由跳转。

pc端：

![布局](http://owu8c85uh.bkt.clouddn.com/font7.png)

展示：

![](http://owu8c85uh.bkt.clouddn.com/font1.png)

![](http://owu8c85uh.bkt.clouddn.com/font2.png)

手机端：

![](http://owu8c85uh.bkt.clouddn.com/font5.png)

![](http://owu8c85uh.bkt.clouddn.com/font6.png)

#### 页面布局

```html
  <div id="app">
      <v-header></v-header>
      <v-main></v-main>
      <v-scroll></v-scroll>
      <v-footer></v-footer>
  </div>
```

#### 滑动条

组件：*scroll.vue*主要用jquery的动画来实现

```javascript
export default {
	mounted () {
		$(window).scroll(function(){
			$('#to-top').hide();
			if($(window).scrollTop()>=100) {
				$('#to-top').show();
			}
		});
		$('#to-top').click(function(){
			var speed = 40;
			$('body,html').animate({'scrollTop':  0}, speed);
			return false;
		})
	}
}
```

