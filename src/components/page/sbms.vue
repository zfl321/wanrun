<template>
<!-- 设备模式页面 -->
  <el-card shadow="always">
    <div class="box">
      <el-row :gutter="10" v-for="(item,index) in inputVel.hang" :key="index">
        <el-col :span="8" v-for="(item1,index1) in item.lie" :key="index1">
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
      <div class="radio">
        <el-radio v-model="radio" label="1" border>夏季模式</el-radio>
        <el-radio v-model="radio" label="2" border>冬季模式</el-radio>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      radio: "1",
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
.box {
  max-width: 700px;
  margin: 50px auto;
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
  }
  .radio {
    text-align: center;
  }
}
</style>
