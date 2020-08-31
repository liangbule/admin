<template>
  <div id="app">
    <el-container>
      <!-- header!!!!!!!!! -->
      <el-header style="height:8vh">
        <!-- log!!!!!!!! -->
        <div class="header-bar">admin</div>
        <div class="header-title">{{title}}</div>
        <div class="header-log">
          <HeaderLog></HeaderLog>
        </div>
      </el-header>
      <!-- 版心内容 -->
      <el-container style="height:92vh">
        <!-- 侧边导航栏 -->
        <el-aside width="200px">
          <!-- 用户信息 -->
          <!-- 导航栏 开始-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            text-color="#333"
            background-color="#f1f8fa"
            active-text-color="#333"
            :router="true"
          >
            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span>后台主页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>代理商</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/merchant">
                  <span>代理商管理</span>
                </el-menu-item>
                <el-menu-item index="/home/merchantAdd">
                  <span>添加代理商</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-shopping-bag-2"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/shopAdd">
                  <span>商品添加</span>
                </el-menu-item>
                <el-menu-item index="/home/shop">
                  <span>商品列表</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/home/statistics">
              <i class="el-icon-s-data"></i>
              <span>统计报表</span>
            </el-menu-item>
            <el-menu-item index="/home/user">
              <i class="el-icon-setting"></i>
              <span>用户权限</span>
            </el-menu-item>
            <el-menu-item index="/home/intellectual">
              <i class="el-icon-notebook-1"></i>
              <span>提交进度</span>
            </el-menu-item>
            <el-menu-item index="/home/account">
              <i class="el-icon-user"></i>
              <span>我的账号</span>
            </el-menu-item>
          </el-menu>
          <!-- 导航栏 结束-->
        </el-aside>
        <el-main style="padding:0;">
           <!-- <div class="main-title">{{title}}</div> -->
          
          <router-view></router-view>
          <!-- 这里是内容展示 -->
          
          <div class="main-foot">Copyright©2011-2020 电脑疯狂闪屏死机重启</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderLog from "./HeaderLog";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderLog,
  },
  data(){
    return {
      title:''
    }
  },
  
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    titleData (){
      let titleData = window.location.href.slice(window.location.href.indexOf('#')+2)
      switch(titleData){
        case 'home':return this.title='后台主页'
        case 'home/merchant':return this.title='代理商管理'
        case 'home/merchantAdd':return this.title='添加代理商'
        case 'home/shopAdd':return this.title='商品添加'
        case 'home/shop':return this.title='商品列表'
        case 'home/statistics':return this.title='统计报表'
        case 'home/user':return this.title='用户权限'
        case 'home/intellectual':return this.title='知识产权'
      }
      }
  },
  mounted() {
    this.titleData()
  },
  updated() {
    this.titleData()
  }
};

</script>

<style lang="less">
body {
  padding: 0;
  margin: 0;
  .el-menu-item-group__title{
  // width: 201px;
  padding: 0;
  box-sizing: content-box;
  width: 200px;
  border-right: none;
}
}
//  布局css
.el-menu-item,.el-submenu__title{
  width: 200px;
}

.el-header {
  background-color: #24292e;
  color:rgb(90, 141, 192);
  text-align: center;
  line-height: 60px;
  padding: 0 !important;
  .header-bar {
    width: 200px;
    height: 100%;
    justify-content: center;
    color: red;
    background-image: -webkit-linear-gradient(bottom, #ff537e, #02a898);
    background-clip: text;
    color: transparent;
    font-weight: 700;
    font-size: 28px;
    box-shadow: 2px 0 4px rgba(0, 150, 136, 0.1);
    width: 200px;
    float: left;
    user-select: none;
  }
}
.header-log {
  float: right;
  // width: 200px;
  height: 100%;
}
.el-header {
  font-size: 34px;
  img {
    width: 50px;
    height: 50px;
    float: left;
  }
}
.el-aside {
  background: #f1f8fa;
  color: #333;
  text-align: center;
  line-height: 200px;
  box-shadow: 2px 0 4px rgba(0, 150, 136, 0.1);
}
.header-title{
  float: left;
  font-size: 20px;
  color: rgb(37, 188, 191);
  text-indent:20px
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  position: relative;

  .main-foot {
            width: 100%;
            text-align: center;
            height: 50px;
            line-height: 50px;
            background-color: #fff;
            font-size: 12px;    
            margin-top: 10px;        
  }
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
//   侧边栏css
</style>
