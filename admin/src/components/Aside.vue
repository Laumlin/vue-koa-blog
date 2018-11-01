<template>
  <div class="aside">
  	<nav>
  	  <router-link :to="{path: 'article'}" active-class="active" class="aside-nav-list" tag="li">
  	  	<i class="iconfont icon-edit">发布文章</i>
  	  </router-link>
  	  <router-link :to="{name: 'adminArticleList'}" class="aside-nav-list" tag="li" active-class="active">
  	  	<i class="iconfont icon-article">文章管理</i>
  	  </router-link>
  	</nav>
  </div>
</template>

<script>

</script>

<style scoped="">
.aside {
  list-style-type: none;
}
.aside nav {
  position: relative; 
  font-size: 18px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.aside-nav-list {
  width: 100%;
  height: 40px;
  color: #b0afa8;
  padding: 5px;
  margin-bottom: 5px;
  line-height: 40px;
  cursor: pointer;
}
.iconfont {
	position: absolute;
	left: 15px;
}
.aside-nav-list:hover {
  background: rgba(0,0,0,.5);
}
</style>
