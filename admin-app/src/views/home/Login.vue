!<!-- 登录页面 -->
<template>
  <div class="login-box">
    <div class="login-content">
      <div class="login-pic">
        <img :src="imgUrl" alt />
      </div>

      <!-- 登录组件 -->
      <div class="login-from">
        <div class="login-form--title">登录</div>

        <!-- 输入框1  prop -->

        <el-form ref="loginFrom" :rules="loginRules" class="el-input" :model="loginFrom">
          <el-form-item prop="username">
            <el-input
              v-model="loginFrom.username"
              placeholder="请输入手机/邮箱/用户名"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="userpass">
            <el-input
              v-model="loginFrom.userpass"
              placeholder="请输入密码"
              show-password
              prefix-icon="el-icon-lock"
              
            ></el-input>
          </el-form-item>
        </el-form>
        
        <button
          tag="button"
          class="el-button login-form_button el-button--primary is-round"
          @click="loginClick"
        >登录</button>
        <el-button type="text" @click="dialogVisible = true" class="login-form-register">注册</el-button>
      </div>
    </div>

    <!-- 注册 -->

    <el-dialog
      title="注册页面"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
      center
      show-message
    >
      <el-form ref="regForm" :rules="rules" :model="ruleForm" width="300px">
        <el-form-item label="账号" prop="user">
          <el-input v-model="ruleForm.user" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

         <el-form-item label="昵称" prop="id">
          <el-input v-model="ruleForm.id" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="repass">
          <el-input v-model="ruleForm.repass" prefix-icon="el-icon-key" show-password></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClick">取 消</el-button>
        <el-button type="primary" @click="resclick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 验证密码
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        let respass = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){8,20}$/;
        if (!respass.test(value)) {
          callback(
            new Error(
              "请输入8-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种"
            )
          );
        } else {
          callback();
        }
      }, 100);
    };
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('密码不一致!'));
        } else {
          callback();
        }
      };
      
    //这里存放数据
    return {
      imgUrl: require("@/assets/bg.jpg"),
      loginFrom: {
        username: "",
        userpass: "",
      },
      ruleForm: {
        user: "",
        id:"",
        pass: "",
        repass:"",
      },
      formLabelWidth: "70px",
      dialogVisible: false,
      loginRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 12, message: "长度在3到5个字符", trigger: "blur" },
        ],
        userpass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6到8个字符", trigger: "blur" },
        ],
      },
      rules: {
        user: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6到12个字", trigger: "blur" },
        ],
        
        id:[{required: true, message: "请输入昵称", trigger: "blur"},{ min: 2, max: 10, message: "长度在2到10个字", trigger: "blur" },],
        
        pass: [{required: true, message: "请输入密码", trigger: "blur"},{ validator: checkPass, trigger: "change" },{ validator: checkPass, trigger: "blur" }],

        repass: [
          {required: true, message: "请确认密码", trigger: "blur"},
          { validator: checkPass, trigger: "change" },
          { validator: checkPass, trigger: "blur" },
          { validator: validatePass2, trigger: "change" },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
        

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClose(done) {
      let _this = this;
      this.$confirm("确认关闭？")
        .then((_) => {
          _this.$refs.regForm.resetFields();

          done();
        })
        .catch((_) => {});
    },
    //并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
    loginClick() {
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          user: this.loginFrom.username,
          pwd: this.loginFrom.userpass,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code === 200) {

          this.$notify({
            title: "成功",
            message: res.data.msg,
            type: "success",
          });
          // localStorage.setItem('token', res.data.token);
          sessionStorage.setItem("token", res.data.token);
          

          this.$router.push("/home");

          // this.store.commit('usernameinit',this.ruleForm.user)
        }
        if (res.data.code === 400) {
          this.$notify.error({
            title: "警告",
            message: res.data.msg,
          });
        }
      });
      // .catch(err=>{
      //   console.log(err);
      // })
    },
    dialogClick() {
      this.$refs.regForm.resetFields();
      this.dialogVisible = false;
    },
    // 注册确定  方法resetFields();	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    resclick() {

      if (this.ruleForm.user === "") {
        this.$notify.error({
          title: "失败",
          message: "请输入账号",
        });
        this.dialogVisible = false;
        return;
      }else if(this.ruleForm.id===""){
         this.$notify.error({
          title: "失败",
          message: "请输入昵称",
        });
        this.dialogVisible = false;
        return;
      }
       else if (this.ruleForm.pass === "") {
        this.$notify.error({
          title: "失败",
          message: "请输入密码",
        });
        this.dialogVisible = false;
        return;
      }else if (this.ruleForm.repass === "") {
        this.$notify.error({
          title: "失败",
          message: "请确认密码",
        });
        this.dialogVisible = false;
        return;
      }

      this.$axios({
        url: "/register",
        method: "post",
        data: {
          user: this.ruleForm.user,
          pwd: this.ruleForm.pass,
        },
      }).then((res) => {
        console.log(res);
        this.$notify({
          title: "成功",
          message: res.data.msg,
          type: "success",
        });
      });
      this.$refs.regForm.resetFields();
      this.dialogVisible = false;
    },
  },
  
};
</script>
<style lang="less"  scoped>
.login-box {
  height: 100vh;
  background-image: url("../../assets/bg.png");
  .login-content {
    width: 1140px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -570px;
    margin-top: -200px;
    display: flex;
    justify-content: space-between;
    .login-pic {
      flex: 1;
      height: 100%;
      border-radius: 15px;

      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    .login-from {
      width: 340px;
      border-radius: 12px;
      margin-left: 36px;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      background-color: #fff;
      text-align: center;
      padding: 36px;
      .login-form--title {
        user-select: none;
        font-size: 32px;
        text-align: center;
        margin-bottom: 36px;
        font-weight: 700;
      }
      .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        margin-bottom: 15px;
      }
      .login-form_button {
        width: 100%;
      }
      .login-form-register {
        width: 100px;
        position: absolute;
        bottom: 2px;
        right: 10px;
        background: white;
        border: none;
        color: turquoise;
      }
      .login-form-register:hover {
        border-radius: 15px;
        text-align: center;
        background: #409eff;
        color: white;
      }
      .el-form-item__error {
        color: #f56c6c;
        font-size: 12px;
        position: absolute;
        top: 85%;
        left: 10px;
      }
    }
  }
}
</style>