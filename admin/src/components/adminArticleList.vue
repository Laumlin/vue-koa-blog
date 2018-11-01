<template lang="html">
  <div class="container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="title"
        label="标题"
        width="200">
      </el-table-column>
      <el-table-column
        prop="describtion"
        label="描述"
        width="200">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="发布时间"
        width="200">
      </el-table-column>
  <!--     <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column> -->
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            @click="handle(scope.$index, scope.row)"
            type="info"
            size="small">查看/编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            type="danger"
            size="small">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      total: 1,
      pageSize: 10,
      page: 1,
      // busy: true, //是否还有数据要加载
      tableData: []
    }
  },
  methods: {
    init () {
      let param = {
        page: this.page,
        limit: this.pageSize
      }
      axios.get('/api/articles', {
        params: param
      }).then((result) => {
        let res = result.data
        if (res.code === 200) {
          this.tableData = res.data
          this.total = res.total
        } else {
          this.tableData = []
        }
      })
    },
    handleDelete (index) {
      let articleId = this.tableData[index]._id
      this.$confirm('将删除该文章, 是否继续?', '警告', {
		    confirmButtonText: '确定',
		    cancelButtonText: '取消',
		    type: 'warning'
		  }).then(() => {
        axios.post('/api/articleDelete', {
          articleId
        }).then((response) => {
          let res = response.data
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '文章已删除'
            })
            this.init()
          } else {
            this.$message.error('未删除成功')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handle (index) {
      let articleId = this.tableData[index]._id
      this.$router.push({path: '/admin/ArticleModify', query: { articleId: articleId }})
    },
    handleCurrentChange (val) {
      this.page = val
      this.init()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="css">
.row-bg {
    background-color: #99a9bf;
    width: 100%;
    height: 837px;
    border-radius: 2px;
}
.container {
  width: 1000px;
}

</style>
