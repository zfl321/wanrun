<template>
  <div v-loading="loading">
    <el-card shadow="always">
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" class="my-aside">
          <el-row>
            <el-button @click="addBtnl" v-if="showadd!=-1">新增</el-button>
            <el-button v-if="showdelete!=-1" type="primary" @click="handleDeletebtn">删除</el-button>
          </el-row>
          <el-row v-for="(item,index) in data" :key="index">
            <el-button
              plain
              icon="el-icon-circle-plus-outline"
              @click="listClick(item)"
              style="margin-left: 0;border:0 ;"
            >{{item.value}}</el-button>
          </el-row>
        </el-aside>
        <!-- 主要内容 -->
        <el-main style="padding: 0">
          <el-row>
            <el-col :span="24" style="text-align: right;">
              <el-button @click="addBtnr" v-if="showadd!=-1">新增</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="key" label="参数名	"></el-table-column>
                <el-table-column prop="value" label="参数值	"></el-table-column>
                <el-table-column prop="parentId" label="类型编号	"></el-table-column>
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
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-card>
    <!-- 新增的弹框 -->
    <el-dialog title="新增字典" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform">
        <el-form-item label="参数名" :label-width="formLabelWidth">
          <el-input v-model="addform.keyy" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="参数值	" :label-width="formLabelWidth">
          <el-input v-model="addform.valuee" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑字典" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="editdform">
        <el-form-item label="参数名" :label-width="formLabelWidth">
          <el-input v-model="editdform.keyy" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="参数值	" :label-width="formLabelWidth">
          <el-input v-model="editdform.valuee" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getDictList, addDict, delDict, editDict } from '@/api'
export default {
  data () {
    return {
      formLabelWidth: "100px",
      loading: false,
      dialogFormVisible: null,
      dialogFormVisible2: null,
      userJurisdiction: null,
      /* 表格数据 */
      tableData: null,
      /* 树形控件数据 */
      data: null,
      defaultProps: {
        label: 'value'
      },
      id: null,
      addform: {
        parentId: 0,
        keyy: null,
        valuee: null,
      },
      editdform: {
        dictId: null,
        keyy: null,
        valuee: null,
      }
    };
  },
  computed: {
    // 权限
    showadd: function () {
      return this.userJurisdiction.indexOf("dict:add")
    },
    showdelete: function () {
      return this.userJurisdiction.indexOf("dict:delete")
    },
    showupdate: function () {
      return this.userJurisdiction.indexOf("dict:update")
    }
  },
  created () {
    this.userJurisdiction = JSON.parse(localStorage.getItem('userJurisdiction'));
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {
    // 初始化树形控件数据
    initList () {
      getDictList().then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.data = res.data.rows.children
        }
      })
    },
    //父级删除按钮
    handleDeletebtn () {
      if (this.addform.parentId != 0) {
        if (this.tableData) {
          this.$message.error("请先删除父级下的所有子级")
        } else {
          this.$confirm('此操作将永久删除该父级, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 点击确定执行的操作
            // console.log(row.id)
            delDict(this.id)
              .then(res => {
                console.log(res)
                if (res.status === 200) {
                  this.$message.success("删除成功")
                  this.initList()
                  this.tableData = null
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
        }
      } else {
        this.$message.error("请先选择要删除的父级")
      }
    },
    // 子级删除
    handleDelete (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该子级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        // console.log(row.id)
        delDict(row.id)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.$message.success("删除成功")
              this.initList()
              this.tableData = null
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
    // 新增按钮
    /* 新增弹窗 */
    addBtnl () {
      this.dialogFormVisible = true
      this.addform.parentId = 0
    },
    addBtnr () {
      if (this.addform.parentId != 0) {
        this.dialogFormVisible = true
      } else {
        this.$message.error("请先选择要添加的父级")
      }

    },
    // 确定按钮
    confirmAdd () {
      this.loading = true
      addDict(this.addform)
        .then((res) => {
          this.loading = false
          if (res.data.code == 1) {
            this.$message.success(res.data.message)
            this.initList()
            this.tableData = null
            this.dialogFormVisible = false
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // 取消按钮
    abrogateAdd () {
      this.dialogFormVisible = false
    },
    // 编辑
    handleEdit (index, row) {
      this.editdform.keyy = index.key
      this.editdform.valuee = index.value
      this.editdform.dictId = index.id
      this.dialogFormVisible2 = true

    },
    // 编辑确认
    confirmEditD () {
      // console.log(this.editData);
      this.loading = true
      editDict(this.editdform).then(res => {
        this.loading = false
        if (res.data.code == 1) {
          this.$message.success(res.data.message)
          this.initList()
          this.tableData = null
          this.dialogFormVisible2 = false
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    //列表点击事件
    listClick (obj) {
      this.tableData = obj.children
      this.addform.parentId = obj.key
      this.id = obj.id
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
