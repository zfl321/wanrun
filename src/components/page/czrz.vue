<template>
  <div class="my-box">
    <!-- 内容区域 -->
    <el-row>
      <el-card shadow="always">
        <div class="my-header-table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            max-height="70vh"
            style="width: 100%"
          >
            <el-table-column prop="username" label="操作人" width="150"></el-table-column>
            <el-table-column prop="operation" label="操作描述" width="150"></el-table-column>
            <el-table-column prop="createTime" label="操作时间" width="150"></el-table-column>
            <el-table-column prop="time" label="操作用时（毫秒）" width="150"></el-table-column>
            <!-- <el-table-column prop="method" label="执行方法" width="150"></el-table-column> -->
            <el-table-column prop="ip" label="ip地址" width="150"></el-table-column>
            <el-table-column prop="location" label="操作地点"></el-table-column>

            <!-- 操作按钮列 -->
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <!-- 删除按钮 -->
                <el-button
                  size="mini"
                  type="primary"
                  circle
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { delLog, getLog } from '@/api'
export default {
  data () {
    return {
      tableData: null
    }
  },
  computed: {
  },
  // 注册表格组件
  components: {
  },
  created () {
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {

    // 初始化表格数据
    initList () {
      getLog()
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.rows
          }
        })
    },
    // 删除
    handleDelete (row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        console.log(row)
        delLog(row.id)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message.success("删除成功")
              this.initList()
            } else {
              this.$message.error("删除失败")
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
