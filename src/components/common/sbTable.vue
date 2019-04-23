<template>
  <div class="sbTable">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="建筑"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="楼层"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="房间号">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span class="status">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: 'A 栋',
          name: '一层',
          address: '1518',
          status: '切换失败',
        }, {
          date: 'A 栋',
          name: '一层',
          address: '1518',
          status: '切换失败',
        }, {
          date: 'A 栋',
          name: '一层',
          address: '1518',
          status: '切换失败',
        }, {
          date: 'A 栋',
          name: '一层',
          address: '1518',
          status: '切换失败',
        }]
      }
    }
  }
</script>

<style lang="scss">
  .sbTable {
    .status {
      color: #f56c6c;
      font-weight: bold;
    }
  }
</style>