<template>
  <!-- 客房事件页面 -->
  <!-- 头部选择器 -->
  <div class="my-box">
    <el-card shadow="always" class="my-card">
      <el-collapse-transition>
        <div v-show="foldData" style="margin-bottom: 10px">
          <el-row :gutter="10" v-for="(item,index) in inputVel.hang" :key="index">
            <el-col :span="6" v-for="(item1,index1) in item.lie" :key="index1">
              <div class="grid-content">
                <span>{{item1.name}}:</span>
                <el-select v-model="item1.value" placeholder="请选择">
                  <el-option
                    :label="item2"
                    :value="index2"
                    v-for="(item2,index2) in item1.message"
                    :key="index2"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <div class>
                <div class="block">
                  <span class="demonstration">触发时间:</span>
                  <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-button>导出</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content reset-button">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
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
      <Table></Table>
    </el-card>
  </div>
</template>
<script>
import Table from '@/components/common/Table.vue';
export default {
  data () {
    return {
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
      }
    }
  },
  // 注册表格组件
  components: {
    Table
  },
  methods: {
    fold () {
      this.foldData = !this.foldData
    }
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
