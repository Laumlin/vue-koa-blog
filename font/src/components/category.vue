<template>
  <div class="mt-4 container">
    <h3 class="tag-sign"><i class="fa fa-tags mr-2"></i>{{this.$route.query.tag}}</h3>
    <div class="article" v-for="item in list">
      <h3 class="float-left ml-5"><router-link :to="{path:'/article', query:{articleId: item._id}}" class="title">{{item.title}}</router-link></h3>
      <p class="float-right mt-2 createDate"><i class="fa fa-calendar-times-o mr-2"></i>发布于{{item.createDate}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getArticles()
  },
  methods: {
    getArticles () {
      let tag = this.$route.query.tag
      this.tag = tag
      let param = {
        tag: tag
      }
      axios.get('/api/articlesByTag', {
        params: param 
      }).then((result) => {
        let res = result.data
        if (res.code === 200) {
          this.list = res.data
        } else {
          this.list = []
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 8px 8px rgba(0,0,0,.2);
}
.tag-sign {
  position: relative;
  top: 10px;
  color: #FFCCAA;
}
.article {
  margin-top: 40px;
  height: 50px;
}
.article .title {
  color: black;
}
.article .title:hover {
  text-decoration: none;
  color: #ea6f5a;
}
.article .createDate {
  line-height: 50px;
  font-size: 14px;
  color: black;
}
</style>
