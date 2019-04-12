<template>
  <div class="my-box">
    <el-row>
      <el-card shadow="always">
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

        <!-- 按钮行 -->
        <el-row>
          <el-col :span="19">
            <el-button>详情</el-button>

            <el-button>新增</el-button>
            <el-button>编辑</el-button>
            <el-button>删除</el-button>
          </el-col>
          <el-col :span="5" class="reset-button">
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row>
      <el-card shadow="always">
        <Table></Table>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import Table from '@/components/common/Table.vue';
export default {
  data () {
    return {
      input10: '',
      input11: '',
      input12: '',
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
  }
}
</script>
<style lang="scss" scoped>
.my-box {
  .my-iemt {
    span {
      font-size: 14px;
    }
    white-space: nowrap;
    .my-input {
      max-width: 200px;
    }
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
  }
}
</style>
