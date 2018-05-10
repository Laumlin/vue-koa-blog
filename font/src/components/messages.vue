<template>
	<div class="mt-4">
		<!-- 留言内容 -->
		<div class="form-group">
			<label for="textarea">leave a message</label>
			<textarea ref='textBox' id="textarea" spellcheck='false'  placeholder="咱们交流交流~~" v-model="content" class="form-control" cols="50" rows="18" aria-required="true"></textarea>
		</div>
		<!-- 姓名和邮箱 -->
		<div class="row">
			<!-- 姓名 -->
			<div class="form-group col-6">
				<input type="text" placeholder="name" class="form-control" v-model.trim="name">
			</div>
			<!-- 邮箱 -->
			<div class="form-group col-6">
				<input type="email" placeholder="email" class="form-control" v-model.trim="email">
			</div>
		</div>
		<!-- 提交 -->
		<div class="submit">
			<span>{{status}}</span>
			<button class="btn btn-primary" @click="submit">submit message</button>
		</div>
		<!-- 留言栏 -->
		<div class="message-container">
			<div v-for="item in messageList" class="message-form">
				<!-- 头像 -->
				<div class="message-avatar text-center">
	        <img :src="'https://cdn.v2ex.com/gravatar/' + item.email + '?s=120&d=mm&r=g'" alt="">
	      </div>
	      <!-- 留言信息 -->
	      <div class="message-content">
					<p class="name">{{item.name}}</p>
					<p class="content">{{item.content}}</p>
	      </div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data () {
		return {
			content: '',
			email: '',
			name: '',
			status: '请输入...',
			messageList: []
		}
	},
	created () {
		this.getMessageList()
	},
	methods: {
		getMessageList () {
			axios.get('/api/messages').then((result) => {
				let res = result.data
				if (res.code === 200) {
					this.messageList = res.data
				} else {
					this.messageList = []
				}
			})
		},
		submit () {
			let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
			if (!this.name || !this.email || !this.content) {
				this.status = '什么都没填还想提交，no way!'
				return
			} else if (!reg.test(this.email)) {
				this.status = '邮箱格式不正确！'
				return 
			} else if(this.content.length > 500) {
				this.status = '字数超了！'
				return
			} else if (/\d{7,}/i.test(this.message) || // 连续7个以上数字，过滤发Q号和Q群的评论
                /(\d.*){7,}/i.test(this.message) || // 非连续的7个以上数字，过滤用字符间隔开的Q号和Q群的评论
                /\u52A0.*\u7FA4/i.test(this.message) || // 包含“加群”两字的通常是发Q群的垃圾评论
                /(\u9876.*){5,}/i.test(this.message) || // 过滤5个以上“顶”字的评论
                /([\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u25CB\u58F9\u8D30\u53C1\u8086\u4F0D\u9646\u67D2\u634C\u7396\u96F6].*){7,}/i.test(this.message) // 过滤用汉字发Q号和Q群的评论
      ) {
        this.status = '可不能发不好的东东哦'
        return
      }
      let name = this.name
      let email = this.email
      let content = this.content
      axios.post('/api/createMessage', {
      	name,
      	email,
      	content
      }).then((result) => {
      	let res = result.data
      	if (res.code === 200) {
      		this.status = '留言成功'
      	} else {
      		this.status = '我也不知道哪里出错了！'
      	}
      })
		}
	}
}
</script>
<style scoped>
.submit {
	width: 100%;
	height: 40px;
}
.submit button{
	float: right;
}
.message-container {
	margin: 15px -20px 0 0;
	padding: 5px;
}
.message-form {
	display: flex;
	padding: 5px 0 5px 0;
	border-bottom: 1px solid rgba(0,0,0,.1)
}
.message-form .message-avatar img {
	width: 45px;
	height: 45px;
	border-radius: 100%;
}
.message-form .message-content {
	margin: 0 0 0 10px;
}
.message-content .name {
	margin: 0;
	font-weight: bold;
}
.message-content .content {
	margin: 10px 0 0 10px;
	word-wrap:break-word;  
  word-break:break-all;  
	overflow: hidden;
}
</style>