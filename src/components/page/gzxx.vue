<template>
  <!-- 故障信息页面 -->
  <div id="ap">
    <el-card shadow="always" class="my-card">
      <el-collapse-transition>
        <div v-show="foldData" style="margin-bottom: 10px">
          <Select></Select>

          <el-row>
            <el-col :span="12">
              <div class>
                <div class="block">
                  <span class="demonstration my-span">发生时间:</span>
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
            <el-col :span="12">
              <div class>
                <div class="block">
                  <span class="demonstration my-span">处理时间:</span>
                  <el-date-picker
                    v-model="value7"
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
            <el-button>处理</el-button>
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
    <!-- 表单模块 -->
    <el-card>
      <Table></Table>
    </el-card>
  </div>
</template>
<script>
// 引入选择器组件
import Select from '@/components/common/select.vue';
import Table from '@/components/common/Table.vue';
export default {
  data () {
    return {
      foldData: true,
      value6: '',
      value7: '',
      checkAll: false,
      isIndeterminate: true

    }
  },
  // 注册选择器组件
  components: {
    Select,
    Table
  },
  methods: {
    fold () {
      this.foldData = !this.foldData
    }
  }
}
</script>

<style lang="scss">
#ap {
  .my-card {
    margin-bottom: 10px;
    .my-span {
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
