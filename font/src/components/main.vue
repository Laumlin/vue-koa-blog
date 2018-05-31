<template>
	<div class="container mt-2">
		<div class="row">
			<div class="col-lg-8">
				<router-view></router-view>
			</div>

			<div class="col-lg-4">
				<!--个人信息 -->
				<div class="card my-4">
					<div class="card-header px-2 bg-white">
						<strong><i class="fa fa-paper-plane mr-2"></i>个人空间</strong>
					</div>
					<div class="card-body pb-1">
						<div class="row text-center ">
							<div class="col">
								<a href="https://github.com/Laumlin" title="博主的github" target="_blank">
									<img style="width: 38px; height:38px" src="../assets/github.png" alt="博主的github">
									<p class="mt-3">Github</p>
								</a>
							</div>
							<div class="col">
								<a href="/" title="博主的微信" target="_blank">
									<img style="width: 38px; height:38px" src="../assets/wechat.png" alt="博主的微信">
									<p class="mt-3">WeChat</p>
								</a>
							</div>
							<div class="col">
									<a href="http://laumlin.github.io" title="博主的微信" target="_blank">
									<img style="width: 38px; height:38px" src="../assets/blog.png" alt="博主的微信">
									<p class="mt-3">Blog</p>
								</a>
							</div>
						</div>
					</div>
				</div>
				<!--标签云-->
				<div class="card my-4">
					<div class="card-header px-2 bg-white">
						<strong><i class="fa fa-tags mr-2"></i>标&nbsp;签&nbsp;云</strong>
					</div>
					<div class="card-body">
						<div class="tag-cloud">
							<p v-for="tag in tags" class="float-left">
								<router-link :to="{path:'/category', query:{tag: tag.name}}" class="btn bg-info">{{tag.name}}</router-link>
							</p>
						</div>
					</div>
				</div>
				<!--留言-->
				<div class="card my-3">
					<div class="card-header px-2 bg-white">
						<strong><i class="fa fa-comment mr-2"></i>留&nbsp;言&nbsp;&nbsp;</strong>
					</div>
					<div class="card-body px-0 py-0">
						<ul class="list-group">
							  <li class="list-group-item px-0 py-0" v-for="item in messageList">
						 			<router-link to="/messages" class="message-form">
						  			<div class="message-avatar text-center">
	                    <img :src="'https://cdn.v2ex.com/gravatar/' + item.email + '?s=120&d=mm&r=g'" alt="">
	                  </div>
	                  <div class="message-content">
	  									<p class="name">{{item.name}}</p>
	  									<p class="content">{{item.content}}</p>
	                  </div>
	                </router-link>
							  </li>
						</ul>
					</div>
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
			messageList: [],
			tags: []
		}
	},
	created () {
		axios.get('/api/messages').then((result) => {
			let res = result.data
			if (res.code === 200) {
				this.messageList = res.data.slice(0,8)
			} else {
				this.messageList = []
			}
		}),
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
</script>

<style scoped>
a {
	color: inherit;
}
a:hover {
  text-decoration: none;
  color: #ea6f5a;
}
.tag-cloud a {
	margin: 10px;
	color: #fff;
}
.card {
	width: 320px;
}
.card-header strong {
  padding-bottom:12px;
  width: 90px;
  border-bottom: 2px solid #00AAEE;
}
.toTop {
	display: block;
	width: 20px;
	height: 20px;
	position: fixed;
	right: 5%;
}
.message-form {
	margin: 0;
	display: flex;
}
.message-form .message-avatar img {
	width: 30px;
	height: 30px;
}
.message-form .message-content {
	margin: 0 0 0 5px;
	height: 48px;
	overflow: hidden;
}
.message-content .name {
	margin: 0;
	font-family:"Times New Roman", Times, serif;
}
.message-content .content {
	margin: 2px 0 0 10px;
	font-size: 12px;
}
</style>