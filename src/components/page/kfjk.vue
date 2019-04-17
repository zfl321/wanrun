<template>
  <div class="my-box" v-loading="loading">
    <el-row class="notice">
      <!-- <div>消息通知</div> -->
      <div class="notice_list">
        <div class="animate">
          <span v-for="(item, index) in noticeList" :key="index">{{item}}</span>
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
              </div>
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
          <!-- <el-collapse-item
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
          </el-collapse-item>-->
          <el-collapse-item name="1">
            <template slot="title">
              <div
                class="building"
                style="display: inline-flex;flex-direction: row;align-items: center;"
              >
                <img src="../../../static/images/icon/buildingName.png" style="margin-right: 5px;">
                <span>UP智谷B1栋</span>
              </div>
              <div
                class="floor"
                style="display: inline-flex;flex-direction: row;align-items: center;"
              >
                <img
                  src="../../../static/images/icon/floor.png"
                  style="margin-right: 5px;margin-left: 5px;"
                >
                <span>二楼</span>
              </div>
            </template>
            <el-card shadow="hover" @click.native="openDialog">
              <div class="room_item">
                <span class="room_num">
                  <span>1501</span>
                  <img src="../../../static/images/icon/i_sos.png">
                </span>
                <div class="room_info">
                  <el-button size="mini" title="客人卡">
                    <img src="../../../static/images/icon/i_identity9.png" class="room_status">
                  </el-button>
                  <div class="temperature">
                    <span class="room_temperature">26</span>
                    <span class="room_unit">℃</span>
                  </div>
                </div>
                <div class="room_icon">
                  <el-button size="mini" title="请勿打扰">
                    <img src="../../../static/images/icon/i_dnd.png">
                  </el-button>
                  <el-button size="mini" title="退房">
                    <img src="../../../static/images/icon/i_checkout.png">
                  </el-button>
                  <el-button size="mini" title="风机(高)">
                    <img src="../../../static/images/icon/i_speed3.png">
                  </el-button>
                  <el-button size="mini" title="门磁报警">
                    <img src="../../../static/images/icon/i_doorwarning.png">
                  </el-button>
                  <el-button size="mini" title="请即清理">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                </div>
              </div>
            </el-card>
            <el-card shadow="hover" @click.native="openDialog">
              <div class="room_item">
                <span class="room_num">
                  <span>1501</span>
                  <img src="../../../static/images/icon/i_sos.png">
                </span>
                <div class="room_info">
                  <el-button size="mini" title="客人卡">
                    <img src="../../../static/images/icon/i_identity9.png" class="room_status">
                  </el-button>
                  <div class="temperature">
                    <span class="room_temperature">26</span>
                    <span class="room_unit">℃</span>
                  </div>
                </div>
                <div class="room_icon">
                  <el-button size="mini" title="请勿打扰">
                    <img src="../../../static/images/icon/i_dnd.png">
                  </el-button>
                  <el-button size="mini" title="退房">
                    <img src="../../../static/images/icon/i_checkout.png">
                  </el-button>
                  <el-button size="mini" title="风机(高)">
                    <img src="../../../static/images/icon/i_speed3.png">
                  </el-button>
                  <el-button size="mini" title="门磁报警">
                    <img src="../../../static/images/icon/i_doorwarning.png">
                  </el-button>
                  <el-button size="mini" title="请即清理">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                </div>
              </div>
            </el-card>
            <el-card shadow="hover" @click.native="openDialog">
              <div class="room_item">
                <span class="room_num">
                  <span>1501</span>
                  <img src="../../../static/images/icon/i_sos.png">
                </span>
                <div class="room_info">
                  <el-button size="mini" title="客人卡">
                    <img src="../../../static/images/icon/i_identity9.png" class="room_status">
                  </el-button>
                  <div class="temperature">
                    <span class="room_temperature">26</span>
                    <span class="room_unit">℃</span>
                  </div>
                </div>
                <div class="room_icon">
                  <el-button size="mini" title="请勿打扰">
                    <img src="../../../static/images/icon/i_dnd.png">
                  </el-button>
                  <el-button size="mini" title="退房">
                    <img src="../../../static/images/icon/i_checkout.png">
                  </el-button>
                  <el-button size="mini" title="风机(高)">
                    <img src="../../../static/images/icon/i_speed3.png">
                  </el-button>
                  <el-button size="mini" title="门磁报警">
                    <img src="../../../static/images/icon/i_doorwarning.png">
                  </el-button>
                  <el-button size="mini" title="请即清理">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <div
                class="building"
                style="display: inline-flex;flex-direction: row;align-items: center;"
              >
                <img src="../../../static/images/icon/buildingName.png" style="margin-right: 5px;">
                <span>UP智谷B1栋</span>
              </div>
              <div
                class="floor"
                style="display: inline-flex;flex-direction: row;align-items: center;"
              >
                <img
                  src="../../../static/images/icon/floor.png"
                  style="margin-right: 5px;margin-left: 5px;"
                >
                <span>三楼</span>
              </div>
            </template>
            <el-card shadow="hover" @click.native="openDialog">
              <div class="room_item">
                <span class="room_num">
                  <span>1501</span>
                  <img src="../../../static/images/icon/i_sos.png">
                </span>
                <div class="room_info">
                  <el-button size="mini" title="客人卡">
                    <img src="../../../static/images/icon/i_identity9.png" class="room_status">
                  </el-button>
                  <div class="temperature">
                    <span class="room_temperature">26</span>
                    <span class="room_unit">℃</span>
                  </div>
                </div>
                <div class="room_icon">
                  <el-button size="mini" title="请勿打扰">
                    <img src="../../../static/images/icon/i_dnd.png">
                  </el-button>
                  <el-button size="mini" title="退房">
                    <img src="../../../static/images/icon/i_checkout.png">
                  </el-button>
                  <el-button size="mini" title="风机(高)">
                    <img src="../../../static/images/icon/i_speed3.png">
                  </el-button>
                  <el-button size="mini" title="门磁报警">
                    <img src="../../../static/images/icon/i_doorwarning.png">
                  </el-button>
                  <el-button size="mini" title="请即清理">
                    <img src="../../../static/images/icon/clear_room.png">
                  </el-button>
                </div>
              </div>
            </el-card>
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

    <!-- 客房管理 -->
    <el-dialog
      title="客房管理"
      :visible.sync="roomManagementDialogVisible"
      width="62%"
      class="roomManagementDialog"
    >
      <div class="info">
        <div class="room_detail">
          <div>
            <span>房间类型：</span>
            <span>经济房</span>
          </div>
          <div>
            <span>房间号：</span>
            <span>101</span>
          </div>
        </div>
        <div class="equipment">
          <div class="equipment_title">设备</div>
          <div class="equipment_info">
            <div class="equipment_item">
              <div class="item_title">空调</div>
              <div class="air_info" v-if="airControl == '开'">
                <el-input-number
                  v-model="currentTemp"
                  controls-position="right"
                  @change="handleChangeTemp"
                  size="large"
                  style="font-size: 20px;"
                ></el-input-number>
                <div>
                  <span>模式：</span>
                  <span>
                    <el-radio-group v-model="mode" size="mini" @change="changeMode">
                      <el-radio-button label="制暖"></el-radio-button>
                      <el-radio-button label="制冷"></el-radio-button>
                      <el-radio-button label="送风"></el-radio-button>
                      <el-radio-button label="除湿"></el-radio-button>
                    </el-radio-group>
                  </span>
                </div>
                <div>
                  <span>风速：</span>
                  <span>
                    <el-radio-group v-model="speed" size="mini">
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
                <el-radio-group v-model="airControl" size="small">
                  <el-radio-button label="开"></el-radio-button>
                  <el-radio-button label="关"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="equipment_item">
              <div class="item_title">排气扇</div>
              <img src="../../../static/images/dialog/fan_open.png" v-if="fan == '开'">
              <img src="../../../static/images/dialog/fan_close.png" v-else>
              <div>
                <el-radio-group v-model="fan" size="small">
                  <el-radio-button label="开"></el-radio-button>
                  <el-radio-button label="关"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="equipment_item">
              <div class="item_title">灯光</div>
              <img src="../../../static/images/dialog/lamp_open.png" v-if="lamp == '开'">
              <img src="../../../static/images/dialog/lamp_close.png" v-else>
              <div>
                <el-radio-group v-model="lamp" size="small">
                  <el-radio-button label="开"></el-radio-button>
                  <el-radio-button label="关"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
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
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
      <div>UP智谷B1栋2604: 请立即清理</div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoomStatusList, addRoom, getFloorSelect, getHotelSelect, getBoomTypelSelect, getBuildingSelect, delRoom, getRights, getBrandSelect, editRoom, getHotelSeek } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  data () {
    return {
      currentTemp: 26,
      lamp: '关',
      fan: '关',
      airControl: '关',
      mode: '除湿',
      speed: '高速',
      noticeList: ['中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理', '中山南朗2620：请即清理'],
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

      roomManagementDialogVisible: false,
      openNoticeDialogVisible: false,
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

    changeMode () {
      console.log(this.mode)
    },

    // 消息
    openNotice () {
      this.openNoticeDialogVisible = true
    },

    // 更改温度
    handleChangeTemp (val) {
      console.log(val)
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
    },


    openDialog () {
      this.roomManagementDialogVisible = true
    },
  }
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
        animation: 30s wordsLoop linear infinite normal;
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
    border-color: #409eff;
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
    }
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
        padding: 5px;
        box-sizing: border-box;
        border-radius: 5px;
        .equipment_item {
          text-align: center;
          width: 33.33%;
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
.my-box .el-card__body {
  padding: 5px;
}
.room_icon .el-button--mini,
.room_info .el-button--mini {
  padding: 0px;
  margin: 0px 3px;
  border: none;
}
.room_icon .el-button--mini:hover,
.room_info .el-button--mini:hover {
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
</style>