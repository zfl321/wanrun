<template>
<!-- 设备模式页面 -->
  <el-card shadow="always">
    <div class="box">
      <div class="modeType">季节模式</div>
      <el-form label-width="70px">
        <el-row :gutter="10">
          <el-col :span="8">
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
            <!-- <div class="grid-content">
              <span>{{item1.name}}:</span>
              <el-select v-model="item1.value" placeholder="请选择">
                <el-option
                  :label="item2"
                  :value="index2"
                  v-for="(item2,index2) in item1.message"
                  :key="index2"
                ></el-option>
              </el-select>
            </div> -->
          </el-col>
          <el-col :span="8">
            <el-form-item label="门店">
              <el-select v-model="seekData.hotelId" clearable placeholder="请选择">
                <el-option
                  v-for="(item,index) in hotelSelectData"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16" style="display: inline-flex;flex-direction: row;justify-content: space-around;width: 66.66%;">
            <el-radio-group v-model="seekData.radio">
              <el-radio :label="1" border>夏季模式</el-radio>
              <el-radio :label="0" border>冬季模式</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="8" style="text-align: center;">
            <el-button type="primary" size="small" @click="submit">确认</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- <el-row :gutter="10" v-for="(item,index) in inputVel.hang" :key="index">
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
      </el-row> -->
      <!-- <div class="sb_btns">
        <div class="radio">
          <el-radio v-model="radio" label="1" border>夏季模式</el-radio>
          <el-radio v-model="radio" label="2" border>冬季模式</el-radio>
        </div>
        <div class="confirm_btn">
          <el-button type="primary" size="small" @click="submit">确认</el-button>
        </div>
      </div> -->

      <el-card class="sbTable" v-if="show">
        <sbTable></sbTable>
      </el-card>
    </div>
  </el-card>
</template>
<script>
  import sbTable from '@/components/common/sbTable.vue';
  import { setSeasonal, getBrandSelect, getHotelSelect,  } from '@/api';
  export default {
    data () {
      return {
        seekData: {
          hotelId: null,
          brandId: null,
          radio: 1,
        },
        brandSelectData: [],
        hotelSelectData: [],
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
        console.log(this.seekData)
        if(this.seekData.brandId == null || this.seekData.hotelId == null){
          this.$message({
            type: 'info',
            message: '请选择品牌或门店'
          })
        }else {
          // setSeasonal(this.seekData).then(res => {
          //   console.log(res)
          // })
          // this.show = this.show ? false : true;
        }
      },

      // 获取品牌
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
      },
    },
    created() {
      this.initialize()
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
