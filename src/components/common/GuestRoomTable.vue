<template>
  <div class="guestRoomTable">
    <el-table
      :data="roomStatusedList"
      style="width: 100%">
      <el-table-column
        prop="rent"
        label="出租">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if='scope.row.rent'></i>
          <i class="el-icon-close" v-else></i>
        </template>
      </el-table-column>
      <el-table-column
        label="人员识别">
        <template slot-scope="scope">
          <span>{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="warning"
        label="门磁报警">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if='scope.row.doorWarning'></i>
          <i class="el-icon-close" v-else></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="fault"
        label="故障">
        <template slot-scope="scope">
          <i class="el-icon-check" v-if='scope.row.fault'></i>
          <i class="el-icon-close" v-else></i>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if='scope.row.status == "QINGLI"'>请求清理</span>
          <span v-else-if='scope.row.status == "WURAO"'>请勿打扰</span>
          <span v-else-if='scope.row.status == "QINGLIING"'>正在清理</span>
          <span v-else-if='scope.row.status == "JIANCHA"'>等待检查</span>
          <span v-else-if='scope.row.status == "JIANCHAING"'>正在检查</span>
          <span v-else='scope.row.status == ""'>无标志</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="operationType"
        label="操作类型">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="触发时间">
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total=total>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      roomStatusedList: {
        type: Array,
      },
      total: {
        type: Number,
        default: 0
      },
      page: {
        type: Number,
        default: 1,
      },
      pageSize: {
        type: Number,
        default: 10,
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          rent: 1,
          face: '无卡',
          warning: 1,
          fault: 1,
          status: '无标志',
          oper: '插拔卡',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          rent: 0,
          face: '管理员卡',
          warning: 1,
          fault: 0,
          status: '请勿打扰',
          oper: '插拔卡',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          rent: 1,
          face: '客人卡',
          warning: 0,
          fault: 1,
          status: '请即清理',
          oper: '插拔卡',
          address: '上海市普陀区金沙江路 1518 弄',
        }]
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('changePageSize', val)
      },
      handleCurrentChange(val) {
        this.$emit('changePage', val)
      }
    }
  }
</script>

<style lang="scss">
  .guestRoomTable {
    i.el-icon-check {
      font-size: 20px;
      color: #67c23a;
    }
    i.el-icon-close {
      font-size: 20px;
      color: #f56c6c;
    }
    .page {
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-end;
      width: 100%;
    }
  }
</style>