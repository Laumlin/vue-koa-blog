<template>
  <div class="login-wrap" :style="setBackground">
    <form class="login-form">
      <input class="input" type="text" v-model="username" placeholder="username"><br>
      <input class="input" type="password" v-model="password" placeholder="password" @keyup.enter.stop="login"><br>
      <el-button class="primary" @click="login">login</el-button>
    </form>
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
      toLogin: true,
      setBackground: {
        backgroundImage: 'url(' + require('../assets/login_bgx.gif') + ')',
        backgroundRepeat: 'repeat'
      }
    }
  },
  methods: {
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
            let expireDays = 1000 * 60 * 60
            this.setCookie('user', res.data.data.username, expireDays)
            sessionStorage.setItem('user', res.data.data.username)
            this.$notify({
              title: '',
              message: '登录成功！',
              type: 'success'
            })
            this.$router.push({name: 'admin'})
          } else {
            this.$notify.error({
              title: '错误',
              message: '账号或密码出错'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background: #fff;
  box-shadow: 0 6px 15px 6px #ccc;
}

input {
  width: 295px;
  height: 36px;
  padding: 0 5px;
  border: 1px solid #cad2db;
  border-radius: 5px;
  line-height: 36px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #717171;
  font-family: Arial;
}
.primary {
  width: 100px;
  height: 40px;
  background: #6aa0f1;
  color: white;
  border-radius: 4px;
}

.primary:hover {
  background: #3385ff;
}

</style>
