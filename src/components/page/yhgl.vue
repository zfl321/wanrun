<template>
  <div class="my-box" v-loading="loading">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-collapse-transition>
          <div v-show="foldData" style="margin-bottom: 10px">
            <el-form ref="seekData">
              <el-row :gutter="10" style="margin-bottom: 0px;">
                <el-col :span="6">
                  <el-form-item label="品牌">
                    <el-select v-model="seekData.brand" @change="selectOne" placeholder="请选择">
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
                    <el-select v-model="seekData.store" @change="selectTwo" placeholder="请选择">
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
                  <el-form-item label="状态">
                    <el-select v-model="seekData.status" placeholder="请选择">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="账号">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.username"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="真实姓名">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.fullName"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
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
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最近登陆时间">
                    <el-date-picker
                      v-model="lastLoginTime"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
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
            <el-button @click="resetPassword">重置密码</el-button>
            <el-button @click="batchesDelete">批量删除</el-button>
          </el-col>
          <el-col :span="5" class="reset-button">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="reset(seekData)">重置</el-button>
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
            <el-table-column prop="brand" label="品牌" width="100"></el-table-column>
            <el-table-column prop="store" label="门店" width="100"></el-table-column>
            <el-table-column prop="roleName" label="角色" width="100"></el-table-column>
            <el-table-column prop="username" label="账号" width="100"></el-table-column>
            <el-table-column prop="fullName" label="真实姓名" width="100"></el-table-column>
            <el-table-column prop="ssex" label="性别" width="50">
              <template slot-scope="scope">
                <span v-if="scope.row.ssex==1">男</span>
                <span v-else-if="scope.row.ssex==0" type="info">女</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="email" label="邮箱" width="150"></el-table-column> -->
            <el-table-column prop="lastLoginTime" label="最近登陆时间" width="150"></el-table-column>
            <el-table-column prop="status" label="状态" width="70">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status==1">启用</el-tag>
                <el-tag v-else type="info">停用</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" show-overflow-tooltip></el-table-column>
            <!-- 操作按钮列 -->
            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <!-- 详情按钮 -->
                <el-button
                  type="primary"
                  circle
                  icon="el-icon-view"
                  size="mini"
                  dialogFormVisible
                  @click="handleDetails(scope.row)"
                ></el-button>
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
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible2">
      <el-form :rules="myrules" label-width="70px" ref="editRef">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="品牌">
              <el-select v-model="editData.brandId" @change="selectOne" placeholder="请选择">
                <el-option
                  v-for="(item,index) in brandSelectData"
                  :key="index"
                  :label="item.brandName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店">
              <el-select v-model="editData.storeId" @change="selectTwo" placeholder="请选择">
                <el-option
                  v-for="(item,index) in hotelSelectData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="editData.roleId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in roleSelectData"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号">
              <el-input placeholder="请输入内容" v-model="editData.username" disabled class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名">
              <el-input placeholder="请输入内容" v-model="editData.fullName" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input placeholder="请输入内容" v-model="editData.email" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input placeholder="请输入内容" v-model="editData.mobile" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办公电话">
              <el-input placeholder="请输入内容" v-model="editData.oph" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <div>
                <el-radio v-model="editData.ssex" label="1" border>男</el-radio>
                <el-radio v-model="editData.ssex" label="0" border>女</el-radio>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <div>
                <el-radio v-model="editData.status" label="1" border>启用</el-radio>
                <el-radio v-model="editData.status" label="0" border>停用</el-radio>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="editData.description"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form label-position="right" label-width="70px" :rules="myrules" ref="editRef">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="品牌">
              <el-select v-model="addform.brandId" @change="selectOne" placeholder="请选择">
                <el-option
                  v-for="(item,index) in brandSelectData"
                  :key="index"
                  :label="item.brandName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门店">
              <el-select v-model="addform.storeId" @change="selectTwo" placeholder="请选择">
                <el-option
                  v-for="(item,index) in hotelSelectData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色">
              <el-select v-model="addform.roleId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in roleSelectData"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号">
              <el-input placeholder="请输入内容" v-model="addform.username" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码">
              <el-input
                placeholder="请输入内容"
                v-model="addform.password"
                show-password
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码">
              <el-input
                placeholder="这里检验还没做"
                v-model="addform.password"
                show-password
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="真实姓名">
              <el-input placeholder="请输入内容" v-model="addform.fullName" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input placeholder="请输入内容" v-model="addform.email" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话">
              <el-input placeholder="请输入内容" v-model="addform.mobile" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办公电话">
              <el-input placeholder="请输入内容" v-model="addform.oph" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <div>
                <el-radio v-model="addform.status" label="1" border>启用</el-radio>
                <el-radio v-model="addform.status" label="0" border>停用</el-radio>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <div>
                <el-radio v-model="addform.ssex" label="1" border>男</el-radio>
                <el-radio v-model="addform.ssex" label="0" border>女</el-radio>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述">
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="addform.description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 重置密码的弹框 -->
    <el-dialog title="重置密码" :visible.sync="dialogFormVisible3">
      <el-form label-position="right" label-width="250px" :rules="myrules" ref="editRef">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="账号">
              <el-input
                placeholder="请输入内容"
                v-model="passwordData.username"
                clearable
                disabled
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="真实姓名">
              <el-input
                placeholder="请输入内容"
                v-model="passwordData.fullName"
                clearable
                disabled
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码">
              <el-input
                placeholder="请输入内容"
                v-model="passwordData.password"
                show-password
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码">
              <el-input
                placeholder="这里检验还没做"
                v-model="passwordData.password"
                show-password
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateDassword">取 消</el-button>
        <el-button type="primary" @click="confirmDassword">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看详情弹窗 -->
    <el-dialog title="查看用户详情" :visible.sync="dialogTableVisible4">
      <div>
        <el-row>
          <el-col :span="12">用户名：{{gridData.username}}</el-col>
          <el-col :span="12">角色：{{gridData.roleName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">品牌：{{gridData.brand}}</el-col>
          <el-col :span="12">门店：{{gridData.store}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">真实姓名：{{gridData.fullName}}</el-col>
          <el-col :span="12">邮箱：{{gridData.email}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">电话号码：{{gridData.mobile}}</el-col>
          <el-col :span="12">座机号码：{{gridData.oph}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">创建时间：{{gridData.createTime}}</el-col>
          <el-col :span="12">最近登陆时间：{{gridData.lastLoginTime}}</el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList, addUser, editpassword, getRoleSelect, getHotelSelect, getBuildingSelect, delUser, getRights, getBrandSelect, editUser, getHotelSeek } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    /* 自定义校验规则 */
    let Email = (rule, value, callback) => {
      // console.log(callback)
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (emailReg.test(value)) {
          // 校验通过
          callback()
        } else {
          // 校验不通过
          callback(new Error('请输入正确的邮箱格式'))
        }
      }
    }
    return {
      multipleSelection: [],
      loading: false,
      //查看详情数据
      gridData: {
        fullName: null,
        mobile: null,
        oph: null,
        ssex: null,
        description: null,
        username: null,
        brand: null,
        store: null,
        roleId: null,
        userId: null,
        email: null,
        status: null,
        lastLoginTime: null
      },
      // 重置密码数据
      passwordData: {
        username: null,
        fullName: null,
        password: null,
      },
      dialogFormVisible3: false,
      dialogTableVisible4: false,
      // 建筑列表数据
      tableData: null,
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      // 查询的数据
      seekData: {
        brand: null,  //品牌
        store: null,   //门店
        username: null,  //账号
        fullName: null,  //真实姓名
        status: null,
        lastLoginTimeFrom: null,
        lastLoginTimeTo: null,
        createTimeFrom: null,
        createTimeTo: null,
        createUser: null,
      },
      createTime: null,
      lastLoginTime: null,
      hotelId: null,
      brandId: null,
      options1: [{
        value: '1',
        label: '启用'
      }, {
        value: '0',
        label: '停用'
      }],
      // 新增
      addform: {
        //   floorName: null,  //楼层名称
        //   description: null,   //建筑描述
        //   buildingId: null,   //建筑ID
      },

      brandSelectData: null,
      hotelSelectData: null,
      buildingSelectData: null,
      roleSelectData: null,
      options: regionData,
      selectedOptions: [],
      // 编辑
      editData: {
        fullName: null,
        mobile: null,
        oph: null,
        ssex: null,
        description: null,
        username: null,
        brandId: null,
        storeId: null,
        roleId: null,
        userId: null,
        email: null,
        status: null
      },
      myrules: {
        floorName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: Email, trigger: ['blur', 'change'] }
        ],
        selectedOptions: [
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
      getUserList().then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.tableData = res.data.rows
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
    // 获取门店下拉框
    selectOne (id) {
      // console.log(id)
      getHotelSelect(id).then((res) => {
        // console.log(res)
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
    // 获取建筑下拉框
    selectTwo (id) {
      // console.log(id)
      getBuildingSelect(id).then((res) => {
        // console.log(res)
        if (res.data) {
          this.buildingSelectData = res.data
        } else {
          this.$message({
            message: '该门店下没有建筑',
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
      this.initialize();
      // 获取角色下拉框
      getRoleSelect().then((res) => {
        this.roleSelectData = res.data
      })
    },

    // 确定按钮
    confirmAdd () {
      // addform.province = selectedOptions
      this.loading = true
      addUser(this.addform)
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

    // 用户删除
    handleDelete (row) {
      // console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定执行的操作
        // console.log(row)
        delUser(row.userId)
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
    // 批量删除
    batchesDelete () {
      if (this.multipleSelection.length != 0) {
        // 把要删除的用户ID以字符串拼接
        let number = ""
        for (let i = 0; i < this.multipleSelection.length; i++) {
          const element = this.multipleSelection[i];
          number += element.userId + ","
        }
        number = number.slice(0, number.length - 1)  //去掉最后的逗号
        this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          delUser(number)
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

    // 编辑用户
    handleEdit (index, row) {
      console.log(index)
      this.initialize();
      this.editData.fullName = index.fullName
      this.editData.mobile = index.mobile
      this.editData.oph = index.oph
      this.editData.ssex = index.ssex
      this.editData.description = index.description
      this.editData.username = index.username
      this.editData.brandId = parseInt(index.brandId)
      this.editData.storeId = parseInt(index.storeId)
      this.editData.roleId = parseInt(index.roleId)
      this.editData.userId = index.userId
      this.editData.email = index.email
      this.editData.status = index.status
      console.log(this.editData)
      // 获取角色下拉框
      getRoleSelect().then((res) => {
        this.roleSelectData = res.data
      })
      this.dialogFormVisible2 = true
      //获取默认的门店数据
      getHotelSelect(index.brandId).then((res) => {
        // console.log(res)
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
    // 编辑用户确认
    confirmEditD () {
      // console.log(this.editData);
      this.loading = true
      editUser(this.editData).then(res => {
        this.loading = false
        if (res.data.code == 1) {
          this.$message.success(res.data.message)
          this.editData.brand = null
          this.editData.store = null
          this.editData.roleId = null
          this.initList()
          this.dialogFormVisible2 = false
        } else {
          this.$message.error(res.data.message)
        }

      })
    },
    // 查询按钮
    handleSearch () {
      if (this.createTime) {
        this.seekData.createTimeTo = this.createTime[1]
        this.seekData.createTimeFrom = this.createTime[0]
      }
      if (this.lastLoginTime) {
        this.seekData.lastLoginTimeTo = this.lastLoginTime[1]
        this.seekData.lastLoginTimeFrom = this.lastLoginTime[0]
      }
      // console.log(this.seekData)
      if (this.seekData) {
        this.loading = true
        getUserList(this.seekData).then((res) => {
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
    // 重置按钮
    reset (formName) {
      this.seekData.brand = null  //品牌
      this.seekData.store = null   //门店
      this.seekData.username = null  //账号
      this.seekData.fullName = null  //真实姓名
      this.seekData.status = null
      this.lastLoginTime = null
      this.createTime = null
      this.seekData.createUser = null
      this.seekData.lastLoginTimeTo = null
      this.seekData.lastLoginTimeFrom = null
      this.seekData.createTimeTo = null
      this.seekData.createTimeFrom = null
      this.$refs[formName].resetFields();
    },
    // 重置密码按钮
    resetPassword () {
      var page = JSON.parse(localStorage.getItem('user'));
      this.passwordData.username = page.username
      this.passwordData.fullName = page.fullName
      this.dialogFormVisible3 = true
    },
    confirmDassword () {
      editpassword(this.passwordData).then(res => {
        if (res.data.code == 1) {
          this.dialogFormVisible3 = false
          this.$message({
            message: res.data.message,
            type: 'success'
          });
        }
      })
    },
    abrogateDassword () {
      this.dialogFormVisible3 = false
    },
    //查看详情按钮
    handleDetails (row) {
      this.gridData = row
      console.log(this.gridData)
      this.dialogTableVisible4 = true
    }

  }
}
</script>
<style lang="scss" scoped>
.my-box {
  .my-input {
    max-width: 215px;
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
