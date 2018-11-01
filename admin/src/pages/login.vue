<template>
  <div class="login-bg">
    <el-button type="primary" @click="hiddden" class="loginBtn" v-if="toLogin">点我登录</el-button>
    <transition name="bounce">
      <div class="login-contain" v-if="show">
        <form class="login-form">
          <input type="text" v-model="username" placeholder="username" autofocus=""><br>
          <input type="password" v-model="password" placeholder="password" @keyup.enter.stop="login"><br>
          <el-button type="primary" @click="login" class="primary">login</el-button> 
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data () {
  	return {
  	  username: '',
  	  password: '',
      show: false,
      toLogin: true
  	}
  },
  methods: {
    hiddden () {
      this.show = !this.show
      this.toLogin = false
    },
  	login () {
  	  let username = this.username
  	  let password = this.password
      if (username === '') {
        this.$message('用户名不能为空！')
      }
      if (password === '') {
        this.$message('密码不能为空！')
      }
  	  axios.post('api/login', { username, password })
  	  	.then(res => {
  	  	  if (res.data.success === true) {
            // let expireDays = 1000 * 60 * 60
            // this.setCookie('user', res.data.data.username, expireDays)
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
  }
}
</script>
<style scoped="">
.login-bg {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: url('http://owu8c85uh.bkt.clouddn.com/xingkong.jpg');
}
.loginBtn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.login-contain {
  margin: 150px auto;
  width: 400px;
  height: 300px;
  background: rgba(255,255,255,.1);
  border: 1px solid #000;
}
.login-form {
  margin-top: 50px;
}
.login-contain:before {
  width: 0;
  height: 0;
  content: '';
  border: 10px solid #f00283;
  position: relative;
  top: -26px;
  border-color: transparent transparent #333 transparent;
}
input {
  margin: 10px;
  width: 200px;
  height: 30px;
  background: rgba(255,255,255,.5);
}
.primary {
  position: relative;
  bottom: -20px;
  width: 100px;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
