<template>
	<!-- 滑动条 -->
	<div class="to-top text-center" id="to-top">
		<i class="fa fa-chevron-up" id="btn-top" title="回到顶部"></i>
	</div>
</template>
<script>
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
</script>
<style scoped>
.to-top {
	position: fixed;
	right: 5%;
	bottom: 5em;
	width: 40px;
	height: 50px;
	background-color: #11AFFF; 
	border-radius: 10px;
}
.to-top i{
	line-height: 50px;
}
.to-top:hover {
	background-color: #FFCCDD;
}
</style>