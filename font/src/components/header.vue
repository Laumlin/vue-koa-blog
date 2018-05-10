<template>
  <div class="header mb-2">
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-md bg-white py-md-1">
      <!-- logo -->
      <a href="#" class="navbar-brand d-md-none d-lg-block">
        <img src="../assets/logo.png" alt="logo" style="height: 32px">
      </a>
      <!-- toggler/collapsibe Button -->
      <button class="navbar-toggler" data-toggle="collapse" data-target="#collapsibleNavbar">
        <i class="fa fa-bars"></i>
      </button>
      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav ml-5">
          <li class="nav-item mr-3">
            <a href="/" class="nav-link active"><i class="fa fa-home mr-1"></i>首页</a>
          </li>
          <li class="nav-item mr-3 dropdown">
            <a href="/category" class="nav-link" data-toggle="dropdown"><i class="fa fa-sitemap mr-1"></i>分类</a>
            <div class="dropdown-menu">
              <p v-for="tag in tags" class="float-left">
                <router-link :to="{path:'/category', query:{tag: tag.name}}" class="dropdown-item">{{tag.name}}</router-link>
              </p>
            </div>
          </li>
          <li class="nav-item mr-3">
            <a href="/messages" class="nav-link"><i class="fa fa-commenting mr-1"></i>留言</a>
          </li>
          <li class="navs-item mr-3">
            <a href="/about" class="nav-link"><i class="fa fa-user mr-1"></i>关于</a>
          </li>
        </ul>
      </div>
      <!-- Navbar links 结束 -->
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import Headroom from 'headroom.js'
export default {
  data () {
    return {
      tags: []
    }
  },
  mounted () {
    this.getTags()
  },
  methods: {
    getTags () {
      axios.get('/api/tags').then((result) => {
        let res = result.data
        if (res.code === 200) {
          this.tags = res.data
        } else {
          this.tags = []
        }
      })
    }
  }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
  color: #ea6f5a;
}
</style>
