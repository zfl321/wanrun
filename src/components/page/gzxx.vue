<template>
  <div class="my-box" v-loading="loading">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-form label-width="80px">
          <el-row :gutter="10" style="margin-bottom: 0px;">
            <el-col :span="6">
              <el-form-item label="品牌">
                <el-select
                  v-model="seekData.brandId"
                  @change="selectOne"
                  clearable
                  placeholder="请选择"
                >
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
                <el-select
                  v-model="seekData.hotelId"
                  @change="selectTwo"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,index) in hotelSelectData"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="建筑">
                <el-select
                  v-model="seekData.buildingId"
                  @change="selectThree"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,index) in buildingSelectData"
                    :key="index"
                    :label="item.buildingName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="楼层">
                <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                  <el-option
                    v-for="(item,index) in floorSelectData"
                    :key="index"
                    :label="item.floorName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-collapse-transition>
            <div v-show="foldData" style="margin-bottom: 10px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="房间号">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.mainBoardIp"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="状态">
                    <el-select v-model="seekData.repaired" clearable placeholder="请选择">
                      <el-option
                        v-for="item in options11"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="故障类型">
                    <el-select v-model="seekData.type" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in deviceFaultSelectData"
                        :key="index"
                        :label="item.valuee"
                        :value="item.keyy"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-form>
        <!-- 按钮行 -->
        <el-row>
          <el-col :span="19">
            <el-button @click="disposeBtn">处理</el-button>
          </el-col>
          <el-col :span="5" class="reset-button">
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
            height="54vh"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" disabled width="55"></el-table-column>
            <el-table-column prop="brandName" label="品牌" width="120"></el-table-column>
            <el-table-column prop="hotelName" label="门店" width="120"></el-table-column>
            <el-table-column prop="buildingName" label="建筑" width="120"></el-table-column>
            <el-table-column prop="floorName" label="楼层" width="80"></el-table-column>
            <el-table-column prop="roomNumber" label="房间号" width="70"></el-table-column>
            <el-table-column prop="repaired" label="处理状态" width="120">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.repaired==1" type="success">已处理</el-tag>
                <el-tag v-else type="danger">未处理</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="typeName" label="故障类型" width="120"></el-table-column>
            <el-table-column prop="findTime" label="发生时间" width="150"></el-table-column>
            <el-table-column prop="respondTime" label="处理时间" width="150"></el-table-column>
            <!-- <el-table-column prop="remark" label="描述" show-overflow-tooltip></el-table-column> -->
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, sizes, total, jumper"
            :page-sizes="[5, 10, 15, 20]"
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
import { getDeviceFaultList, editDeviceFault, getKeyySelect, getFloorSelect, getHotelSelect, getBoomTypelSelect, getBuildingSelect, getRights, getBrandSelect, getHotelSeek } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      multipleSelection: [],
      loading: false,
      // 建筑列表数据
      tableData: null,
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      // 查询的数据
      total: null,
      seekData: {
        buildingId: null,
        floorId: null,
        mainBoardIp: null,
        mainBoardId: null,
        hotelId: null,
        brandId: null,
        pageSize: 10,
        pageNum: 1
      },
      //状态
      options11: [{
        value: '1',
        label: '已处理'
      }, {
        value: '0',
        label: '未处理'
      }],
      // 下拉框的数据
      brandSelectData: null,
      hotelSelectData: null,
      buildingSelectData: null,
      floorSelectData: null,
      roomTypeSelectData: null,
      deviceFaultSelectData: null,
      options: regionData,
      selectedOptions: [],

      myrules: {
        roomNumber: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        mainBoardIp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        mainBoardId: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],

      },

      defaultProps: {
        children: 'children',
        label: 'title'
      },

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
      getDeviceFaultList(obj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.tableData = res.data.rows
          this.total = res.data.total
          this.loading = false
        }
      })
    },

    /* 初始化下拉框 */
    // 获取品牌下拉框
    initialize () {
      getBrandSelect().then((res) => {
        if (res.status === 200) {
          this.brandSelectData = res.data
          // console.log(res)
        }
      })
      getKeyySelect().then((res) => {
        if (res.status === 200) {
          this.deviceFaultSelectData = res.data
          console.log(res)
        }
      })
    },
    // 获取门店下拉框
    selectOne (id) {
      // console.log(id)
      getHotelSelect(id).then((res) => {
        // console.log(res)
        if (res.data) {
          this.hotelSelectData = res.data
        } else {
          this.$message({
            message: '该品牌下没有门店数据',
            type: 'warning'
          });
        }
      })
      // 获取房间类型下拉框
      getBoomTypelSelect(id).then((res) => {
        if (res.status === 200) {
          this.roomTypeSelectData = res.data
          // console.log(res)
        }
      })
    },
    // 获取建筑下拉框
    selectTwo (id) {
      // console.log(id)
      getBuildingSelect(id).then((res) => {
        // console.log(res)
        if (res.data.length > 0) {
          this.buildingSelectData = res.data
        } else {
          this.$message({
            message: '该门店下没有建筑数据',
            type: 'warning'
          });
        }
      })
    },
    // 获取楼层下拉框
    selectThree (id) {
      // console.log(id)
      getFloorSelect(id).then((res) => {
        console.log(res)
        if (res.data.length > 0) {
          this.floorSelectData = res.data
        } else {
          this.$message({
            message: '该建筑下没有楼层数据',
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





    disposeBtn () {
      if (this.multipleSelection.length != 0) {
        // 把要删除的用户ID以字符串拼接
        let number = ""
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const element = this.multipleSelection[i];
          number += element.id + ","
        }
        number = number.slice(0, number.length - 1)  //去掉最后的逗号
        this.$confirm('是否改为处理状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          editDeviceFault(number)
            .then(res => {
              this.loading = false
              if (res.data.code == 1) {
                this.$message.success(res.data.message)
                this.initList()
              } else {
                this.$message.error(res.data.message)
              }
            })
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message.warning("请先选择要处理的数据")
      }
    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
      // console.log(val)
    },


    // 查询按钮
    handleSearch () {
      // console.log(this.seekData)
      if (this.seekData) {
        this.initList(this.seekData)
      } else {
        this.initList()
      }
    },
    // 重置按钮
    reset () {
      this.seekData.buildingId = null,
        this.seekData.floorId = null,
        this.seekData.mainBoardIp = null,
        this.seekData.mainBoardId = null,
        this.seekData.hotelId = null,
        this.seekData.brandId = null,
        this.seekData.repaired = null,
        this.seekData.type = null
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
.my-box {
  .astrict {
    .el-select {
      width: 100%;
    }
  }
  .my-iemt {
    span {
      font-size: 14px;
    }
    white-space: nowrap;
  }
  .my-input {
    max-width: 200px;
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    height: 36px;
    white-space: nowrap;
    .el-input__inner {
      max-width: 190px;
    }
    span {
      font-size: 14px;
    }
  }
  .reset-button {
    text-align: right;
    .my-icont {
      // font-size: 14px;
      color: #409eff;
      border: none;
    }
  }
}
</style>
