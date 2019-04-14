<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">万润智能后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="password"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
        </div>
        <!-- <p class="login-tips">Tips : 暂时用户名和密码随便填。</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  data: function () {
    return {
      loading: false,
      ruleForm: {
        username: 'admin',
        password: '123456.'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(isOk => {
        if (isOk) {
          this.loading = true
          login({ username: this.ruleForm.username, password: this.ruleForm.password })
            .then(res => {
              // console.log(res)
              this.loading = false
              if (res.data.message === "认证成功") {
                this.$message.success('登陆成功')
                // 将登录成功后的token保存到localStorage中
                localStorage.setItem('token', res.data.data.token)
                // 保存用户名信息
                localStorage.setItem('user', JSON.stringify(res.data.data.user))
                // 保存用户名称
                localStorage.setItem('username', JSON.stringify(res.data.data.user.username))
                // 登录成功跳转到首页
                this.$router.push('/')
              } else {
                // 弹出错误提示信息，
                this.$message.error(res.data.message)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          alert('请正确输入信息后再提交')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>