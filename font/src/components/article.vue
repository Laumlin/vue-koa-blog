<template>
	<div class="card article mt-4">
		<div class="card-header bg-white">
			<h1 class="text-center my-2">{{ article.title }}</h1>
			<p class="text-center pt-2 createDate"><i class="fa fa-calendar-times-o mr-2"></i>{{ article.createDate }}</p>
		</div>
		<div class="card-body">
			<div class="post-content wysiwyg" v-html="article.content"></div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import 'wysiwyg.css'
export default {
	data () {
		return {
			article: ''
		}
	},
	mounted () {
		this.getArticle()
	},
	methods: {
		getArticle () {
			let articleId = this.$route.query.articleId
			let param = {
				ArticleId: articleId
			}
			axios.get('/api/articlesDetial', {
				params:	param
			}).then((result) => {
				let res = result.data
				if (res.code === 200) {
					this.article = res.data
				} else {
					article = ''
				}
			})
		}
	}
}
</script>

<style scoped>
.article {
	width: 100%;
	box-shadow: 0 16px 24px 1px rgba(0,0,0,.14), 
				0 6px 50px 1px rgba(0,0,0,.12), 
				0 6px 10px -5px rgba(0,0,0,.2);
	border-radius: 20px;
}
.article .createDate {
	color: #ea6f5a;
}
</style>