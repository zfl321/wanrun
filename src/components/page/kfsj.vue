<template>
  <!-- 客房事件页面 -->
  <!-- 头部选择器 -->
  <div class="my-box">
    <el-card shadow="always" class="my-card">
      <el-collapse-transition>
        <el-form label-width="70px">
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="品牌">
                <el-select v-model="seekData.brandId" @change="selectOne" clearable placeholder="请选择">
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
                <el-select v-model="seekData.hotelId" @change="selectTwo" clearable placeholder="请选择">
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
          <div v-show="foldData" style="margin-bottom: 10px">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="房号">
                  <el-input
                    placeholder="请输入房号"
                    v-model="seekData.mainBoardIp"
                    clearable
                    class="my-input"
                    type="number"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客房状态">
                  <el-select v-model="seekData.status" placeholder="请选择">
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in statusType"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="操作类型">
                  <el-select v-model="seekData.oper" placeholder="请选择">
                    <el-option
                      :label="item.label"
                      :value="item.value"
                      v-for="item in operType"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="触发时间">
                  <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </el-collapse-transition>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-button>导出</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content reset-button">
            <el-button type="primary" @click="handleAllSelect">查询</el-button>
            <el-button @click="reset">重置</el-button>
            <el-button plain class="my-icont" @click="fold()">
              <div v-if="foldData">
                收起
                <i class="el-icon-arrow-up"></i>
              </div>
              <div v-else>
                展开
                <i class="el-icon-arrow-down"></i>
              </div>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card>
      <GuestRoomTable :roomStatusedList='roomStatusedList' :total='total' :page='page' :pageSize="pageSize" @changePage="changePage" @changePageSize="changePageSize"></GuestRoomTable>
    </el-card>
  </div>
</template>
<script>
import GuestRoomTable from '@/components/common/GuestRoomTable.vue';
import Table from '@/components/common/Table.vue';
import { getRoomStatused, getBrandSelect, getHotelSelect, getBoomTypelSelect, getBuildingSelect, getFloorSelect } from '@/api';
export default {
  data () {
    return {
      options: [{
         value: 'zhinan',
         label: '指南',
         children: [{
           value: 'shejiyuanze',
           label: '设计原则',
           children: [{
             value: 'yizhi',
             label: '一致'
           }, {
             value: 'fankui',
             label: '反馈'
           }, {
             value: 'xiaolv',
             label: '效率'
           }, {
             value: 'kekong',
             label: '可控'
           }]
         }, {
           value: 'daohang',
           label: '导航',
           children: [{
             value: 'cexiangdaohang',
             label: '侧向导航'
           }, {
             value: 'dingbudaohang',
             label: '顶部导航'
           }]
         }]
       }, {
         value: 'zujian',
         label: '组件',
         children: [{
           value: 'basic',
           label: 'Basic',
           children: [{
             value: 'layout',
             label: 'Layout 布局'
           }, {
             value: 'color',
             label: 'Color 色彩'
           }, {
             value: 'typography',
             label: 'Typography 字体'
           }, {
             value: 'icon',
             label: 'Icon 图标'
           }, {
             value: 'button',
             label: 'Button 按钮'
           }]
         }, {
           value: 'form',
           label: 'Form',
           children: [{
             value: 'radio',
             label: 'Radio 单选框'
           }, {
             value: 'checkbox',
             label: 'Checkbox 多选框'
           }, {
             value: 'input',
             label: 'Input 输入框'
           }, {
             value: 'input-number',
             label: 'InputNumber 计数器'
           }, {
             value: 'select',
             label: 'Select 选择器'
           }, {
             value: 'cascader',
             label: 'Cascader 级联选择器'
           }, {
             value: 'switch',
             label: 'Switch 开关'
           }, {
             value: 'slider',
             label: 'Slider 滑块'
           }, {
             value: 'time-picker',
             label: 'TimePicker 时间选择器'
           }, {
             value: 'date-picker',
             label: 'DatePicker 日期选择器'
           }, {
             value: 'datetime-picker',
             label: 'DateTimePicker 日期时间选择器'
           }, {
             value: 'upload',
             label: 'Upload 上传'
           }, {
             value: 'rate',
             label: 'Rate 评分'
           }, {
             value: 'form',
             label: 'Form 表单'
           }]
         }, {
           value: 'data',
           label: 'Data',
           children: [{
             value: 'table',
             label: 'Table 表格'
           }, {
             value: 'tag',
             label: 'Tag 标签'
           }, {
             value: 'progress',
             label: 'Progress 进度条'
           }, {
             value: 'tree',
             label: 'Tree 树形控件'
           }, {
             value: 'pagination',
             label: 'Pagination 分页'
           }, {
             value: 'badge',
             label: 'Badge 标记'
           }]
         }, {
           value: 'notice',
           label: 'Notice',
           children: [{
             value: 'alert',
             label: 'Alert 警告'
           }, {
             value: 'loading',
             label: 'Loading 加载'
           }, {
             value: 'message',
             label: 'Message 消息提示'
           }, {
             value: 'message-box',
             label: 'MessageBox 弹框'
           }, {
             value: 'notification',
             label: 'Notification 通知'
           }]
         }, {
           value: 'navigation',
           label: 'Navigation',
           children: [{
             value: 'menu',
             label: 'NavMenu 导航菜单'
           }, {
             value: 'tabs',
             label: 'Tabs 标签页'
           }, {
             value: 'breadcrumb',
             label: 'Breadcrumb 面包屑'
           }, {
             value: 'dropdown',
             label: 'Dropdown 下拉菜单'
           }, {
             value: 'steps',
             label: 'Steps 步骤条'
           }]
         }, {
           value: 'others',
           label: 'Others',
           children: [{
             value: 'dialog',
             label: 'Dialog 对话框'
           }, {
             value: 'tooltip',
             label: 'Tooltip 文字提示'
           }, {
             value: 'popover',
             label: 'Popover 弹出框'
           }, {
             value: 'card',
             label: 'Card 卡片'
           }, {
             value: 'carousel',
             label: 'Carousel 走马灯'
           }, {
             value: 'collapse',
             label: 'Collapse 折叠面板'
           }]
         }]
       }, {
         value: 'ziyuan',
         label: '资源',
         children: [{
           value: 'axure',
           label: 'Axure Components'
         }, {
           value: 'sketch',
           label: 'Sketch Templates'
         }, {
           value: 'jiaohu',
           label: '组件交互文档'
         }]
       }],
      selectedOptions: ['zujian', 'data', 'tag'],
      value6: '',
      foldData: true,
      inputVel: {
        hang: [
          {
            lie: [
              {
                name: "客房状态",
                value: "",
                message: [
                  "请勿打扰",
                  "请即清理"
                ]
              },
              {
                name: "操作类型",
                value: "",
                message: [
                  "门磁操作",
                  "插卡操作",
                  "退房操作",
                  "SOS操作",
                  "清理操作"
                ]
              }
            ]
          }
        ]
      },
      roomStatusedList: [],
      total: 0,
      page: 1,
      pageSize: 10,
      // 查询的数据
      seekData: {
        buildingId: null,
        floorId: null,
        mainBoardIp: null,
        hotelId: null,
        brandId: null,
      },
      brandSelectData: null,
      hotelSelectData: null,
      buildingSelectData: null,
      floorSelectData: null,
      roomTypeSelectData: null,
      statusType: [{
        label: '请勿打扰',
        value: 0,
      },{
        label: '请即清理',
        value: 1,
      }],
      operType: [{
        label: '门磁操作',
        value: 0
      },{
        label: '插卡操作',
        value: 1
      },{
        label: '退房操作',
        value: 2
      },{
        label: 'SOS操作',
        value: 3
      },{
        label: '清理操作',
        value: 4
      }]
    }
  },
  // 注册表格组件
  components: {
    Table,
    GuestRoomTable
  },
  methods: {
    fold () {
      this.foldData = !this.foldData
    },
    /* 初始化下拉框 */
    // 获取品牌下拉框 -- 1
    initialize () {
      getBrandSelect().then((res) => {
        if (res.status === 200) {
          this.brandSelectData = res.data
          // console.log(res)
        }
      })
    },
    // 获取门店下拉框 -- 2
    selectOne (id) {
      getHotelSelect(id).then((res) => {
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
    // 获取建筑下拉框  -- 3
    selectTwo (id) {
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
    // 获取楼层下拉框 -- 4
    selectThree (id) {
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
    handleAllSelect() {
      let start = null
      let end = null
      if(this.value6 != false){
        this.value6.forEach((item, index) => {
          if(index == 0){
            start = new Date(item).getTime()
          }else if(index == 1){
            end = new Date(item).getTime()
          }
        })
        this.seekData.start = start
        this.seekData.end = end
      }
      this.seekData.mainBoardIp == '' ? null : this.seekData.mainBoardIp
      this.getList()
    },
    reset() {
      this.seekData.brandId = this.seekData.hotelId = this.seekData.buildingId = this.seekData.floorId = this.seekData.mainBoardIp = this.seekData.status = this.seekData.oper = null
      this.brandSelectData = this.hotelSelectData = this.buildingSelectData = this.floorSelectData = null
      this.getList()
    },
    getList() {
      const selectData = Object.assign({page: this.page, pageSize: this.pageSize}, this.seekData)
      getRoomStatused(selectData).then(res => {
        this.roomStatusedList = res.data.rows
        this.total = res.data.total
      })
    },
    changePage(val){
      console.log('changePage', val)
      this.page = val
      this.getList()
    },
    changePageSize(val){
      console.log('changePageSize', val)
      this.pageSize = val
      this.getList()
    }
  },
  mounted() {
    this.foldData = false
    this.getList()
    this.initialize()
  }
}
</script>
<style lang="scss" >
.my-box {
  .my-card {
    margin-bottom: 10px;
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

<style>
  .chooseRoom .el-cascader {
    width: calc(100% - 234px);
  }
</style>
