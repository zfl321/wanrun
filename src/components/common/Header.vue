<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/img/img.jpg">
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <a href="https://github.com/txwh/vue-manage-system" target="_blank"> -->
            <!-- <a href="javascript:;" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>-->
            <el-button @click="resetPassword" style="border:0">修改密码</el-button>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 重置密码的弹框 -->
    <el-dialog title="重置密码" :visible.sync="dialogFormVisible3">
      <el-form
        label-position="right"
        label-width="250px"
        :rules="myrules"
        :ref="passwordData"
        :model="passwordData"
      >
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="账号">
              <el-input
                placeholder="请输入内容"
                v-model="passwordData.username"
                clearable
                disabled
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="真实姓名">
              <el-input
                placeholder="请输入内容"
                v-model="passwordData.fullName"
                clearable
                disabled
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="password">
              <el-input
                placeholder="请输入内容"
                v-model="passwordData.password"
                show-password
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="password2">
              <el-input
                placeholder="请再次输入密码"
                v-model="passwordData.password2"
                show-password
                class="my-input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="abrogateDassword">取 消</el-button>
        <el-button type="primary" @click="confirmDassword(passwordData)" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import bus from '../common/bus';
import { editpassword } from '@/api'
export default {
  data () {
    /* 密码自定义校验规则 */
    let Password = (rule, value, callback) => {
      // console.log(value)
      if (value == '') {
        callback(new Error('密码不能为空'))
      } else {
        let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/
        if (passwordReg.test(value)) {
          callback()
        } else {
          callback(new Error('包含大小写和数字 6-10位 无特殊符号'))
        }
      }
    }

    var validatePass2 = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      collapse: false,
      fullscreen: false,
      loading: false,
      name: 'linxin',
      message: 2,
      // 重置密码数据
      dialogFormVisible3: null,
      passwordData: {
        username: null,
        fullName: null,
        password: null,
        password2: null,
      },
      myrules: {
        password: [
          { required: true, validator: Password, trigger: ['blur', 'change'] }
        ],
        password2: [
          { required: true, validator: validatePass2, trigger: ['blur', 'change'] }
        ],
      },
    }
  },
  computed: {
    username () {
      let username = localStorage.getItem('username')
      username = username.replace(/\"/g, "");
      return username ? username : this.name;
    }
  },
  methods: {
    // 重置密码按钮
    resetPassword () {
      var page = JSON.parse(localStorage.getItem('user'));
      this.passwordData.username = page.username
      this.passwordData.fullName = page.fullName
      this.dialogFormVisible3 = true

    },
    confirmDassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          editpassword(this.passwordData).then(res => {
            this.loading = false
            if (res.data.code == 1) {
              this.dialogFormVisible3 = false
              this.$message({
                message: res.data.message,
                type: 'success'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    abrogateDassword () {
      this.dialogFormVisible3 = false
    },
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command == 'loginout') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('/login');
      }
    },
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
}
</script>
<style scoped>
.my-input {
  max-width: 215px;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
