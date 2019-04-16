<template>
  <div class="my-box" v-loading="loading">
    <el-row style="margin-bottom: 10px;">
      <el-card shadow="always">
        <el-collapse-transition>
          <div v-show="foldData" style="margin-bottom: 10px">
            <el-form>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="品牌">
                    <el-select v-model="seekData.brandId" @change="selectOne" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in brandSelectData"
                        :key="index"
                        :label="item.brandName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="门店">
                    <el-select v-model="seekData.hotelId" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in hotelSelectData"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="操作时间">
                    <el-date-picker
                      v-model="createTime"
                      type="daterange"
                      unlink-panels
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-transition>
        <!-- 按钮行 -->
        <el-row>
          <el-col :span="12">
            <el-button @click="exportExcel">导出日志</el-button>
          </el-col>
          <el-col :span="12" class="reset-button">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button plain class="my-icont" @click="fold">
              <div v-if="foldData">
                收起
                <i class="el-icon-arrow-up"></i>
              </div>
              <div v-else>
                展开
                <i class="el-icon-arrow-down"></i>
              </div>
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <!-- 内容区域 -->
    <el-row>
      <el-card shadow="always">
        <div class="my-header-table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            height="70vh"
            style="width: 100%"
            id="out-table"
          >
            <el-table-column prop="brandName" label="品牌" width="130"></el-table-column>
            <el-table-column prop="hotelName" label="门店" width="130"></el-table-column>
            <el-table-column prop="username" label="操作人" width="130"></el-table-column>
            <el-table-column prop="fullName" label="真实姓名" width="130"></el-table-column>
            <el-table-column prop="operation" label="操作描述" width="130"></el-table-column>
            <el-table-column prop="createTime" label="操作时间" width="150"></el-table-column>
            <el-table-column prop="time" label="操作用时（毫秒）" width="130"></el-table-column>
            <!-- <el-table-column prop="method" label="执行方法" width="150"></el-table-column> -->
            <el-table-column prop="ip" label="ip地址" width="150"></el-table-column>
            <!-- <el-table-column prop="location" label="操作地点"></el-table-column> -->

            <!-- 操作按钮列 -->
            <!-- <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  circle
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </template>
            </el-table-column>-->
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, sizes, total, jumper"
            :page-sizes="[5, 10, 15, 20, 100, 9999]"
            :page-size="seekData.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { delLog, getLoglList, getBrandSelect, getHotelSelect, exportLog } from '@/api'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      hotelSelectData: null,
      brandSelectData: null,
      foldData: false,
      tableData: null,
      loading: false,
      total: null,
      // 查询数据
      createTime: null,
      seekData: {
        brandId: null,
        hotelId: null,
        createTimeTo: null,
        createTimeFrom: null,
        pageSize: 10,
        pageNum: 1
      }
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
    initList (obj) {
      this.loading = true
      getLoglList(obj)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.rows
            this.total = res.data.total
            this.loading = false
          }
        })
    },
    /* 初始化下拉框 */
    // 获取品牌下拉框
    initialize (obj) {
      getBrandSelect(obj).then((res) => {
        if (res.status === 200) {
          this.brandSelectData = res.data
          this.total = res.data.total
          // console.log(res)
        }
      })
    },
    selectOne (id) {
      // console.log(id)
      this.seekData.hotelId = null
      getHotelSelect(id).then((res) => {
        console.log(res)
        if (res.data) {
          this.hotelSelectData = res.data
        } else {
          this.$message({
            message: '该品牌下没有门店',
            type: 'warning'
          });
        }
      })
    },

    /* 展开搜索头部 */
    fold () {
      this.foldData = !this.foldData
      if (this.foldData) {
        this.initialize();
      }
    },
    // 查询按钮
    handleSearch () {
      if (this.createTime) {
        this.seekData.createTimeTo = this.createTime[1] + " 23:59:59"
        this.seekData.createTimeFrom = this.createTime[0] + " 00:00:00"
      }
      // console.log(this.seekData)
      if (this.seekData || this.createTime) {
        console.log(this.seekData)
        this.initList(this.seekData)
      } else {
        this.initList()
      }

    },
    // 导出
    exportl () {
      exportLog().then(() => {

      })
    },
    exportExcel () {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    // 重置按钮
    reset (formName) {
      this.seekData.brandId = null  //品牌
      this.seekData.hotelId = null   //门店
      this.createTime = null
      this.seekData.createTimeTo = null
      this.seekData.createTimeFrom = null
    },
    //分页
    handleCurrentChange (cpage) {
      this.seekData.pageNum = cpage;
      this.initList(this.seekData)
    },
    handleSizeChange (psize) {
      this.seekData.pageSize = psize;
      this.initList(this.seekData)
    }
  }
}
</script>
<style lang="scss" scoped>
.reset-button {
  text-align: right;
  .my-icont {
    // font-size: 14px;
    color: #409eff;
    border: none;
  }
}
</style>
