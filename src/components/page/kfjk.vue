<template>
  <div class="my-box">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-collapse-transition>
          <div v-show="foldData" style="margin-bottom: 10px">
            <el-form label-width="70px">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="品牌">
                    <el-select v-model="brandId" @change="selectOne" clearable placeholder="请选择">
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
                    <el-select v-model="hotelId" @change="selectTwo" clearable placeholder="请选择">
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
                    <el-select
                      v-model="seekData.buildingId"
                      @change="selectThree"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item,index) in buildingSelectData"
                        :key="index"
                        :label="item.buildingName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="楼层">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in floorSelectData"
                        :key="index"
                        :label="item.floorName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="房间类型">
                    <el-select v-model="seekData.typeName" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in roomTypeSelectData"
                        :key="index"
                        :label="item.typeName"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="房号">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.mainBoardIp"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="出租情况">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in rentSelectData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="识别身份">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in identitySelectData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="门磁状态">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in mcSelectData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="实时状态">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in RTSelectData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="SOS状态">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in sosSelectData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="退房状态">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in outSelectData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="温度状态">
                    <el-select v-model="seekData.floorId" clearable placeholder="请选择">
                      <el-option
                        v-for="(item,index) in temperatureSelectData"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
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
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            :title="tableData.buildingName+'>'+tableData.floorName"
            name="1"
            v-for="(item,index) in tableData"
            :key="index"
          >
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
          </el-collapse-item>
          <el-collapse-item title="二楼" name="2">
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
          </el-collapse-item>
          <el-collapse-item title="三楼" name="3">
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
            <el-card shadow="hover">房间</el-card>
          </el-collapse-item>
          <el-collapse-item title="四楼" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-row>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑楼层" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="editData" :rules="myrules">
        <el-form-item label="房间号码" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editData.roomNumber" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="editData.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="主板IP" :label-width="formLabelWidth">
          <el-input v-model="editData.mainBoardIp" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="brandId" @change="selectOne" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in brandSelectData"
              :key="index"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间类型" :label-width="formLabelWidth">
          <el-select v-model="editData.roomType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in roomTypeSelectData"
              :key="index"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateAdd">取 消</el-button>
        <el-button type="primary" @click="confirmEditD">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增客房" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform" :rules="myrules">
        <el-form-item label="房间号" prop="roomNumber" :label-width="formLabelWidth">
          <el-input v-model="addform.roomNumber" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="主板ip" prop="mainBoardIp" :label-width="formLabelWidth">
          <el-input v-model="addform.mainBoardIp" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addform.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="brandId" @change="selectOne" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in brandSelectData"
              :key="index"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店" :label-width="formLabelWidth">
          <el-select v-model="hotelId" @change="selectTwo" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in hotelSelectData"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建筑" :label-width="formLabelWidth">
          <el-select v-model="addform.buildingId" @change="selectThree" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in buildingSelectData"
              :key="index"
              :label="item.buildingName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层" :label-width="formLabelWidth">
          <el-select v-model="addform.floorId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in floorSelectData"
              :key="index"
              :label="item.floorName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房类型" :label-width="formLabelWidth">
          <el-select v-model="addform.roomType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in roomTypeSelectData"
              :key="index"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { getRoomStatusList, addRoom, getFloorSelect, getHotelSelect, getBoomTypelSelect, getBuildingSelect, delRoom, getRights, getBrandSelect, editRoom, getHotelSeek } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      // 建筑列表数据
      activeNames: ['1', '2', '3', '4'],
      tableData: null,
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      // 查询的数据
      seekData: {
        buildingId: null,
        floorId: null,
        mainBoardIp: null,
      },
      hotelId: null,
      brandId: null,
      // 新增
      addform: {
        floorId: null,  //楼层ID
        remark: null,   //客房描述
        buildingId: null,   //建筑ID
        mainBoardIp: null,   //主板ID
        roomType: null,   //房间类型id
        roomNumber: null,   //房间号
      },
      // 下拉框的数据
      brandSelectData: null,
      hotelSelectData: null,
      buildingSelectData: null,
      floorSelectData: null,
      roomTypeSelectData: null,
      options: regionData,
      selectedOptions: [],
      rentSelectData: [{
        value: '1',
        label: '已租'
      }, {
        value: '0',
        label: '待租'
      },],
      // 识别身份
      identitySelectData: [{
        value: '1',
        label: '管理卡'
      }, {
        value: '2',
        label: '服务员卡'
      }, {
        value: '3',
        label: '客人卡'
      }, {
        value: '4',
        label: '无卡'
      }],
      RTSelectData: [{
        value: '1',
        label: '请勿打扰'
      }, {
        value: '0',
        label: '请即清理'
      },],
      mcSelectData: [{
        value: '1',
        label: '正常'
      }, {
        value: '0',
        label: '异常'
      },],
      sosSelectData: [{
        value: '1',
        label: '有'
      }, {
        value: '0',
        label: '无'
      },],
      outSelectData: [{
        value: '1',
        label: '有'
      }, {
        value: '0',
        label: '无'
      },],
      temperatureSelectData: [{
        value: '1',
        label: '正常'
      }, {
        value: '0',
        label: '异常'
      },],
      // 编辑
      editData: {
        mainBoardIp: null,  //主板IP
        remark: null,   //描述
        roomType: null,   //房间类型id
        id: null,   //客房ID
        roomNumber: null,   //房间号码 
      },

      myrules: {
        roomNumber: [
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
    handleChange (val) {
      console.log(val);
    },

    // 初始化表格数据
    initList () {
      getRoomStatusList().then(res => {
        console.log(res)
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
    },

    // 确定按钮
    confirmAdd () {
      // addform.province = selectedOptions
      addRoom(this.addform)
        .then((res) => {
          if (res.data.code == 1) {
            this.initList()
            this.dialogFormVisible = false
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
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
        delRoom(row.id)
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
      console.log(index)
      this.initialize();
      this.editData.mainBoardIp = index.mainBoardIp
      this.editData.remark = index.remark
      this.editData.roomNumber = index.roomNumber
      // this.editData.id = index.id
      this.dialogFormVisible2 = true

    },
    // 编辑楼层确认
    confirmEditD () {
      console.log(this.editData);
      editRoom(this.editData).then(res => {
        this.dialogFormVisible2 = false
        console.log(res)
      })
    },
    // 查询按钮
    handleSearch () {
      console.log(this.seekData)
      if (this.seekData) {
        getRoomlList(this.seekData).then((res) => {
          console.log(res)
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
      this.seekData.buildingId = null,
        this.seekData.floorId = null,
        this.seekData.mainBoardIp = null,
        this.seekData.brandSelectData = null,
        this.seekData.hotelSelectData = null,
        this.initList()
    },
    list2tree (list, idKey = "id", parentKey = "pId") {
      let result = [];
      let hash = {};

      //把数组遍历出用ID作为KEY的JSON对象
      list.forEach(ele => {
        hash[ele[idKey]] = ele;
      });

      list.forEach(ele => {
        let _id = ele[idKey]; //当前节点的id
        let _parentKey = hash[_id][parentKey]; //当前节点的父节点KEY

        if (_parentKey && hash[_parentKey]) { //如果有父节点KEY，并且父节点存在
          if (!hash[_parentKey].children) { //如果当前节点还没有子节点，为其添加一个空的子节点
            hash[_parentKey].children = [];
          }
          hash[_parentKey].children.push(ele); //把当前节点添加到父节点的子节点路径上
        } else {
          result.push(ele); //添加没有父节点KEY或者没有父节点存在的节点到根节点上
        }
      });
      return result;
    }

  }
}
</script>
<style lang="scss" scoped>
.my-box {
  .is-hover-shadow {
    width: 130px;
    height: 130px;
    margin: 5px;
    background-color: #409eff;
    float: left;
  }
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
