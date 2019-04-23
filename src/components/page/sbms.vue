<template>
<!-- 设备模式页面 -->
  <el-card shadow="always">
    <div class="box">
      <div class="modeType">季节模式</div>
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
      <div class="sb_btns">
        <div class="radio">
          <el-radio v-model="radio" label="1" border>夏季模式</el-radio>
          <el-radio v-model="radio" label="2" border>冬季模式</el-radio>
        </div>
        <div class="confirm_btn">
          <el-button type="primary" size="small" @click="submit">确认</el-button>
        </div>
      </div>

      <el-card class="sbTable" v-if="show">
        <sbTable></sbTable>
      </el-card>
    </div>
  </el-card>
</template>
<script>
  import sbTable from '@/components/common/sbTable.vue';
  export default {
    data () {
      return {
        show: false,
        radio: "1",
        inputVel: {
          hang: [
            {
              lie: [
                // {
                //   name: "集团",
                //   value: "",
                //   message: [
                //     "博涛",
                //     "锦江",
                //     "华住"
                //   ]
                // },
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
    },
    methods: {
      submit(){
        this.show = this.show ? false : true;
      }
    },
    components: {
      sbTable
    }
  }
</script>
<style lang="scss">
.box {
  position: relative;
  max-width: 750px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 2px dashed #409EFF;
  margin: 50px auto;
  .modeType {
    position: absolute;
    top: -20px;
    font-size: 18px;
    background: #fff;
    padding: 8px 10px;
  }
  .el-row {
    margin-top: 10px;
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
  .sb_btns {
    display: inline-flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    .radio {
      flex: 4;
      text-align: center;
    }
    .confirm_btn {
      flex: 1;
      text-align: center;
    }
  }
  .sbTable {
    margin-top: 20px;
  }
}
</style>
