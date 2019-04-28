<template>
  <div class="my-box roomPage">
    <el-row class="notice" v-if="this.noticeList != false">
      <!-- <div>消息通知</div> -->
      <div class="notice_list">
        <div class="animate">
          <span
            v-for="(item, index) in noticeList"
            :key="index"
          >{{item.buildingName + item.floorName + item.roomNumber}}:{{ item.status }}</span>
        </div>
      </div>
      <span class="watch_all" @click="openNotice">查看全部</span>
    </el-row>
    <!-- 功能区域 -->
    <el-row>
      <el-card shadow="always">
        <el-collapse-transition>
          <div style="margin-bottom: 10px">
            <el-form label-width="70px">
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="品牌">
                    <el-select
                      v-model="seekData.brandId"
                      @change="selectOne"
                      clearable
                      placeholder="请选择"
                    >
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
                    <el-select
                      v-model="seekData.hotelId"
                      @change="selectTwo"
                      clearable
                      placeholder="请选择"
                    >
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
              <div v-show="foldData">
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
                      <el-select v-model="seekData.rent" clearable placeholder="请选择">
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
                      <el-select v-model="seekData.identity" clearable placeholder="请选择">
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
                      <el-select v-model="seekData.doorWarning" clearable placeholder="请选择">
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
                      <el-select v-model="seekData.status" clearable placeholder="请选择">
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
                      <el-select v-model="seekData.sos" clearable placeholder="请选择">
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
                      <el-select v-model="seekData.checkout" clearable placeholder="请选择">
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
                      <el-select v-model="seekData.temp" clearable placeholder="请选择">
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
              </div>
            </el-form>
          </div>
        </el-collapse-transition>
        <!-- 按钮行 -->
        <el-row>
          <div class="reset-button">
            <el-button @click="closeTips">关闭语音</el-button>
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
          </div>
        </el-row>
      </el-card>
    </el-row>
    <!-- 内容区域 -->
    <el-row v-loading="loading">
      <el-card shadow="always">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item v-for="(item, index) in tableData" :key="index" :name="index">
            <template slot="title">
              <div
                class="building"
                style="display: inline-flex;flex-direction: row;align-items: center;"
              >
                <img src="../../../static/images/icon/buildingName.png" style="margin-right: 5px;">
                <span>{{item.buildingName}}</span>
              </div>
              <div
                class="floor"
                style="display: inline-flex;flex-direction: row;align-items: center;"
              >
                <img
                  src="../../../static/images/icon/floor.png"
                  style="margin-right: 5px;margin-left: 5px;"
                >
                <span>{{item.floorName}}</span>
              </div>
            </template>
            <el-card
              shadow="hover"
              @click.native="openDialog(item1)"
              v-for="(item1, index) in item.roomStatusRealtimeList"
              :key="index"
              :class="[ item1.rent == '1' ? 'rentBackground' : '' ]"
            >
              <div class="room_item">
                <span class="room_num">
                  <span>{{item1.roomNumber}}</span>
                  <img
                    src="../../../static/images/icon/i_sos.png"
                    v-if="item1.sos == '1' && item1.basicstatus =='on'"
                  >
                </span>
                <div class="room_info" v-show="item1.basicstatus == 'on'">
                  <el-button size="mini" title="管理卡" v-if="item1.identity == '0'">
                    <img src="../../../static/images/icon/i_identity6.png" class="room_status">
                  </el-button>
                  <el-button size="mini" title="服务员卡" v-if="item1.identity == '1'">
                    <img src="../../../static/images/icon/i_identity8.png" class="room_status">
                  </el-button>
                  <el-button size="mini" title="客人卡" v-if="item1.identity == '2'">
                    <img src="../../../static/images/icon/i_identity9.png" class="room_status">
                  </el-button>
                  <el-button size="mini" title="无人" v-if="item1.identity == '3'">
                    <img src="../../../static/images/icon/i_identity0.png" class="room_status">
                  </el-button>
                  <div class="temperature">
                    <span class="room_temperature">{{item1.temperature}}</span>
                    <span class="room_unit">℃</span>
                  </div>
                </div>
                <div class="room_icon" v-show="item1.basicstatus == 'on'">
                  <el-button size="mini" title="请勿打扰" v-if="item1.status == 'WURAO'">
                    <img src="../../../static/images/icon/i_dnd.png">
                  </el-button>
                  <el-button size="mini" title="请即清理" v-if="item1.status == 'QINGLI'">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                  <el-button size="mini" title="正在清理" v-if="item1.status == 'QINGLIING'">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                  <el-button size="mini" title="等待检查" v-if="item1.status == 'JIANCHA'">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                  <el-button size="mini" title="正在检查" v-if="item1.status == 'JIANCHAING'">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                  <el-button size="mini" title="退房" v-if="item1.checkout == '1'">
                    <img src="../../../static/images/icon/i_checkout.png">
                  </el-button>
                  <!-- <el-button size="mini" title="风机(高)">
                    <img src='../../../static/images/icon/i_speed3.png'/>
                  </el-button>-->
                  <el-button size="mini" title="门磁报警" v-if="item1.doorWarning == '1'">
                    <img src="../../../static/images/icon/i_doorwarning.png">
                  </el-button>
                </div>
                <div v-show="item1.basicstatus != 'on'" class="unconnected">
                  <el-button size="mini" title="未链接">
                    <img src="../../../static/images/icon/link.png">
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-collapse-item>
          <span class="notData" v-if="this.noRoomData == false">暂无数据</span>
        </el-collapse>
      </el-card>
    </el-row>

    <!-- 客房管理 -->
    <el-dialog
      title="客房管理"
      :visible.sync="roomManagementDialogVisible"
      width="896px"
      class="roomManagementDialog"
    >
      <div class="info">
        <div class="room_detail">
          <div>
            <span>房间类型：</span>
            <!-- <span>{{roomInfo.roomTypeName}}</span> -->
          </div>
          <div>
            <span>房间号：</span>
            <span>{{roomInfo.roomNumber}}</span>
          </div>
        </div>
        <div class="equipment">
          <div class="equipment_title">设备</div>
          <div class="equipment_info">
            <div class="equipment_item" v-for="(item, index) in getRoomDeviceArr.tc" :key="index">
              <div class="item_title">空调</div>
              <div class="air_info" v-if="item.deviceStatus == '开'">
                <el-input-number
                  v-model="item.settingValue"
                  :min="16"
                  :max="32"
                  controls-position="right"
                  @change="handleChangeTemp($event, item)"
                  size="large"
                  style="font-size: 20px;"
                ></el-input-number>
                <div>
                  <span>模式：</span>
                  <span>
                    <el-radio-group
                      v-model="item.valueStatus"
                      size="mini"
                      @change="changeMode($event, item)"
                    >
                      <el-radio-button label="关闭"></el-radio-button>
                      <el-radio-button label="制暖"></el-radio-button>
                      <el-radio-button label="制冷"></el-radio-button>
                      <el-radio-button label="送风"></el-radio-button>
                    </el-radio-group>
                  </span>
                </div>
                <div>
                  <span>风速：</span>
                  <span>
                    <el-radio-group
                      v-model="item.speedStatus"
                      size="mini"
                      @change="changeAirSpeed($event, item)"
                    >
                      <el-radio-button label="关闭"></el-radio-button>
                      <el-radio-button label="低速"></el-radio-button>
                      <el-radio-button label="中速"></el-radio-button>
                      <el-radio-button label="高速"></el-radio-button>
                    </el-radio-group>
                  </span>
                </div>
              </div>
              <img src="../../../static/images/dialog/air.png" v-else>
              <div style="margin-top: 3px;">
                <el-radio-group
                  v-model="item.deviceStatus"
                  size="small"
                  @change="changeAir($event, item)"
                >
                  <el-radio-button label="开"></el-radio-button>
                  <el-radio-button label="关"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div
              class="equipment_item"
              v-for="(item, index) in getRoomDeviceArr.fan"
              :key="10 + index"
            >
              <div class="item_title">排气扇</div>
              <img
                src="../../../static/images/dialog/fan_close.png"
                v-if="item.deviceStatus == '关'"
              >
              <img src="../../../static/images/dialog/fan_open.png" v-else>
              <div>
                <el-radio-group
                  v-model="item.deviceStatus"
                  size="small"
                  @change="changeFan($event, item)"
                >
                  <el-radio-button label="开"></el-radio-button>
                  <el-radio-button label="关"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div
              class="equipment_item"
              v-for="(item, index) in getRoomDeviceArr.light"
              :key="100 + index"
            >
              <div class="item_title">灯光</div>
              <img
                src="../../../static/images/dialog/lamp_open.png"
                v-if="item.deviceStatus == '开'"
              >
              <img src="../../../static/images/dialog/lamp_close.png" v-else>
              <div>
                <el-radio-group
                  v-model="item.deviceStatus"
                  size="small"
                  @change="changeLight($event, item)"
                >
                  <el-radio-button label="开"></el-radio-button>
                  <el-radio-button label="关"></el-radio-button>
                </el-radio-group>
              </div>
            </div>

            <span
              v-if="getRoomDeviceArr.tc == false && getRoomDeviceArr.fan == false && getRoomDeviceArr.light == false"
              class="noHaveData"
            >暂无数据</span>
          </div>
        </div>
      </div>
      <!-- <div class="roomStatusForm">
        <el-form :model="roomStatus" ref="roomStatus">
          <el-form-item label="房间状态" :label-width="formLabelWidth1">
            <el-select v-model="roomStatus.status" placeholder="" style="width: calc(100% - 50px);">
              <el-option
                v-for="(item, index) in selectRoomStatus"
                :key="item.value"
                :label="item.name"
                :value="item.value"></el-option>
            </el-select>
            <el-button size="mini" icon="el-icon-check" circle style="margin-left: 10px;"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="lampForm">
        <div class="lamp_title">灯</div>
      </div>
      <div class="temporaryForm">
        <div class="temporary_title">
          <div>
            <span>温控器 </span>
            <span>实际温度(26℃)</span>
          </div>
          <el-button size="mini" icon="el-icon-check" circle></el-button>
        </div>
        <el-form :model="temperature" ref="temperature" class="temperatureInfo">
          <el-form-item label="设置温度" :label-width="formLabelWidth1" class="setting">
            <div class="setting_info">
              <el-input v-model="temperature.setting" autocomplete="off" size="mini"></el-input>
              <span>℃</span>
            </div>
          </el-form-item>
          <el-form-item label="阀门状态" :label-width="formLabelWidth1">
            <el-select v-model="temperature.status" placeholder="" style="width: 110px;" size="mini">
              <el-option
                v-for="(item,index) in statusTemp"
                :key="item.value"
                :label="item.name"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风机风速" :label-width="formLabelWidth1">
            <el-select v-model="temperature.speed" placeholder="" style="width: 60px;" size="mini">
              <el-option
                v-for="(item, index) in speedTemp"
                :key="item.value"
                :label="item.name"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风机模式" :label-width="formLabelWidth1">
            <el-select v-model="temperature.mode" placeholder="" style="width: 100px;" size="mini">
              <el-option
                v-for="(item, index) in modeTemp"
                :key="item.value"
                :label="item.name"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>-->
    </el-dialog>

    <!-- 全部消息 -->
    <el-dialog title="消息" :visible.sync="openNoticeDialogVisible" width="30%">
      <div style="max-height: 400px;overflow-y: scroll;">
        <div
          v-for="(item, index) in noticeList"
          :key="index"
        >{{item.buildingName + item.floorName + item.roomNumber}}:{{ item.status }}</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoomStatusList, addRoom, getFloorSelect, getHotelSelect, getBoomTypelSelect, getBuildingSelect, delRoom, getRights, getBrandSelect, editRoom, getHotelSeek, getRoomInfo, getRoomlList } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data';
import Axios from 'axios';

export default {
  data () {
    return {
      roomInfo: {
        roomTypeName: null,

      },
      myInterval: null, //定时器
      tip: true,  // 语音提示打开
      voiceTip: 'SOS警告提示', //语音提示信息
      mqttAdd: false,
      getRoomDeviceArr: {
        fan: [],
        light: [],
        tc: [],
      },
      currentTemp: 26,
      lamp: '关',
      fan: '关',
      airControl: '关',
      mode: '关闭',
      speed: '高速',
      noticeList: [],
      selectRoomStatus: [{
        name: '待租',
        value: 0,
      }, {
        name: '出租',
        value: 1,
      }],
      statusTemp: [{
        name: '送风(无阀)',
        value: 0
      }, {
        name: '冷阀',
        value: 1
      }, {
        name: '热阀',
        value: 2
      }, {
        name: '无效',
        value: 3
      }],
      speedTemp: [{
        name: '停',
        value: 0
      }, {
        name: '低',
        value: 1
      }, {
        name: '中',
        value: 2
      }, {
        name: '高',
        value: 3
      }],
      modeTemp: [{
        name: '手动模式',
        value: 0
      }, {
        name: '自动模式',
        value: 1
      }],
      loading: false,
      // 建筑列表数据
      activeNames: ['1', '2', '3', '4'],
      tableData: null,
      dialogFormVisible2: null,
      dialogFormVisible: null,
      foldData: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      formLabelWidth1: '80px',
      // 查询的数据
      seekData: {
        buildingId: null,
        floorId: null,
        mainBoardIp: null,
        hotelId: null,
        brandId: null,
      },
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
        value: '0',
        label: '管理卡'
      }, {
        value: '1',
        label: '服务员卡'
      }, {
        value: '2',
        label: '客人卡'
      }, {
        value: '3',
        label: '无卡'
      }],
      RTSelectData: [{
        value: 'QINGLI',
        label: '请求清理'
      }, {
        value: 'WURAO',
        label: '请勿打扰'
      }, {
        value: 'QINGLIING',
        label: '正在清理'
      }, {
        value: 'JIANCHA',
        label: '等待检查'
      }, {
        value: 'JIANCHAING',
        label: '正在检查'
      }],
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

      temperature: {
        setting: '',
        status: '',
        speed: '',
        mode: ''
      },
      roomStatus: [{
        status: ''
      }],

      defaultProps: {
        children: 'children',
        label: 'title'
      },
      noRoomData: false,
      roomManagementDialogVisible: false,
      openNoticeDialogVisible: false,
    }
  },
  // 注册表格组件
  components: {
  },
  created () {
    this.initialize()
    // 调用初始化表格数据方法
    this.polling()
    this.initList()  //带定时器的方法
    let allPermissions = JSON.parse(localStorage.getItem('userJurisdiction'))
    if (allPermissions.indexOf('mqtt:add') != -1) {
      this.mqttAdd = true
    } else {
      this.mqttAdd = false
    }
  },
  methods: {

    speckText (str) {
      var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=6&text=" + encodeURI(str);
      var n = new Audio(url);
      n.src = url;
      console.log(this.tip)
      if (this.tip) {
        n.play(); // $("...").play(); // var sound = new Sound(request); // sound.play();
      } else {
        n.pause()
      }
    },

    // 改变空调状态
    changeAir (oper, val) {
      console.log(val)
      let tc = val.tcId
      let onOff = oper == '关' ? 'off' : 'on'
      console.log(tc)
      let data = {};
      data[tc] = {
        workMode: val.valve,
        speed: val.speed,
        onOff: onOff,
        speedMode: 'auto',
        temp: val.settingValue,
      }
      Axios({
        method: 'post',
        url: "/mqtt/mqttb",
        data: {
          cmd: "air",
          id: val.mainboardId,
          index: 1,
          arg: data,
          // tc:{
          //   workMode: val.valve,
          //   speed: val.speed,
          //   onOff: onOff,
          //   speedMode: 'auto',
          //   temp: val.settingValue,
          // }
        },
        headers: {
          'Content-Type': 'application/json;',
        },
      }).then(res => {
        if (res.status == 200) {
          this.$message({
            type: 'info',
            message: '操作成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: '操作异常，请联系管理员！'
          })
        }
      })
    },

    // 更改温度
    handleChangeTemp (oper, val) {
      this.changeAir('开', val)
    },

    // 改变空调模式
    changeMode (oper, val) {
      switch (oper) {
        case '制暖':
          val.valve = 'heat';
          break;
        case '制冷':
          val.valve = 'cold';
          break;
        case '送风':
          val.valve = 'wind';
          break;
        case '关闭':
          val.valve = 'stop';
          break;
        default:
          val.valve = 'stop';
      }
      this.changeAir('开', val)
    },

    // 改变空调风速
    changeAirSpeed (oper, val) {
      switch (oper) {
        case '关闭':
          val.speed = 'stop';
          break;
        case '低速':
          val.speed = 'low';
          break;
        case '中速':
          val.speed = 'middle';
          break;
        case '高速':
          val.speed = 'high';
          break;
        default:
          val.speed = 'stop';
      }
      this.changeAir('开', val)
    },

    // 改变排气扇状态
    changeFan (oper, val) {
      let onoff = false
      let fanArr = JSON.parse(JSON.stringify(this.getRoomDeviceArr.fan))
      fanArr.forEach(item => {
        if (item.fanId == val.fanId) {
          item.status = item.status == '0' ? '1' : '0'
          onoff = true
        }
      })
      this.getRoomDeviceArr.fan = fanArr
      if (onoff == true) {
        let state = this.lightJsonData(fanArr, '排气扇')
        console.log(state)
        let lightJson = Object.assign({ id: val.fanId }, state)
        console.log(lightJson)
        Axios({
          method: 'post',
          url: "/mqtt/mqttb",
          data: {
            cmd: "fan",
            id: val.mainboardId,
            index: 1,
            arg: state
          },
          headers: {
            'Content-Type': 'application/json;',
          },
        }).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'info',
              message: '操作成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作异常，请联系管理员！'
            })
          }
        })
      }
    },


    // 改变灯光状态
    changeLight (oper, val) {
      let onoff = false
      let lightArr = JSON.parse(JSON.stringify(this.getRoomDeviceArr.light))
      lightArr.forEach(item => {
        if (item.lightId == val.lightId) {
          item.status = item.status == '0' ? '1' : '0'
          onoff = true
        }
      })
      this.getRoomDeviceArr.light = lightArr
      if (onoff == true) {
        let state = this.lightJsonData(lightArr, '灯光')
        console.log(state)
        let lightJson = Object.assign({ id: val.lightId }, state)
        console.log(lightJson)
        Axios({
          method: 'post',
          url: "/mqtt/mqttb",
          data: {
            cmd: "light",
            id: val.mainboardId,
            index: 1,
            arg: state
          },
          headers: {
            'Content-Type': 'application/json;',
          },
        }).then(res => {
          if (res.status == 200) {
            this.$message({
              type: 'info',
              message: '操作成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message: '操作异常，请联系管理员！'
            })
          }
        })
      }
    },

    // 灯光 json 格式
    lightJsonData (arr, type) {
      let on = [];
      let off = []
      arr.forEach(item => {
        if (type == '排气扇') {
          if (item.status == '0') {
            off.push(item.fanId)
          } else {
            on.push(item.fanId)
          }
        } else {
          if (item.status == '0') {
            off.push(item.lightId)
          } else {
            on.push(item.lightId)
          }
        }
      })
      return { on, off }
    },


    handleChange (val) {
      console.log(val);
    },


    // 消息
    openNotice () {
      this.openNoticeDialogVisible = true
    },

    initList () {
      // this.polling()
      this.myInterval = window.setInterval(() => {
        setTimeout(() => {
          this.polling()
        }, 1)
      }, 5000);
    },

    closeTips () {
      this.tip = false
    },

    // 初始化表格数据
    polling () {
      // this.noRoomData = false
      getRoomStatusList(this.seekData).then(res => {
        let allId = []
        let SOSList = []
        if (res.status === 200) {
          if (res.data.rows != false) {
            res.data.rows.forEach((item, index) => {
              allId.push(index)
              item.roomStatusRealtimeList.forEach(item1 => {
                item1.temperature = parseInt(item1.temperature)
              })
            })
            this.activeNames = allId
            this.noRoomData = true
          }else {
            this.noRoomData = false
          }
          if (res.data.roomMsg != false) {
            res.data.roomMsg.forEach(item => {
              if (item.status == 'SOS') {
                SOSList.push(item)
              }
            })
          }
          if (SOSList != false) {
            this.speckText(this.voiceTip)
          }
          // console.log(SOSList)
          // SOSList.forEach(item => {
          //   this.voiceTip = item.buildingName + item.floorName + item.roomNumber
          // })
          this.noticeList = res.data.roomMsg
          this.tableData = res.data.rows
        }
      })
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
    // 获取楼层下拉框 -- 4
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
      console.log('确认')
      // clearInterval(this.myInterval)
      // this.initList()
    },
    // 重置按钮
    reset () {
      this.seekData.brandId = this.seekData.hotelId = this.seekData.buildingId = this.seekData.floorId = this.seekData.typeName = this.seekData.mainBoardIp = this.seekData.rent = this.seekData.identity = this.seekData.doorWarning = this.seekData.status = this.seekData.sos = this.seekData.checkout = this.seekData.temp = null,
        this.hotelSelectData = this.buildingSelectData = this.floorSelectData = this.roomTypeSelectData = null
      // this.initList()
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
    },


    openDialog (val) {
      if (this.mqttAdd && val.basicstatus == 'on') {
        this.roomManagementDialogVisible = true
        this.roomInfo = val
        this.getRoomDeviceInfo(val.mainboardId)
      } else {
        this.$message({
          type: 'error',
          message: '暂时无法查看，请联系管理员！'
        })
      }
    },

    // 获取房间设备信息
    getRoomDeviceInfo (val) {
      getRoomInfo(val).then(res => {
        if (res.data.fan != false) {
          res.data.fan.forEach(item => {
            if (item.status == '0') {
              item.deviceStatus = '关'
            } else {
              item.deviceStatus = '开'
            }
          })
        }
        if (res.data.light != false) {
          res.data.light.forEach(item => {
            if (item.status == '0') {
              item.deviceStatus = '关'
            } else {
              item.deviceStatus = '开'
            }
          })
        }
        if (res.data.tc != false) {
          res.data.tc.forEach(item => {
            if (item.onOff == 'off') {
              item.deviceStatus = '关'
            } else {
              item.deviceStatus = '开'
            }
            switch (item.valve) {
              case 'heat':
                item.valueStatus = '制暖';
                break;
              case 'cold':
                item.valueStatus = '制冷';
                break;
              case 'wind':
                item.valueStatus = '送风';
                break;
              case 'stop':
                item.valueStatus = '关闭';
                break;
              default:
                item.valueStatus = '制暖';
            }
            switch (item.speed) {
              case 'stop':
                item.speedStatus = '关闭';
                break;
              case 'low':
                item.speedStatus = '低速';
                break;
              case 'middle':
                item.speedStatus = '中速';
                break;
              case 'high':
                item.speedStatus = '高速';
                break;
              default:
                item.speedStatus = '关闭';
            }
          })
        }
        console.log(res.data)
        this.lightJsonData(res.data.light)
        this.getRoomDeviceArr = res.data
      })
    }
  },
  destroyed () {
    console.log('destroyed')
    clearInterval(this.myInterval)
    // for(let i = 0; i< 10; i++ ){
    //   clearInterval(this.myInterval)
    // }
  },
  // beforeRouteLeave(to, from, next) {
  //     console.log(to, from, next)

  //     // window.clearInterval(this.initList);

  //     // //清除定时器
  //     next();
  // },
}
</script>
<style lang="scss" scoped>
.my-box {
  .notice {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 0;
    background: #fff;
    position: relative;
    .notice_list {
      overflow: hidden;
      width: calc(100% - 70px);
      .animate {
        padding-left: 20px;
        font-size: 12px;
        color: #000;
        display: inline-block;
        white-space: nowrap;
        animation: 300s wordsLoop linear infinite normal;
        span {
          margin-right: 20px;
        }
        @keyframes wordsLoop {
          0% {
            transform: translateX(200px);
            -webkit-transform: translateX(200px);
          }
          100% {
            transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
          }
        }

        @-webkit-keyframes wordsLoop {
          0% {
            transform: translateX(200px);
            -webkit-transform: translateX(200px);
          }
          100% {
            transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
          }
        }
      }
      &:hover {
        .animate {
          animation-play-state: paused;
        }
      }
    }
    .watch_all {
      position: absolute;
      right: 10px;
      font-size: 12px;
      color: #409eff;
      cursor: pointer;
    }
  }
  .is-hover-shadow {
    width: 130px;
    height: 118px;
    margin: 5px;
    border: 2px dashed #409eff;
    float: left;
    .building {
      img {
        margin-right: 5px;
      }
    }
    .room_item {
      display: inline-flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      .room_num {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        span {
          display: inline-block;
          padding: 0 18px 0 5px;
          line-height: 26px;
          color: #fff;
          background: #409eff;
          font-size: 10px;
          font-weight: bold;
          position: relative;
          &:before {
            position: absolute;
            right: 0;
            top: 0;
            content: '';
            border-width: 13px 13px 13px 13px;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
          }
        }
      }
      .room_info {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 5px 0;
        .room_status {
          width: 30px;
          height: 30px;
        }
        .temperature {
          .room_temperature {
            font-size: 30px;
            color: #409eff;
            margin-right: 2px;
          }
        }
      }
      .room_icon {
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .unconnected {
        text-align: center;
        margin-top: 6px;
      }
    }
  }
  .rentBackground {
    border: 2px solid #45ff40;
  }
  .notData {
    display: inline-block;
    width: 100%;
    height: 120px;
    text-align: center;
    line-height: 120px;
    color: #606266;
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
  .roomManagementDialog {
    .room_detail {
      display: inline-flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
    }
    .equipment {
      .equipment_title {
        font-size: 20px;
        color: rgb(64, 158, 255);
        margin-bottom: 5px;
      }
      .equipment_info {
        border: 2px dashed #409eff;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        height: 340px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        overflow-y: scroll;
        .equipment_item {
          text-align: center;
          min-width: 274px;
          .item_title {
            margin-bottom: 5px;
            font-size: 20px;
            color: #fff;
            background: #409eff;
            border-left: 1px solid #fff;
            border-right: 1px solid #fff;
          }
          .air_info {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 100px;
          }
        }
        .noHaveData {
          font-size: 20px;
          margin: 0 auto;
          line-height: 270px;
        }
      }
    }
    .roomStatusForm {
      padding-top: 18px;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #409eff;
    }
    .lampForm {
      width: 100%;
      padding-left: 10px;
      padding-top: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #409eff;
      .lamp_title {
        font-size: 20px;
      }
    }
    .temporaryForm {
      border-radius: 5px;
      border: 1px solid #409eff;
      padding-top: 10px;
      .temporary_title {
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        box-sizing: border-box;
        div {
          font-size: 0;
          span {
            &:nth-child(1) {
              font-size: 20px;
            }
            &:nth-child(2) {
              font-size: 12px;
              color: #409eff;
            }
          }
        }
      }
      .temperatureInfo {
        display: inline-flex;
        flex-direction: row;
        width: 100%;
        padding-right: 10px;
        box-sizing: border-box;
        .setting {
          .setting_info {
            display: inline-flex;
            flex-direction: row;
            width: 100%;
            span {
              margin-left: 2px;
            }
          }
        }
      }
    }
  }
}
</style>

<style type="text/css">
.roomPage .el-card__body {
  padding: 5px;
}
.room_icon .el-button--mini,
.room_info .el-button--mini,
.unconnected .el-button--mini {
  padding: 0px;
  margin: 0px 3px;
  border: none;
}
.room_icon .el-button--mini:hover,
.room_info .el-button--mini:hover,
.unconnected .el-button--mini:hover {
  background: none;
}
.setting .el-input__inner {
  width: 40px;
  padding: 0 5px;
}
.roomManagementDialog .el-dialog__body {
  padding-top: 10px;
}
.air_info .el-input-number .el-input__inner {
  font-size: 20px;
}
.air_info .el-radio-button--mini .el-radio-button__inner {
  /*padding: 7px;*/
}
</style>