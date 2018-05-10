<template>
	<div class="about-container mt-4 p-3">
		<div class="jumbotron text-center">
			<h2>About me</h2>
		</div>
		<div class="card">
			<div class="card-header">
				<img class="card-img-top img-thumbnail" alt="avatar" src="http://owu8c85uh.bkt.clouddn.com/avatar.jpg" title="my wechat's name is laumlin also">
				<div class="message ml-3">
					<p>Name/ <span>Laumlin</span></p>
					<p>School/ <span>Guangzhou University</span></p>
					<p>Email/ <span>1255964530@qq.com</span></p>
					<p>Hobit/ <span>basketball、swimming、movies、code...</span></p>
				</div>
			</div>
			<div class="card-body">
				<p>博客只是完成了前期的基本工作，任有一些小细节要处理，因为这段时间要准备面试，优化工作只能等等了。。。</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {

}
</script>
<style>
.about-container {
	min-height: 600px;
	border-radius: 10px;
  box-shadow: 0 5px 8px 8px rgba(0,0,0,.2);
}	
.card img {
	width: 100px;
	height: 100px;
	border-radius: 100%;
}
.card-header {
	display: flex;
}

</style>