<template>
  <div class="my-box" v-loading="loading">
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-form label-width="80px">
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
          <el-collapse-transition>
            <div v-show="foldData" style="margin-bottom: 10px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="房间号">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.roomNumber"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="主板ip">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.mainBoardIp"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="主板id">
                    <el-input
                      placeholder="请输入内容"
                      v-model="seekData.mainBoardId"
                      clearable
                      class="my-input"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-form>
        <!-- 按钮行 -->
        <el-row>
          <el-col :span="19">
            <el-button @click="addBtn" v-if="showadd!=-1">新增</el-button>
            <el-button @click="batchesDelete" v-if="showdelete!=-1">批量删除</el-button>
            <!-- <el-button @click="exportExcel">下载模板</el-button> -->
            <el-button @click="uploadExcel">下载模板</el-button>
            <!-- <label class="control-label file">
              <input type="file" @change="importf(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
              导入excel
            </label>-->
            <label class="control-label file">
              <input
                type="file"
                class="upload"
                @change="importExcel"
                ref="inputer"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              >
              导入excel
            </label>
            <div style="color: #fff; display: inline-block;">.</div>
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

    <!-- 导出模板 -->
    <el-row style="display: none;">
      <ExcelTemplate id="out-table"></ExcelTemplate>
    </el-row>

    <!-- 内容区域 -->
    <el-row>
      <el-card shadow="always">
        <div class="my-header-table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            :height="dv"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="brandName" label="品牌" width="120"></el-table-column>
            <el-table-column prop="hotelName" label="门店" width="120"></el-table-column>
            <el-table-column prop="buildingName" label="建筑" width="120"></el-table-column>
            <el-table-column prop="floorName" label="楼层" width="80"></el-table-column>
            <el-table-column prop="roomTypeName" label="房间类型" width="120"></el-table-column>
            <el-table-column prop="roomNumber" label="房间号" width="70"></el-table-column>
            <el-table-column prop="mainBoardIp" label="主板ip" width="120"></el-table-column>
            <el-table-column prop="mainBoardId" label="主板id" width="120"></el-table-column>
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
            :page-size="seekData.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-card>
    </el-row>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑客房" :visible.sync="dialogFormVisible2" class="astrict">
      <el-form :model="editData" :ref="editData" :rules="myrules">
        <el-form-item label="主板IP" prop="mainBoardIp" :label-width="formLabelWidth">
          <el-input v-model="editData.mainBoardIp" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="主板ID" prop="mainBoardId" :label-width="formLabelWidth">
          <el-input v-model="editData.mainBoardId" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="房间类型" prop="roomType" :label-width="formLabelWidth">
          <el-select v-model="editData.roomType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in roomTypeSelectData"
              :key="index"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号码" prop="roomNumber" :label-width="formLabelWidth">
          <el-input v-model="editData.roomNumber" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="editData.remark" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2=false">取 消</el-button>
        <el-button type="primary" @click="confirmEditD(editData)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增的弹框 -->
    <el-dialog title="新增客房" :visible.sync="dialogFormVisible" class="astrict">
      <el-form :model="addform" :ref="addform" :rules="myrules">
        <el-form-item label="品牌" prop="brandId" :label-width="formLabelWidth">
          <el-select v-model="addform.brandId" @change="selectOne" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in brandSelectData"
              :key="index"
              :label="item.brandName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店" prop="brandId" :label-width="formLabelWidth">
          <el-select v-model="addform.hotelId" @change="selectTwo" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in hotelSelectData"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建筑" prop="brandId" :label-width="formLabelWidth">
          <el-select v-model="addform.buildingId" @change="selectThree" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in buildingSelectData"
              :key="index"
              :label="item.buildingName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层" prop="brandId" :label-width="formLabelWidth">
          <el-select v-model="addform.floorId" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in floorSelectData"
              :key="index"
              :label="item.floorName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客房类型" prop="brandId" :label-width="formLabelWidth">
          <el-select v-model="addform.roomType" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in roomTypeSelectData"
              :key="index"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNumber" :label-width="formLabelWidth">
          <el-input v-model="addform.roomNumber" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="主板ip" prop="mainBoardIp" :label-width="formLabelWidth">
          <el-input v-model="addform.mainBoardIp" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="主板id" prop="mainBoardId" :label-width="formLabelWidth">
          <el-input v-model="addform.mainBoardId" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addform.remark" placeholder="请输入内容"></el-input>
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
import { getRoomlList, addRoom, getFloorSelect, getHotelSelect, getBoomTypelSelect, getBuildingSelect, delRoom, getRights, getBrandSelect, editRoom, getHotelSeek, roomImport, roomTemplate } from '@/api'
import ExcelTemplate from '@/components/common/ExcelTemplate.vue'
import { regionData, CodeToText } from 'element-china-area-data';
import Axios from 'axios';
import XLSX from 'xlsx';
import FileSaver from 'file-saver';

export default {
  data () {
    return {
      excelData: [],
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
        buildingId: null,
        floorId: null,
        roomNumber: null,
        mainBoardIp: null,
        mainBoardId: null,
        pageSize: 10,
        pageNum: 1
      },
      hotelId: null,
      brandId: null,
      // 新增
      addform: {
        hotelId: null,
        brandId: null,
        buildingId: null,
        floorId: null,  //楼层ID
        remark: null,   //客房描述
        buildingId: null,   //建筑ID
        mainBoardIp: null,   //主板Ip
        mainBoardId: null,   //主板Id
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
      // 编辑
      editData: {
        mainBoardIp: null,  //主板IP
        mainBoardId: null,  //主板Id
        remark: null,   //描述
        roomType: null,   //房间类型id
        id: null,   //客房ID
        roomNumber: null,   //房间号码 
      },
      myrules: {
        brandId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        roomType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        roomNumber: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        mainBoardIp: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        mainBoardId: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
      return this.userJurisdiction.indexOf("room:add")
    },
    showdelete: function () {
      return this.userJurisdiction.indexOf("room:delete")
    },
    showupdate: function () {
      return this.userJurisdiction.indexOf("room:update")
    },
    dv: function windowHeight () {
      var de = document.documentElement;
      return (self.innerHeight || (de && de.offsetHeight) || document.body.offsetHeight) - 306;
    }
  },
  // 注册表格组件
  components: {
    ExcelTemplate
  },
  created () {
    this.userJurisdiction = JSON.parse(localStorage.getItem('userJurisdiction'));
    // 调用初始化表格数据方法
    this.initList()
  },
  methods: {
    // 下载模板
    uploadExcel () {
      Axios.post(`${Axios.defaults.baseURL}/room/template`, {}, { responseType: 'arraybuffer' }).then(res => {
        console.log(res)
        var blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = '上传模板' + '.xlsx'; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      })
    },

    // 导出 excel 
    exportExcel () {
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '导入模板.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },

    // 导入excel
    importExcel (event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      // this.fil = inputDOM.files;
      console.log(inputDOM.files[0])
      let formData = new FormData();
      formData.append('file', inputDOM.files[0]);
      Axios({
        method: 'post',
        url: '/room/import',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      }).then(res => {
        console.log(res)
        this.initList()
      })
      // Axios({
      //   method: 'post',
      //   url: "/room/import",
      //   data: formData,
      //   headers: {
      //     'Content-Type": "multipart/form-data'
      //   },
      // }).then(res => {
      //   console.log(res)
      // })
      // this.$axios({
      //   method: "post",
      //   url: "/room/import",
      //   data: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // }).then(res => {
      //   console.log(res)
      // });
    },

    importf (obj) {
      let _this = this;
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串  
      var file = this.file;

      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串  
        var pt = this;
        var workbook; //读取完成的数据  
        // var excelData;  
        var reader = new FileReader();
        reader.onprogress = function (e) {
          let total = file.size;
          _this.progress = (e.loaded / total) * 100;
          console.log(_this.progress);
        };
        reader.onload = function (e) {
          try {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            if (rABS) {
              workbook = XLSX.read(btoa(fixdata(binary)), { //手动转化  
                type: 'base64'
              });
            } else {
              workbook = XLSX.read(binary, {
                type: 'binary'
              });
            }
            // excelData = []; 
          } catch (e) {
            console.log('文件类型不正确');
            return;
          }
          var fromTo = '';
          for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              fromTo = workbook.Sheets[sheet]['!ref'];
              _this.excelData = _this.excelData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            }
          }
          console.log(_this.excelData);
          roomImport(_this.excelData).then(res => {
            console.log('批量', res)
          })
        };

        reader.readAsArrayBuffer(f);

      }

      var reader = new FileReader();
      if (rABS) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsBinaryString(file);
      }
    },
    // 初始化表格数据
    initList (obj) {
      this.loading = true
      getRoomlList(obj).then(res => {
        // console.log(res)
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
        if (res.status === 200) {
          this.brandSelectData = res.data
          console.log(res)
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
    confirmAdd (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addRoom(this.addform)
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
          delRoom(number)
            .then(res => {
              this.loading = false
              if (res.data.code == 1) {
                this.$message.success(res.data.message)
                this.initList()
              } else {
                this.$message.error(res.data.message)
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
      // console.log(val)
    },

    // 编辑楼层
    handleEdit (index, row) {
      console.log(index)
      // 获取房间类型下拉框
      getBoomTypelSelect(index.brandId).then((res) => {
        if (res.status === 200) {
          this.roomTypeSelectData = res.data
          // console.log(res)
        }
      })
      this.editData.mainBoardIp = index.mainBoardIp
      this.editData.mainBoardId = index.mainBoardId
      this.editData.remark = index.remark
      this.editData.roomType = index.roomType
      this.editData.roomNumber = index.roomNumber
      // this.editData.id = index.id
      this.dialogFormVisible2 = true

    },
    // 编辑楼层确认
    confirmEditD (formName) {
      // console.log(this.editData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          editRoom(this.editData).then(res => {
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
      this.loading = true
      if (this.seekData) {
        getRoomlList(this.seekData).then((res) => {
          // console.log(res)
          this.loading = false
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
      this.hotelId = null
      this.brandId = null
      this.seekData.buildingId = null
      this.seekData.floorId = null
      this.seekData.mainBoardIp = null
      this.seekData.mainBoardId = null
      this.seekData.brandSelectData = null
      this.seekData.hotelSelectData = null
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
    span {
      font-size: 14px;
    }
    white-space: nowrap;
  }
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

.file {
  position: relative;
  padding: 9px 15px;
  margin-left: 10px;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
}
.file input {
  position: absolute;
  font-size: 18px;
  right: 0;
  top: 0;
  opacity: 1;
  z-index: -1;
  border: 1px solid black;
}
</style>
