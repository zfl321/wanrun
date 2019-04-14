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
                  <el-form-item label="设备类型" :label-width="formLabelWidth">
                    <el-select v-model="seekData.eqType" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in eqTypeSelectData"
                        :key="index"
                        :label="item.brandName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="设备名称">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.eqId"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="硬件ID">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.hardwareId"
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
            <el-button @click="addBtn">新增</el-button>
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
            <el-table-column prop="eqTypeName" label="设备类型" width="120"></el-table-column>
            <el-table-column prop="eqName" label="设备名称" width="120"></el-table-column>
            <el-table-column prop="hardwareId" label="硬件id" width="120"></el-table-column>
            <el-table-column prop="describes" label="描述"></el-table-column>

            <!-- 操作按钮列 -->
            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <!-- 编辑按钮 -->
                <el-button
                  type="primary"
                  circle
                  icon="el-icon-edit"
                  size="mini"
                  dialogFormVisible
                  @click="handleEdit(scope.row)"
                ></el-button>
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
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑设备" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="editData" :rules="myrules">
        <el-form-item label="设备类型" :label-width="formLabelWidth">
          <el-select v-model="editData.eqType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in eqTypeSelectData"
              :key="index"
              :label="item.valuee"
              :value="item.keyy"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="mainBoardIp" :label-width="formLabelWidth">
          <el-input v-model="editData.eqName" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="硬件id" :label-width="formLabelWidth">
          <el-input v-model="editData.hardwareId" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="5"
            clearable
            placeholder="请输入内容"
            v-model="editData.describes"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmEditD" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增设备" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform" :rules="myrules">
        <el-form-item label="设备类型" :label-width="formLabelWidth">
          <el-select v-model="addform.eqType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in eqTypeSelectData"
              :key="index"
              :label="item.valuee"
              :value="item.keyy"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="mainBoardIp" :label-width="formLabelWidth">
          <el-input v-model="addform.eqName" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="硬件id" :label-width="formLabelWidth">
          <el-input v-model="addform.hardwareId" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addform.describes"></el-input>
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
import { getEqlList, getEqSelect, addEq, getEqTypeSelect, delEq, getRights, editEq } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      loading: false,
      // 建筑列表数据
      tableData: null,
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      // 查询的数据
      seekData: {
        eqType: null,   //设备类型id
        eqTypeName: null,   //设备类型
        eqId: null,   //设备名称
        hardwareId: null,   //硬件id
      },
      hotelId: null,
      brandId: null,
      // 新增
      addform: {
        eqType: null,   //设备类型
        eqName: null,   //设备名称
        hardwareId: null,   //硬件id
        describes: null,   //描述
      },
      // 下拉框的数据
      eqSelectData: null,
      eqTypeSelectData: null,
      options: regionData,
      selectedOptions: [],
      eqdata: {

      },
      // 编辑
      editData: {
        eqType: null,   //设备类型
        eqName: null,   //设备名称
        hardwareId: null,   //硬件id
        describes: null,   //描述
        id: null
      },
      myrules: {
        typeName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        mainBoardIp: [
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
    initList () {
      this.loading = true
      getEqlList().then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.tableData = res.data.rows
          this.loading = false
        }
      })
    },

    /* 初始化下拉框 */
    // 获取设备类型下拉框
    initialize () {
      getEqTypeSelect().then((res) => {
        if (res.status === 200) {
          this.eqTypeSelectData = res.data
          // console.log(res)
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

    /* 新增弹窗 */
    addBtn () {
      this.dialogFormVisible = true
      this.initialize();
    },

    // 确定按钮
    confirmAdd () {
      // addform.province = selectedOptions
      // console.log(this.addform)
      this.loading = true
      addEq(this.addform)
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
        delEq(row.id)
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

    handleSelectionChange (val) {
      this.multipleSelection = val;
    },

    // 编辑楼层
    handleEdit (index, row) {
      console.log(index);
      this.initialize()
      this.editData.eqType = index.eqType
      this.editData.eqName = index.eqName
      this.editData.hardwareId = index.hardwareId
      this.editData.describes = index.describes
      this.editData.id = index.id
      this.dialogFormVisible2 = true

    },
    // 编辑楼层确认
    confirmEditD () {
      // console.log(this.editData);
      this.loading = true
      editEq(this.editData).then(res => {
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
      // console.log(this.seekData)
      if (this.seekData) {
        this.loading = true
        getEqlList(this.seekData).then((res) => {
          // console.log(res)
          if (res.status === 200) {
            this.tableData = res.data.rows
            this.loading = false
          }
        })
      } else {
        this.initList()
      }

    },



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
