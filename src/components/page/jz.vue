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
            <el-col :span="6">
              <el-form-item label="建筑">
                <el-input
                  placeholder="请输入内容"
                  v-model="seekData.buildingName"
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
            <el-table-column prop="brandName" label="品牌" width="150"></el-table-column>
            <el-table-column prop="hotelName" label="门店" width="150"></el-table-column>
            <el-table-column prop="buildingName" label="建筑" width="150"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>

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
    <el-dialog title="编辑建筑" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="editData" :ref="editData" :rules="myrules">
        <el-form-item label="名称" prop="buildingName" :label-width="formLabelWidth">
          <el-input v-model="editData.buildingName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="editData.description" type="textarea" :rows="5" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD(editData)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增建筑" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform" :ref="addform" :rules="myrules">
        <el-form-item label="名称" prop="buildingName" :label-width="formLabelWidth">
          <el-input v-model="addform.buildingName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brandId" :label-width="formLabelWidth">
          <el-select v-model="addform.brandId" @change="selectOne" placeholder="请选择">
            <el-option
              v-for="(item,index) in brandSelectData"
              :key="index"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店" prop="hotelId" :label-width="formLabelWidth">
          <el-select v-model="addform.hotelId" placeholder="请选择">
            <el-option
              v-for="(item,index) in hotelSelectData"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" v-model="addform.description" placeholder="请输入内容"></el-input>
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
import { getBuildinglList, addBuilding, getHotelSelect, delBuilding, nameVerify, getRights, getBrandSelect, editBuilding, getHotelSeek } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    /* 建筑名是否重复校验 */
    let Verify = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('不能为空'))
      } else {
        nameVerify('building', { buildingName: value, id: this.editData.id }).then(res => {
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
        brandId: null,
        hotelId: null,
        buildingName: null,
        pageSize: 10,
        pageNum: 1
      },
      // 新增
      addform: {
        brandId: null,  //建筑id
        description: null,   //建筑描述
        hotelId: null,   //门店ID
      },
      brandSelectData: null,
      hotelSelectData: null,
      options: regionData,
      selectedOptions: [],
      // 编辑
      editData: {
        buildingName: null,  //建筑名称
        description: null,   //建筑描述
        id: null,   //建筑ID
      },
      myrules: {
        buildingName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        brandId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        hotelId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
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
      return this.userJurisdiction.indexOf("building:add")
    },
    showdelete: function () {
      return this.userJurisdiction.indexOf("building:delete")
    },
    showupdate: function () {
      return this.userJurisdiction.indexOf("building:update")
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
    initList () {
      this.loading = true
      getBuildinglList()
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            this.tableData = res.data.rows
            this.loading = false
          }
        })
    },

    /* 初始化下拉框 */
    // 获取品牌下拉框
    initialize (obj) {
      this.loading = true
      getBrandSelect(obj).then((res) => {
        if (res.status === 200) {
          this.brandSelectData = res.data
          this.total = res.data.total
          this.loading = false
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

    /* 新增弹窗 */
    // 获取品牌下拉框
    addBtn () {
      this.dialogFormVisible = true
      getBrandSelect().then((res) => {
        if (res.status === 200) {
          this.brandSelectData = res.data
        }
      })

    },

    // 确定按钮
    confirmAdd (formName) {
      // addform.province = selectedOptions
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addBuilding(this.addform)
            .then((res) => {
              this.loading = false
              if (res.data.code == 1) {
                this.$message.success(res.data.message)
                this.initList()
                this.dialogFormVisible = false
                this.addform.brandId = ""       //清空输入框数据
                this.addform.buildingName = ""
                this.addform.description = ""
                this.addform.hotelId = ""
                this.addform.remark = ""
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
      this.dialogFormVisible2 = false
      this.dialogFormVisible = false
    },

    // 建筑删除
    handleDelete (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该建筑, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        // console.log(row.id)
        delBuilding(row.id)
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
        this.$confirm('此操作将永久删除所选择门店, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delBuilding(number)
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

    // 编辑建筑
    handleEdit (index, row) {
      console.log(index)
      this.editData.buildingName = index.buildingName
      this.editData.description = index.description
      this.editData.id = index.id
      this.dialogFormVisible2 = true

    },
    // 编辑建筑确认
    confirmEditD (formName) {
      // console.log(this.editData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          editBuilding(this.editData).then(res => {
            this.loading = false
            if (res.data.code == 1) {
              this.$message.success(res.data.message)
              this.initList()
              this.dialogFormVisible2 = false
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
      // console.log(this.seekData)
      if (this.seekData) {
        getBuildinglList(this.seekData).then((res) => {
          // console.log(res)
          if (res.status === 200) {
            this.tableData = res.data.rows
          }
        })
      } else {
        this.initList()
      }
    },
    // 重置按钮
    reset () {
      this.seekData.brandSelectData = null
      this.seekData.hotelSelectData = null
      this.seekData.hotelId = null
      this.seekData.brandId = null
      this.seekData.buildingName = null
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
    white-space: nowrap;
  }
  .my-input {
    max-width: 209px;
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
