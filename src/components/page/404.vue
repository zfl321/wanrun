<template>
  <div class="error-page">
    <div class="error-code">
      4
      <span>0</span>4
    </div>
    <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
    <div class="error-handle">
      <router-link to="/">
        <el-button type="primary" size="large">返回首页</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
      <el-button type="primary" size="large" @click="ppp">乱jb按</el-button>
    </div>
  </div>
</template>

<script>
import { ljbn } from "@/api";
export default {
  methods: {
    goBack () {
      this.$router.go(-1);
    },
    ppp () {
      ljbn({
        "topic": "/hotel/0C29AB800164",
        "cmd": "light",
        "id": "",
        "index": 1,
        "arg": {
          "id": 2,
          "on": [

          ],
          "off": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10
          ]
        }
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>


<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}
.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #2d8cf0;
}
.error-code span {
  color: #00a854;
}
.error-desc {
  font-size: 30px;
  color: #777;
}
.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}
.error-btn {
  margin-left: 100px;
}
</style>
