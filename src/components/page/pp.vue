<template>
  <div class="my-box">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-collapse-transition>
          <div v-show="foldData" style="margin-bottom: 10px">
            <el-form>
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="品牌">
                    <el-select v-model="seekData.brandId" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in brandSelectData"
                        :key="index"
                        :label="item.brandName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="brandName" label="品牌名称" width="150"></el-table-column>
            <el-table-column prop="createUser" label="创建用户" width="150"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="190"></el-table-column>
            <el-table-column prop="description" label="品牌介绍"></el-table-column>

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
    <el-dialog title="编辑品牌" :visible.sync="dialogFormVisible2">
      <el-form :model="editData" :rules="myrules">
        <el-form-item label="名称" prop="brandName" :label-width="formLabelWidth">
          <el-input v-model="editData.brandName"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="10"
            clearable
            placeholder="请输入内容"
            v-model="editData.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmEditD">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增品牌" :visible.sync="dialogFormVisible">
      <el-form :model="addform" :rules="myrules">
        <el-form-item label="名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="addform.brandName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            clearable
            :rows="10"
            placeholder="请输入内容"
            v-model="addform.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBrandList, addBrand, delBrand, getRights, getBrandSelect, getBrandSeek, editBrand } from '@/api'
export default {
  data () {
    return {
      // 品牌列表数据
      tableData: [],
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      // 查询的数据
      seekData: {
        brandId: null,
      },
      brandSelectData: null,
      // 新增
      addform: {
        brandName: null,  //品牌名称
        description: null,   //品牌描述
      },
      // 编辑
      editData: {
        brandName: null,
        description: null,
        id: null
      },
      myrules: {
        brandName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
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
      getBrandList()
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.rows
            localStorage.setItem('role', JSON.stringify(res.data.rows))
            // 给totalNum赋值
            // this.totalNum = res.data.data.total
          }
        })
    },
    /* 初始化下拉框 */
    // 获取品牌下拉框
    initialize () {
      getBrandSelect().then((res) => {
        // console.log(res)
        if (res.status === 200) {
          this.brandSelectData = res.data
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
    // 新增弹窗
    addBtn () {
      this.dialogFormVisible = true
    },
    // 确定按钮
    confirmAdd () {
      console.log(this.addform)
      addBrand(this.addform)
        .then((res) => {
          console.log(res)
          this.initList()
          this.dialogFormVisible = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 取消按钮
    abrogateAdd () {
      this.dialogFormVisible = false
    },

    // 删除品牌
    handleDelete (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        console.log(row.id)
        delBrand(row.id)
          .then(res => {
            console.log(res)
            if (res.data.code == 1) {
              this.$message.success(res.data.message)
              this.initList()
            } else {
              this.$message.error(res.data.message)
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 点击查看用户详情
    handleDetails (row) {
      this.dialogVisible = true

    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
    },

    // 编辑品牌
    handleEdit (index, row) {
      this.editData.brandName = index.brandName
      this.editData.description = index.description
      this.editData.id = index.id
      this.dialogFormVisible2 = true
    },
    // 编辑品牌确认
    confirmEditD () {
      editBrand(this.editData).then(res => {
        if (res.data.code) {
          this.dialogFormVisible2 = false
          this.initList()
          this.$message({
            message: res.data.message,
            type: 'success'
          });
        }
      })
    },
    // 查询按钮
    handleSearch () {
      if (this.seekData.brandId) {
        getBrandSeek(this.seekData.brandId).then((res) => {
          console.log(this.tableData)
          if (res.status === 200) {
            this.tableData = [res.data]
            console.log(this.tableData)
          }
        })
      } else {
        this.initList()
      }
    },
    // 重置按钮
    reset () {
      this.seekData.brandId = null  //品牌
    }

  }
}
</script>
<style lang="scss" scoped>
.my-box {
  .my-iemt {
    span {
      font-size: 14px;
    }
    white-space: nowrap;
    .my-input {
      max-width: 200px;
    }
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
