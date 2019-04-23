<template>
  <div class="my-box" v-loading="loading">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-collapse-transition>
          <div v-show="foldData" style="margin-bottom: 10px">
            <el-form label-position="right" inline>
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-form-item label="角色名">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.roleName"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="创建人">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.createUser"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <div class>
                    <el-form-item label="创建时间">
                      <el-date-picker
                        v-model="createTime"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
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
            <div style="color: #fff; display: inline-block;">.</div>
          </el-col>
          <el-col :span="5" class="reset-button">
            <el-button type="primary" @click="handleSearch" :loading="loading">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button plain class="my-icont" @click="foldData=!foldData">
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
            <el-table-column prop="roleName" label="角色" width="120"></el-table-column>
            <el-table-column prop="createUser" label="创建人" width="120"></el-table-column>
            <el-table-column label="创建时间" width="150">
              <template slot-scope="scope">{{ scope.row.createTime }}</template>
            </el-table-column>
            <el-table-column label="修改时间" width="150">
              <template slot-scope="scope">{{ scope.row.modifyTime }}</template>
            </el-table-column>
            <el-table-column prop="remark" label="描述" show-overflow-tooltip></el-table-column>

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
            :page-size="putData.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-card>
    </el-row>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisible2">
      <el-form :model="editData" :ref="editData" :rules="myrules">
        <el-form-item label="名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="editData.roleName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="editData.remark" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="权限选择" :label-width="formLabelWidth">
          <el-tree
            :data="menuTreeData"
            :default-checked-keys="editData.menuId"
            ref="trees"
            show-checkbox
            highlight-current
            check-strictly
            accordion
            node-key="id"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD(editData)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form :model="addform" :ref="addform" :rules="myrules">
        <el-form-item label="名称" prop="roleName" :label-width="formLabelWidth">
          <el-input v-model="addform.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addform.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="权限选择" :label-width="formLabelWidth">
          <el-tree
            :data="menuTreeData"
            ref="tree"
            node-key="id"
            :default-checked-keys="addform.menuId"
            highlight-current
            check-strictly
            show-checkbox
            accordion
            :props="defaultProps"
          ></el-tree>
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
import { getRoleList, addRole, delRole, getRights, getRightsId, editRole } from '@/api'
export default {
  data () {
    return {
      userJurisdiction: null,
      multipleSelection: [],
      // 角色列表数据
      tableData: [],
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      // 查询的数据
      createTime: null,
      seekData: {
        roleName: null,
        createUser: null,
        createTimeFrom: null,
        createTimeTo: null
      },
      // 新增
      addform: {
        roleName: null,  //角色名称
        remark: null,   //角色描述
        menuId: null   //权限id
      },
      menuTreeData: null,
      allTreeKeys: null,
      // 编辑
      loading: false,
      total: null,
      putData: {
        roleName: null,
        remark: null,
        roleId: null,
        menuId: null,
        pageSize: 10,
        pageNum: 1
      },
      editData: {
        roleName: null,
        remark: null,
        roleId: null,
        menuId: null
      },

      myrules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ]
      },

      defaultProps: {
        children: 'children',
        label: 'title'
      },

    }
  },
  computed: {
    // 权限
    showadd: function () {
      return this.userJurisdiction.indexOf("role:add")
    },
    showdelete: function () {
      return this.userJurisdiction.indexOf("role:delete")
    },
    showupdate: function () {
      return this.userJurisdiction.indexOf("role:update")
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
      getRoleList(obj)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.rows
            this.total = res.data.total
            this.loading = false
            // 给totalNum赋值
            // this.totalNum = res.data.data.total
          }
        })
    },
    // 新增弹窗
    addBtn () {
      this.dialogFormVisible = true
      // 获取权限列表
      getRights().then(res => {
        // console.log(res);
        this.menuTreeData = res.data.rows.children
      })
    },
    // 确定按钮
    confirmAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.addform.menuId = this.$refs.tree.getCheckedKeys().join(',')
          // console.log(this.addform)
          addRole(this.addform)
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
              // console.log(err)
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

    // 删除用户
    handleDelete (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        console.log(row.roleId)
        delRole(row.roleId)
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
    // 批量删除
    batchesDelete () {
      if (this.multipleSelection.length != 0) {
        // 把要删除的角色ID以字符串拼接
        let number = ""
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const element = this.multipleSelection[i];
          number += element.roleId + ","
        }
        number = number.slice(0, number.length - 1)  //去掉最后的逗号
        this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delRole(number)
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
      getRights().then(res => {
        this.menuTreeData = res.data.rows.children
        this.allTreeKeys = res.data.ids
      })

    },

    handleSelectionChange (val) {
      this.multipleSelection = val;
    },

    // 编辑用户
    handleEdit (index, row) {
      // console.log(index);
      this.loading = true
      this.dialogFormVisible2 = true
      getRights(index.roleId).then(res => {
        this.menuTreeData = res.data.rows.children
      }).then(() => {
        getRightsId(index.roleId).then((res) => {
          // console.log(res);
          this.editData.menuId = res.data
        }).then(() => {
          this.editData.roleName = index.roleName
          this.editData.remark = index.remark
          this.editData.roleId = index.roleId
          this.loading = false
          // this.editData.menuId = this.allTreeKeys
        })
      })
      // console.log(this.editData);
    },
    // 编辑用户确认
    confirmEditD (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.putData.roleName = this.editData.roleName
          this.putData.remark = this.editData.remark
          this.putData.roleId = this.editData.roleId
          this.putData.menuId = this.$refs.trees.getCheckedKeys().join(',')
          // console.log(this.putData)
          // console.log(this.editData)
          editRole(this.putData).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.loading = false
              this.dialogFormVisible2 = false
              this.initList()
              this.$message.success(res.data.message)
            } else {
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
      this.loading = true
      if (this.createTime) {
        this.seekData.createTimeTo = this.createTime[1] + " 23:59:59"
        this.seekData.createTimeFrom = this.createTime[0] + " 00:00:00"
      }
      // console.log(this.seekData)
      getRoleList(this.seekData).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.tableData = res.data.rows
          this.loading = false
        }
      })
    },
    // 重置按钮
    reset () {
      this.createTime = null
      this.seekData.roleName = null
      this.seekData.createUser = null
      this.seekData.createTimeFrom = null
      this.seekData.createTimeT = null
    },
    //分页
    handleCurrentChange (cpage) {
      this.putData.pageNum = cpage;
      this.initList(this.putData)
    },
    handleSizeChange (psize) {
      this.putData.pageSize = psize;
      this.initList(this.putData)
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
