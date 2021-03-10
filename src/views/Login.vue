<template>
  <div id="login">
    <el-form :model="userInfo" :rules="rules" ref="userInfo">
      <div class="login_logo">
        <div class="login_logo_inner">
          <img src="./../assets/img/login/logo.png" />
        </div>
      </div>
      <el-form-item>
        <el-input
          v-model="userInfo.usn"
          class="input_usn"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="userInfo.pwd"
          class="input_pwd"
          placeholder="请输入密码"
          show-password
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item class="login_btn">
        <el-button type="primary" @click="submitForm('userInfo')"
          >登录</el-button
        >
        <el-button type="info" @click="resetForm('userInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from "./../components/axios/axios";
export default {
  props: {},
  data() {
    return {
      userInfo: {
        usn: "",
        pwd: "",
      },
      rules: {
        usn: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http({
            url: "/login",
            method: "post",
            data: {
              username: this.userInfo.usn,
              password: this.userInfo.pwd,
            },
          }).then((res) => {
            if (res.meta.status == 200) {
              this.$message({
                message: "登陆成功!",
                type: "success",
                duration: 500,
                onClose: () => {
                  window.sessionStorage.setItem("token", res.data.token);
                  this.$router.push("/home");
                  console.log(res);
                },
              });
            } else {
              console.log("error submit!!");
              this.$message.error("用户或密码错误!");
              return false;
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  components: {},
};
</script>

<style lang="less">
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #2b4b6b;

  .login_logo {
    padding: 10px;
    position: absolute;
    top: -25%;
    width: 162px;
    height: 162px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.3);

    .login_logo_inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eeeeee;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .el-form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background: #fff;

    .el-form-item {
      width: 410px;
      height: 40px;
    }

    .login_btn {
      display: flex;
      position: relative;
      .el-form-item__content {
        position: absolute;
        right: 0;
      }
    }

    .el-form-item__content {
      display: flex;
      align-items: center;

      .el-input__inner {
        padding: 0 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
