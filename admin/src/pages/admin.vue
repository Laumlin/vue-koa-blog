<template>
  <div class="page">
    <header>
      <a href="#"><img src="../assets/logo.png" alt="logo.png" class="logo"></a>
      <div class="logout">
        <i class="iconfont icon-icondirectionsrun logout-icon" @click="logout"></i>
      </div>
    </header>
    <aside>
      <v-aside></v-aside>
    </aside>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
const Aside = () => import('@/Aside')
export default {
  name: 'one',
  components: {
    'v-aside': Aside
  },
  data () {
    return {
      show: true
    }
  },
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #FFFFF8;
}
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
  height: 100%;
  background: #2b3340;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.logo {
  position: absolute;
  left: 10px;
  width: ;
  height: 100%;
}
.logout {
  position: absolute;
  right: 10px;
  padding: 4px;
}
.logout-icon {
  font-size: 32px;
  color: #99CCCC;
  cursor: pointer;
}
</style>
