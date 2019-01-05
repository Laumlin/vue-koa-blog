<template>
  <div class="modify-container">
    <mavon-editor class="markdown" :ishljs="true" v-model="value" @change="getContent" />
    <div class="footer">
      <el-popover
        ref="popover5"
        placement="top"
        width="160"
        v-model="visible2">
        <p>确定提交吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
          <el-button type="primary" size="mini" @click="articleModify">确定</el-button>
        </div>
      </el-popover>
      <el-button class="footer-left" @click="dialogTableVisible=true">修改信息</el-button>
      <el-button class="footer-left" @click="dialogTableVisible2=true">修改分类</el-button>
      <el-button class="footer-right" v-popover:popover5>发布</el-button>
    </div>
    <el-dialog title="文章信息" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章描述" :label-width="formLabelWidth">
          <el-input v-model="form.describtion"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible=false">取消</el-button>
        <el-button @click="dialogTableVisible=false" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标签信息" :visible.sync="dialogTableVisible2" :modal-append-to-body="false">
  <!-- tags的结构是['a', 'b'] -->
      <el-tag
        :key="tag"
        v-for="(tag, index) in tags"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag, index)"
      >
      {{tag}}
      </el-tag>
      <el-select v-model="tags" multiple placeholder="请选择活动区域">
        <el-option :key="item.name" :label="item.name" :value="item.name" v-for="item in allTags"></el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible2=false">取消</el-button>
        <el-button @click="dialogTableVisible2=false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data () {
    return {
      value: '',
      content: '',
      visible2: false,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      formLabelWidth: '120px',
      form: {
        title: '',
        describtion: ''
      },
      tags: [],
      allTags: []
    }
  },
  mounted () {
    this.getValue()
    this.getAllTags()
  },
  methods: {
    getContent (value, render) {
      this.content = render
    },
    getValue () {
      let articleId = this.$route.query.articleId
      let param = {
        ArticleId: articleId
      }
      axios.get('/api/articlesDetial', {
        params: param
      }).then((result) => {
        let res = result.data
        console.log(res.data.content)
        if (res.code === 200) {
          this.value = res.data.content
          this.form.title = res.data.title
          this.form.describtion = res.data.describtion
          this.tags = res.data.tag
        } else {
          this.value = ''
          this.form.title = ''
          this.form.describtion = ''
          this.tags = []
        }
      })
    },
    getAllTags () {
      axios.get('/api/tags').then(result => {
        let res = result.data
        if (res.code === 200) {
          this.allTags = res.data
          console.log(this.allTags[0].name)
        } else {
          this.allTags = []
        }
      })
    },
    handleClose (tag, index) {
      this.tags.splice(index, 1)
    },
    articleModify () {
      let articleId = this.$route.query.articleId
      let title = this.form.title
      let describtion = this.form.describtion
      let tag = this.tags
      let content = this.content
      axios.post('/api/articleModify', {
        articleId,
        title,
        tag,
        content: this.content,
        describtion
      }).then((result) => {
        let res = result.data
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '文章已修改'
          })
          this.visible2 = false
        } else {
          this.$message.error('未修改')
        }
      })
    }
  }
}
</script>

<style scoped>
.modify-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 150px;
}
.markdown{
  width: 80vw;
  height: 70vh;
}
.footer {
  width: 100%;
  padding: 20px 0;
}
.footer-left {
  float: left;
}
.footer-right {
  float: right;
}
</style>
