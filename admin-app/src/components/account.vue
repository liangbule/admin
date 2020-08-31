<!--  -->
<template>
    
    <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <div class='sculpture'>
    <el-avatar
          class="app-img"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>

          <el-button type="success">更换头像</el-button>

    </div>
        
  <el-form-item label="账号">
    <el-input v-model="form.id"></el-input>
  </el-form-item>
 
  <el-form-item label="昵称">
    <el-input v-model="form.name"
    clearable ></el-input>
  </el-form-item>
    
    <el-form-item label="邮箱">
        <el-input v-model="form.mail" clearable></el-input>
  </el-form-item>

    <el-form-item label="手机">
        <el-input v-model="form.phone" clearable></el-input>
    </el-form-item>

      <el-form-item label="性别">
    <el-radio-group v-model="form.sex">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>

    <el-form-item label="自动登录">
    <el-switch v-model="form.aotulogin"></el-switch>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
    data() {
      return {
        form: {
          id:'',
          name: '',
          mail:'',
          sex:'',
          phone:'',
          aotulogin: false,

          region: '',
          date1: '',
          date2: '',
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },

components: {},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.el-form{
    margin-top:10px;
    width: 60%;
    margin: 0 auto;
    .sculpture{
        text-align: center;
        .el-avatar{
            width: 80px;
            height: 80px;
        }
        .el-button{
            display: block;
            margin: auto;
            margin-top: 10px;
            margin-bottom: 20px;
        }
        }
        }
</style>