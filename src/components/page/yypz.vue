<template>
  <div v-loading="loading">
    <el-card shadow="always">
      <el-button @click="addBtn" type="primary" style="margin-bottom: 20px;">新增</el-button>
      <el-table :data="tableData" border row-key="id">
        <el-table-column prop="text" label="名称" width="180"></el-table-column>
        <el-table-column prop="icon" label="图标" width="180"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type==1" type="success">按钮</el-tag>
            <el-tag v-else>菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="地址"></el-table-column>
        <el-table-column prop="permission" label="权限"></el-table-column>
        <el-table-column prop="order" label="排序"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
    </el-card>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑菜单或按钮" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="ediEform">
        <el-form-item label="类型	" :label-width="formLabelWidth">
          <div>
            <el-radio
              v-model="ediEform.type"
              label="0"
              border
              @change="handleCheckAllChange"
              :disabled="disabled"
            >菜单</el-radio>
            <el-radio v-model="ediEform.type" label="1" border @change="handleCheckAllChange">按钮</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="ediEform.menuName" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="权限	" :label-width="formLabelWidth">
          <el-input v-model="ediEform.perms" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="图标	" :label-width="formLabelWidth">
          <el-input v-model="ediEform.icon" clearable placeholder="请输入内容" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="地址	" :label-width="formLabelWidth">
          <el-input v-model="ediEform.path" clearable placeholder="请输入内容" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="排序	" :label-width="formLabelWidth">
          <el-input-number
            v-model="ediEform.orderNum"
            controls-position="right"
            :min="1"
            :disabled="disabled"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="上级菜单	" :label-width="formLabelWidth">
          <el-tree
            :data="tableData"
            ref="tree"
            node-key="id"
            :default-checked-keys="ediEform.parentId"
            :default-expanded-keys="ediEform.parentId"
            highlight-current
            check-strictly
            show-checkbox
            accordion
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增的弹框 -->
    <el-dialog title="新增菜单或按钮" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform">
        <el-form-item label="类型	" :label-width="formLabelWidth">
          <div>
            <el-radio v-model="addform.type" label="0" border @change="handleCheckAllChange">菜单</el-radio>
            <el-radio v-model="addform.type" label="1" border @change="handleCheckAllChange">按钮</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="addform.menuName" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="权限	" :label-width="formLabelWidth">
          <el-input v-model="addform.perms" clearable placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="图标	" :label-width="formLabelWidth">
          <el-input v-model="addform.icon" clearable placeholder="请输入内容" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="地址	" :label-width="formLabelWidth">
          <el-input v-model="addform.path" clearable placeholder="请输入内容" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="排序	" :label-width="formLabelWidth">
          <el-input-number
            v-model="addform.orderNum"
            controls-position="right"
            :min="1"
            :disabled="disabled"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="上级菜单	" :label-width="formLabelWidth">
          <el-tree
            :data="tableData"
            ref="tree"
            node-key="id"
            :default-checked-keys="addform.parentId"
            highlight-current
            check-strictly
            show-checkbox
            accordion
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMenuList, menuAdd, editMenu, delMenu } from '@/api'
export default {
  data () {
    return {
      tableData: null,
      formLabelWidth: "100px",
      loading: false,
      disabled: false,
      dialogFormVisible: null,
      dialogFormVisible2: null,
      addform: {
        parentId: null,//父级ID
        menuName: null, //名称
        perms: null, //权限
        path: null, //路径
        icon: null, //图标
        orderNum: null, //排序
        type: null, //类型
      },
      ediEform: {
        parentId: null,//父级ID
        menuName: null, //名称
        perms: null, //权限
        path: null, //路径
        icon: null, //图标
        orderNum: null, //排序
        type: null, //类型
        menuId: null, //菜单id
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      },
    }
  },
  created () {
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {

    // 初始化表格数据
    initList (obj) {
      this.loading = true
      getMenuList(obj).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.tableData = res.data.rows.children
          this.loading = false
        }
      })
    },
    //新增
    addBtn () {
      this.dialogFormVisible = true
    },
    confirmAdd () {
      let number
      this.addform.parentId = this.$refs.tree.getCheckedKeys()[0]
      this.loading = true
      menuAdd(this.addform)
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
          this.loading = false
          console.log(err)
        })
    },
    // 编辑
    handleEdit (row) {
      this.ediEform.parentId = [row.parentId]
      this.ediEform.menuName = row.text
      this.ediEform.perms = row.permission
      this.ediEform.path = row.path
      this.ediEform.icon = row.icon
      this.ediEform.orderNum = row.order
      this.ediEform.type = row.type
      this.ediEform.menuId = row.id
      if (row.type == 1) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      this.dialogFormVisible2 = true
    },
    //确认
    confirmEdit () {
      this.loading = true
      this.ediEform.parentId = this.ediEform.parentId[0]
      editMenu(this.ediEform).then(res => {
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
    //删除
    handleDelete (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        // console.log(row)
        delMenu(row.id)
          .then(res => {
            // console.log(res)
            if (res.data.code == 1) {
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
    handleCheckAllChange (val) {
      if (val == 1) {
        this.disabled = true
        this.path = null //路径
        this.icon = null //图标
        this.orderNum = null //排序
      } else {
        this.disabled = false
      }
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
