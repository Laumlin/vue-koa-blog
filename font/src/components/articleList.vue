<template>
  <div class="article-list bg-white mt-4 py-1 text-center">
    <!-- 文章模块 -->
    <article class="my-2" v-for="item in list">
      <h2>{{item.title}}</h2>
      <p class="mb-0 createDate"><i class="fa fa-calendar-times-o mr-2"></i>发布于{{item.createDate}}</p>
      <div class="tag">
      <p v-for="tag in item.tag" class="mx-3">
        <router-link :to="{path:'/category', query:{tag: tag}}">{{tag}}</router-link>
      </p>
      </div>
      <div class="content">{{item.content | cutText}}</div>
      <div class="read-more">
        <p><router-link :to="{path:'/article', query:{articleId: item._id}}">阅读全文</router-link></p>
      </div>
    </article>
    <!-- 分页 -->
    <div class="page">
      <ul class="pagination">
        <li class="page-item active"><a class="page-link" href="javascript:;" @click="go(page--)">上一页</a></li>
        <li class="page-item active"><a class="page-link" href="javascript:;" @click="go(page++)">下一页</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      list: [],
      limit: 6,
      page: 1,
      total: 0,
      show: false
    }
  },
  filters: {
    cutText (text) {
      return text.substr(0,110)+'....'
    }
  },
  created () {
    this.init()
  },
  methods: {
    go () {
      let pages = Math.ceil(this.total/this.limit)
      if (this.page<1) {
        this.page = 1
        return
      } else if (this.page>pages) {
        this.page = pages
      } else {
        this.init()
      }
    },
    init () {
      let param = {
        page: this.page,
        limit: this.limit,
      }
      axios.get('/api/articles', {
        params: param
      }).then((result) => {
        let res = result.data
        if(res.code === 200) {
          this.list = res.data
          this.total = res.total
        } else {
          this.list = []
        }
      })
    }
  }
}
</script>

<style>
.article-list {
  box-shadow: 0 16px 24px 1px rgba(0,0,0,.14),
        0 6px 50px 1px rgba(0,0,0,.12),
        0 6px 10px -5px rgba(0,0,0,.2);
  border-radius: 10px;
}
article {
  border-bottom: 1px solid rgba(0,0,0,.2);
  height: 250px;
  position: relative;
}
article .createDate {
  color: #ea6f5a;
}
article .tag {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 30px;
  font-size: 18px;
  background: #97dffd;
  border-radius: 2px;
}
article .tag a {
  color: #fff;
  line-height: 30px;
}
article .tag a:hover {
  color: #ea6f5a;
  text-decoration: none;
}
article .content {
  width: 95%;
  height: 100px;
  margin-top: 10px;
  padding-top: 30px;
  padding-left: 20px;
  text-align: left;
}
.read-more {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.pagination {
  justify-content: space-between;
  padding: 5px;
}

</style>
