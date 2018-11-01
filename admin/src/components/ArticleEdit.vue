<template>
  <div>
    <div class="admin-container">
      <mavon-editor :isdhljs="true" class="set" v-model="value" @change="getContent"></mavon-editor>
      <div class="footer">
        <el-popover
          ref="popover5"
          placement="top"
          width="160"
          v-model="visible2">
          <p>确定提交吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="subArticle">确定</el-button>
          </div>
        </el-popover>
        <el-button v-popover:popover5 class="submit">发布</el-button>
        <div class="left">
        <el-button @click="dialogTableVisible = true">填写信息</el-button>
        <el-button @click="dialogTableVisible2 = true">添加分类</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="文章信息" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章标签" :label-width="formLabelWidth">
          <el-select v-model="form.tag" multiple placeholder="请选择活动区域">
            <el-option :key="item.name" :label="item.name" :value="item.name" v-for="item in tags"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章描述" :label-width="formLabelWidth">
          <el-input v-model="form.describtion" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="标签分类" :visible.sync="dialogTableVisible2" id="tags" :modal-append-to-body="false">
      <el-tag
        :key="tag.name"
        v-for="(tag, index) in tags"
        :closable="true"
        :close-transition="false"
        @close="handleClose(tag.name, index)"
      >
      {{tag.name}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      value: '# 请开始你的表演',
      tags: [],
      content: '',
      visible2: false,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      inputValue: '',
      inputVisible: false,
      form: {
        title: '',
        tag: '',
        describtion: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.getTags()
  },
  methods: {
    getContent (value, render) {
      this.content = render
    },
    subArticle () {
      let title = this.form.title
      let tag = this.form.tag
      let content = this.content
      let describtion = this.form.describtion
      if (!title) {
        this.$message.error('无标题')
      } else if (!content) {
        this.$message.error('无内容')
      } else {
        axios.post('/api/articleSub', {
          title,
          tag,
          describtion,
          content
        }).then((response) => {
          let res = response.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '文章已发布'
            })
            this.visible2 = false
            this.$router.push({path: '/adminArticleList'})
          } else {
            this.$message.error('未发布')
          }
        })
      }
    },
    getTags () {
      axios.get('/api/tags').then((result) => {
        let res = result.data
        if (res.code === 200) {
          this.tags = res.data
        } else {
          this.tags = []
        }
      })
    },
    handleClose (tag, index) {
      let tagDel = tag
      this.tags.splice(index, 1)
      axios.post('/api/tagsDelete', {
        tagDel
      }).then((response) => {
        let res = response.data
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '标签已删除'
          })
        } else {
          this.$message.error('未删除')
        }
      })
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      // let inputValue = this.inputValue
      let name = this.inputValue
      if (name) {
        this.tags.push({ name: name })
        axios.post('/api/tags', {
          name
        }).then((response) => {
          let res = response.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '标签已添加'
            })
          } else {
            this.$message.error('未添加')
          }
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="css">
#tags .el-tag+.el-tag {
  margin-left: 10px;
}
#tags .button-new-tag,.input-new-tag{
  margin-left: 10px;
  height: 24px;
  line-height: 22px;
  padding-top: 0;
  padding-bottom: 0;
}
#tags .input-new-tag {
  width:78px;
  margin-left:10px;
  vertical-align:bottom
}
.footer{
  overflow: hidden;
  margin: 0 auto;
  padding-top: 20px;
}
.row-bg {
    /*background-color: #f9fafc;*/
    background-color: #99a9bf;
    width: 100%;
    height: 837px;
    border-radius: 2px;
}
.admin-container {
    flex:1;
    padding: 20px;
}
.set{
		height: 700px;
    width: 1100px;
}
.submit{
    float: right;
}
.left {
   float: left;
}
</style>
