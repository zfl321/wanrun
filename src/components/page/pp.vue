<template>
  <div class="my-box" v-loading="loading">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <!-- <el-collapse-transition>
        <div v-show="foldData" style="margin-bottom: 10px">-->
        <el-form label-width="80px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="品牌">
                <el-input
                  placeholder="请输入内容"
                  v-model="seekData.brandName"
                  clearable
                  class="my-input"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- </div>
        </el-collapse-transition>-->
        <!-- 按钮行 -->
        <el-row>
          <el-col :span="19">
            <el-button @click="addBtn" v-if="showadd!=-1">新增</el-button>
            <el-button @click="batchesDelete" v-if="showdelete!=-1">批量删除</el-button>
            <div style="color: #fff; display: inline-block;">.</div>
          </el-col>
          <el-col :span="5" class="reset-button">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <!-- <el-button plain class="my-icont" @click="fold">
              <div v-if="foldData">
                收起
                <i class="el-icon-arrow-up"></i>
              </div>
              <div v-else>
                展开
                <i class="el-icon-arrow-down"></i>
              </div>
            </el-button>-->
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
    <el-dialog title="编辑品牌" :visible.sync="dialogFormVisible2">
      <el-form :model="editData" :ref="editData" :rules="myrules">
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
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD(editData)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增品牌" :visible.sync="dialogFormVisible">
      <el-form :model="addform" :ref="addform" :rules="myrules">
        <el-form-item label="名称" prop="brandName" :label-width="formLabelWidth">
          <el-input v-model="addform.brandName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            clearable
            :rows="5"
            placeholder="请输入内容"
            v-model="addform.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd(addform)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getBrandList, addBrand, delBrand, getRights, getBrandSelect, getBrandSeek, editBrand, nameVerify } from '@/api'
export default {
  data () {
    /* 品牌名是否重复校验 */
    let Verify = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('不能为空'))
      } else {
        nameVerify('brand', { brandName: value, id: this.editData.id }).then(res => {
          if (res.data) {
            callback()
          } else {
            callback(new Error('你输入的已存在，请重新输入'))
          }
        })
      }
    }
    return {
      multipleSelection: [],
      loading: false,
      // 品牌列表数据
      tableData: [],
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      // 查询的数据
      total: null,
      seekData: {
        brandName: null,
        pageSize: 10,
        pageNum: 1
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
          { required: true, validator: Verify, trigger: 'blur' }
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
      return this.userJurisdiction.indexOf("brand:add")
    },
    showdelete: function () {
      return this.userJurisdiction.indexOf("brand:delete")
    },
    showupdate: function () {
      return this.userJurisdiction.indexOf("brand:update")
    },
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
      getBrandSeek(obj)
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
    confirmAdd (formName) {
      // console.log(this.addform)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addBrand(this.addform)
            .then((res) => {
              // console.log(res)
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 取消按钮
    abrogateAdd () {
      this.dialogFormVisible = false
    },

    // 删除品牌
    handleDelete (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        // console.log(row.id)
        delBrand(row.id)
          .then(res => {
            // console.log(res)
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
    // 批量删除
    batchesDelete () {
      if (this.multipleSelection.length != 0) {
        // 把要删除的用户ID以字符串拼接
        let number = ""
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const element = this.multipleSelection[i];
          number += element.id + ","
        }
        number = number.slice(0, number.length - 1)  //去掉最后的逗号
        this.$confirm('此操作将永久删除所选择品牌, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delBrand(number)
            .then(res => {
              this.loading = false
              if (res.data.code == 1) {
                this.$message.success("删除成功")
                this.initList()
              } else {
                this.$message.error("删除失败")
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
      console.log(val)
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
    confirmEditD (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          editBrand(this.editData).then(res => {
            if (res.data.code == 1) {
              this.$message.success(res.data.message)
              this.loading = false
              this.initList()
              this.dialogFormVisible2 = false
            } else {
              this.loading = false
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 查询按钮
    handleSearch () {
      if (this.seekData.brandName) {
        getBrandSeek(this.seekData).then((res) => {
          console.log(this.tableData)
          if (res.status === 200) {
            this.tableData = res.data.rows
            console.log(this.tableData)
          }
        })
      } else {
        this.initList()
      }
    },
    // 重置按钮
    reset () {
      this.seekData.brandName = null  //品牌
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
  .my-input {
    max-width: 209px;
  }

  .grid-content {
    border-radius: 4px;
    height: 36px;
    white-space: nowrap;
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
