<template>
  <div class="my-box" v-loading="loading">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-collapse-transition>
          <div v-show="foldData" style="margin-bottom: 10px">
            <el-form>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="品牌">
                    <el-select
                      v-model="seekData.brandName"
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
                  <el-form-item label="房间类型">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.typeName"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-collapse-transition>
        <!-- 按钮行 -->
        <el-row>
          <el-col :span="19">
            <el-button @click="addBtn" v-if="showadd!=-1">新增</el-button>
            <el-button @click="batchesDelete" v-if="showdelete!=-1">批量删除</el-button>
            <div style="color: #fff;">.</div>
          </el-col>
          <el-col :span="5" class="reset-button">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button>重置</el-button>
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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="brandName" label="品牌" width="120"></el-table-column>
            <el-table-column prop="typeName" label="房间类型" width="120"></el-table-column>
            <el-table-column prop="eqTypeName" label="设备类型" width="120"></el-table-column>
            <el-table-column prop="eqName" label="设备名称" width="120"></el-table-column>
            <el-table-column prop="eqCode" label="设备编号" width="120"></el-table-column>
            <el-table-column prop="hardwareId" label="硬件id" width="120"></el-table-column>
            <el-table-column prop="loopNumber" label="回路编号"></el-table-column>

            <!-- 操作按钮列 -->
            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <!-- 编辑按钮 -->
                <el-button
                  v-if="showupdate!=-1"
                  type="primary"
                  circle
                  icon="el-icon-edit"
                  size="mini"
                  dialogFormVisible
                  @click="handleEdit(scope.row)"
                ></el-button>
                <!-- 删除按钮 -->
                <el-button
                  v-if="showdelete!=-1"
                  size="mini"
                  type="primary"
                  circle
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
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
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑房类型" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="editData" :rules="myrules">
        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="editData.brandId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in brandSelectData"
              :key="index"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型" prop="typeName" :label-width="formLabelWidth">
          <el-input v-model="editData.typeName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="roomNumber" :label-width="formLabelWidth">
          <el-input v-model="editData.eqCode" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="mainBoardIp" :label-width="formLabelWidth">
          <el-select v-model="editData.eqType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in eqTypeSelectData"
              :key="index"
              :label="item.valuee"
              :value="item.keyy"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备" :label-width="formLabelWidth">
          <el-select v-model="editData.eqId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in eqSelectData"
              :key="index"
              :label="item.eqName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬件id" :label-width="formLabelWidth">
          <el-input v-model="editData.hardwareId" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="回路编号" :label-width="formLabelWidth">
          <el-input v-model="editData.loopNumber" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增客房类型" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform" :rules="myrules">
        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="addform.brandId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in brandSelectData"
              :key="index"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型" prop="typeName" :label-width="formLabelWidth">
          <el-input v-model="addform.typeName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="roomNumber" :label-width="formLabelWidth">
          <el-input v-model="addform.eqCode" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="mainBoardIp" :label-width="formLabelWidth">
          <el-select v-model="addform.eqType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in eqTypeSelectData"
              :key="index"
              :label="item.valuee"
              :value="item.keyy"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备" :label-width="formLabelWidth">
          <el-select v-model="addform.eqId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in eqSelectData"
              :key="index"
              :label="item.eqName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬件id" :label-width="formLabelWidth">
          <el-input v-model="addform.hardwareId" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="回路编号" :label-width="formLabelWidth">
          <el-input v-model="addform.loopNumber" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBoomTypelList, getEqSelect, getEqTypeSelect, addRoomType, getFloorSelect, getHotelSelect, getBoomTypelSelect, getBuildingSelect, delRoomType, getRights, getBrandSelect, editRoomType, getHotelSeek } from '@/api'
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
        brandName: null,
        typeName: null,
        pageSize: 10,
        pageNum: 1
      },
      hotelId: null,
      brandId: null,
      // 新增
      addform: {
        brandId: null,  //品牌
        typeName: null,   //房间类型
        eqCode: null,   //设备编号
        eqType: null,   //设备类型
        eqId: null,   //设备名称
        hardwareId: null,   //硬件id
        loopNumber: null,   //回路编号
      },
      // 下拉框的数据
      brandSelectData: null,
      hotelSelectData: null,
      buildingSelectData: null,
      floorSelectData: null,
      eqTypeSelectData: null,
      roomTypeSelectData: null,
      eqSelectData: null,
      options: regionData,
      selectedOptions: [],
      // 编辑
      editData: {
        brandId: null,  //品牌
        typeName: null,   //房间类型
        eqCode: null,   //设备编号
        eqType: null,   //设备类型
        eqId: null,   //设备名称
        hardwareId: null,   //硬件id
        loopNumber: null,   //回路编号
      },
      myrules: {
        typeName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        mainBoardIp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],

      },
      userJurisdiction: null,
      defaultProps: {
        children: 'children',
        label: 'title'
      },

    }
  },
  computed: {
    // 权限
    showadd: function () {
      return this.userJurisdiction.indexOf("roomType:add")
    },
    showdelete: function () {
      return this.userJurisdiction.indexOf("roomType:delete")
    },
    showupdate: function () {
      return this.userJurisdiction.indexOf("roomType:update")
    }
  },
  // 注册表格组件
  components: {
  },
  created () {
    this.userJurisdiction = JSON.parse(localStorage.getItem('userJurisdiction'));
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {

    // 初始化表格数据
    initList (obj) {
      this.loading = true
      getBoomTypelList(obj).then(res => {
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
      getEqTypeSelect().then((res) => {
        if (res.status === 200) {
          this.eqTypeSelectData = res.data
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
    // selectFour(id){

    // },

    /* 展开搜索头部 */
    fold () {
      this.foldData = !this.foldData
      if (this.foldData) {
        this.initialize();
      }
    },

    /* 新增弹窗 */
    // 获取品牌下拉框
    addBtn () {
      this.dialogFormVisible = true
      this.initialize();
      getEqSelect().then((res) => {
        // console.log(res)
        this.eqSelectData = res.data
      })
    },

    // 确定按钮
    confirmAdd () {
      // addform.province = selectedOptions
      // console.log(this.addform)
      this.loading = true
      addRoomType(this.addform)
        .then((res) => {
          this.loading = false
          if (res.data.code == 1) {
            this.$message.success(res.data.message)
            this.initList()
            this.dialogFormVisible = false
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 取消按钮
    abrogateAdd () {
      this.dialogFormVisible = false
    },

    // 楼层删除
    handleDelete (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该楼层, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        // console.log(row.id)
        delRoomType(row.id)
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

    batchesDelete () {
      if (this.multipleSelection.length != 0) {
        // 把要删除的用户ID以字符串拼接
        let number = ""
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const element = this.multipleSelection[i];
          number += element.id + ","
        }
        number = number.slice(0, number.length - 1)  //去掉最后的逗号
        this.$confirm('此操作将永久删除所有选择, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delRoomType(number)
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
        this.$message.warning("请先选择要删除的数据")
      }
    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
      // console.log(val)
    },

    // 编辑楼层
    handleEdit (index, row) {
      console.log(index)
      // console.log(brandName)
      this.editData.brandId = parseInt(index.brandId)
      this.editData.typeName = index.typeName
      this.editData.eqCode = index.eqCode
      this.editData.eqType = index.eqType
      this.editData.eqId = parseInt(index.eqId)
      this.editData.hardwareId = index.hardwareId
      this.editData.loopNumber = index.loopNumber
      this.dialogFormVisible2 = true
      this.initialize();
      getEqSelect().then((res) => {
        // console.log(res)
        this.eqSelectData = res.data
      })
    },
    // 编辑确认
    confirmEditD () {
      // console.log(this.editData);
      this.loading = true
      editRoomType(this.editData).then(res => {
        this.loading = false
        if (res.data.code == 1) {
          this.$message.success(res.data.message)
          this.initList()
          this.dialogFormVisible2 = false
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 查询按钮
    handleSearch () {
      console.log(this.seekData)
      if (this.seekData) {
        getBoomTypelList(this.seekData).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.tableData = res.data.rows
          }
        })
      } else {
        this.initList()
      }
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
    .el-cascader {
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
