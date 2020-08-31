!<!--  -->
<template>
  <div class="back">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp"
      >{{activity.content}}</el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      activities: [
        {
          content: "世豪把组件标题与页脚挪到了主页上",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "威哥更新主分支",
          timestamp: "2020-08-6 6:46",
          size: "large",
          type: "warning",
          icon: "el-icon-refresh",
        },
        {
          content:
            "世豪合并分支“主”的https://github.com/liyanwei741/h5-2003-vue",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-check",
        },
        {
          content: "阿翔更新仓库",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "warning",
          icon: "el-icon-refresh",
        },
        {
          content: "啊翔进行了样式调整",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "威哥合并了分支",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-check",
        },
        {
          content: "wangwenmei更新仓库",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "warning",
          icon: "el-icon-refresh",
        },
        {
          content: "威修改内容的header和footer",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "啊翔更新master分支",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-refresh",
        },
        {
          content: "wangwenmei进行了样式调整",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2 ",
        },
        {
          content: "世豪改编辑框bug",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2 ",
        },
        {
          content: "阿翔合并分支冲突",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "danger",
          icon: "el-icon-warning-outline ",
        },
        {
          content: "wang合并了主分支",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "啊翔完善了UI",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "世豪请求了合并",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "威哥完成主页数据请求与渲染",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2 ",
        },
         {
          content: "威哥完成主页数据请求与渲染",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2 ",
        },{
          content: "啊翔合并分支冲突",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "danger",
          icon: "el-icon-warning-outline ",
        },
        {
          content: "啊翔nav样式修改",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2 ",
        },
        {
          content: "wang完善了代码更新仓库",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-refresh",
        },
        {
          content: "啊翔修改了样式更新仓库",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "wang更新仓库",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "warning",
          icon: "el-icon-refresh",
        },
        {
          content: "阿翔修改了注册更新配置",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
        {
          content: "wangaxios配置",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-warning-outline",
        },
        {
          content: "陈拉取分支",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-check",
        },
        {
          content: "wang代理商对话框编辑",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-check",
        },
        {
          content: "世豪创建了仓库",
          timestamp: "2020-08-6 20:46",
          size: "large",
          type: "success",
          icon: "el-icon-upload2",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.back{
  margin: 40px;
}
</style>