<template>
  <!-- 头部选择器 -->
  <div>
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
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inputVel: {
        hang: [
          {
            lie: [
              {
                name: "集团",
                value: "",
                message: [
                  "博涛",
                  "锦江",
                  "华住"
                ]
              },
              {
                name: "品牌",
                value: "",
                message: [
                  "七天",
                  "如家",
                  "汉庭"
                ]
              },
              {
                name: "门店",
                value: "",
                message: [
                  "天河",
                  "海珠",
                  "黄埔"
                ]
              },
              {
                name: "建筑",
                value: "",
                message: [
                  "一栋",
                  "二栋",
                  "三栋"
                ]
              }
            ]
          },
          {
            lie: [
              {
                name: "楼层",
                value: "",
                message: [
                  "1楼",
                  "2楼",
                  "3楼"
                ]
              },
              {
                name: "房间号",
                value: "",
                message: [
                  "101",
                  "102",
                  "103"
                ]
              },
              {
                name: "状态",
                value: "",
                message: [
                  "未处理",
                  "已处理"
                ]
              },
              {
                name: "故障类型",
                value: "",
                message: [
                  "通信故障",
                  "空调异常"
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
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
</style>
