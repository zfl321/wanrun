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
                <el-col :span="6">
                  <el-form-item label="门店">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.name"
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
            <el-table-column prop="brandName" label="品牌" width="100"></el-table-column>
            <el-table-column prop="name" label="门店" width="120"></el-table-column>
            <el-table-column prop="hotelCode" label="门店编号" width="120"></el-table-column>
            <el-table-column label="地址" width="350">
              <template
                slot-scope="scope"
              >{{ scope.row.province}}{{scope.row.city}}{{scope.row.address }}</template>
            </el-table-column>
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
    <el-dialog title="编辑门店" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="editData" :ref="editData" :rules="myrules">
        <el-form-item label="门店名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editData.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="门店编号" prop="hotelCode" :label-width="formLabelWidth">
          <el-input v-model="editData.hotelCode" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="brandId" :label-width="formLabelWidth">
          <template>
            <div class="block">
              <el-cascader
                size="large"
                :options="options"
                change-on-select
                v-model="selectedOptions"
              ></el-cascader>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="详细地址" prop="address" :label-width="formLabelWidth">
          <el-input v-model="editData.address" placeholder="如：XX大道XX路XX号"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="editData.description" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD(editData)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增门店" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform" :ref="addform" :rules="myrules">
        <el-form-item label="品牌" prop="brandId" :label-width="formLabelWidth">
          <el-select v-model="addform.brandId" placeholder="请选择">
            <el-option
              v-for="(item,index) in brandSelectData"
              :key="index"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addform.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="门店编号" prop="hotelCode" :label-width="formLabelWidth">
          <el-input v-model="addform.hotelCode" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="brandId" :label-width="formLabelWidth">
          <template>
            <div class="block">
              <el-cascader
                size="large"
                :options="options"
                change-on-select
                v-model="selectedOptions"
              ></el-cascader>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="详细地址" prop="address" :label-width="formLabelWidth">
          <el-input v-model="addform.address" placeholder="如：XX大道XX路XX号"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addform.description" placeholder="请输入内容"></el-input>
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
import { getHotelList, addHotel, delHotel, getRights, getBrandSelect, editHotel, getHotelSeek } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      multipleSelection: [],
      loading: false,
      // 门店列表数据
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
        name: null,
        pageSize: 10,
        pageNum: 1
      },
      // 新增
      addform: {
        name: null,  //门店名称
        hotelCode: null,  //门店编号
        description: null,   //门店描述
        brandId: null,   //品牌ID
        address: null,   //详细地址 
        province: null,   //省 
        // city: null,   //市 
        // description: null,   //区 
      },
      brandSelectData: null,
      options: regionData,
      selectedOptions: [],
      // 编辑
      editData: {
        name: null,  //门店名称
        hotelCode: null,  //门店编号
        description: null,   //门店描述
        id: null,   //门店ID
        brandId: null,   //品牌ID
        address: null,   //详细地址 
        province: null,   //省 
      },
      myrules: {
        name: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        hotelCode: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        brandId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
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
      return this.userJurisdiction.indexOf("hotel:add")
    },
    showdelete: function () {
      return this.userJurisdiction.indexOf("hotel:delete")
    },
    showupdate: function () {
      return this.userJurisdiction.indexOf("hotel:update")
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
      getHotelList(obj)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.tableData = res.data.rows
            this.total = res.data.total
            this.loading = false
            // 给totalNum赋值
            // this.totalNum = res.data.data.total
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          // addform.province = selectedOptions
          var provincn = ""
          for (let i = 0; i < this.selectedOptions.length; i++) {
            const element = this.selectedOptions[i];
            var provinc = CodeToText[element]
            provincn += provinc
          }
          this.addform.province = provincn
          // console.log(this.addform.province)
          addHotel(this.addform)
            .then((res) => {
              // console.log(res)
              this.loading = false
              if (res.data.code == 1) {
                this.initList()
                this.dialogFormVisible = false
                this.tableData = res.data.rows
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
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

    // 门店删除
    handleDelete (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该门店, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        console.log(row.id)
        delHotel(row.id)
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
          delHotel(number)
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

    // 编辑门店
    handleEdit (index, row) {
      console.log(index)
      this.editData.province = this.selectedOptions
      this.editData.name = index.name
      this.editData.hotelCode = index.hotelCode
      this.editData.description = index.description
      this.editData.brandId = index.brandId
      this.editData.id = index.id
      this.editData.address = index.address
      this.editData.province = index.province
      this.dialogFormVisible2 = true

    },
    // 编辑门店确认
    confirmEditD (formName) {
      // console.log(this.editData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          editHotel(this.editData).then(res => {
            // console.log(res)
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
      this.loading = true
      // console.log(this.seekData.brandId)
      if (this.seekData.brandId || this.seekData.name) {
        getHotelSeek(this.seekData).then((res) => {
          this.tableData = res.data.rows
          this.loading = false
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
.astrict {
  .el-select {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
}
.my-box {
  .my-input {
    max-width: 209px;
  }
  .my-iemt {
    span {
      font-size: 14px;
    }
    white-space: nowrap;
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
