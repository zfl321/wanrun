<template>
  <div>
    <el-card shadow="always">
      <el-container>
        <!-- 树形控件侧边栏 -->
        <el-aside width="150px" class="my-aside">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <!-- 主要内容 -->
        <el-main style="padding: 0">
          <el-row>
            <el-col :span="24">
              <el-button type="primary">新增</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="tableData3" border style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>
<script>
import { getDictList } from '@/api'
export default {
  data () {
    return {
      /* 表格数据 */
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      /* 树形控件数据 */
      data: null,
      defaultProps: {
        children: 'children',
        label: 'value'
      }
    };
  },
  created () {
    // 调用初始化树形控件数据方法
    this.initList()
  },
  methods: {
    // 初始化树形控件数据
    initList () {
      getDictList().then(res => {
        console.log(res)
        if (res.status === 200) {
          this.data = res.data.rows.children
          console.log(this.data)
        }
      })
    },

    handleNodeClick (data) {
      console.log(data);
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
}
.my-aside {
  border-right: 1px solid #409eff;
  margin-right: 10px;
}
</style>
