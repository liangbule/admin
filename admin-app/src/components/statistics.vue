<template>
  <div>
    <el-container class="box">
      <!-- 头部 -->
      <!-- <el-header>统计报表</el-header> -->
      <!-- 内容 -->
      <section class="Sta_main">
        <el-row>
          <!-- 日历 -->
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <div class="block" style="line-height:0;text-align:left;">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="border:none;"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 日历结束 -->
        <!-- 表格开始 -->
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          border
          style="width:95%;margin:10px auto;"
        >
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="shopName" label="商品名"> </el-table-column>
          <el-table-column prop="order" label="订货单"> </el-table-column>
          <el-table-column prop="quit" label="退货单"> </el-table-column>
          <el-table-column prop="city" label="地区"> </el-table-column>
          <el-table-column prop="sales" label="销量"> </el-table-column>
          <el-table-column prop="money" label="金额"> </el-table-column>
          <el-table-column prop="name" label="负责人"> </el-table-column>
        </el-table>
        <!-- 表格结束 -->
        <!-- 分页器 -->
        <el-pagination
          background
          layout="total,prev, pager, next"
          :total="tableData.length"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
        >
        </el-pagination>
        <!-- echarts -->
        <div
          id="echartsBox"
          style="width:90%; height:500px; margin:20px auto;"
          :key="sum"
        ></div>
      </section>
      <!-- 内容区结束 -->
    </el-container>
  </div>
</template>

<script>
import Echarts from "echarts";
export default {
  // watch: {
  //   option: {
  //     handler(option, oldoption) {
  //       this.option = option;
  //     }
  //   },
  //   deep: true,
  //   immediate: true
  // },
  data() {
    return {
      currentPage: 1, //初始化话页数
      pageSize: 4,
      tableData: [], //表格数据
      sum: 0,
      value1: "",
      //   日历
      pickerOptions: {
        onPick: dateRange => {
          if (!dateRange.maxDate) {
            return;
          }
          let min = this.Dateprase(dateRange.minDate);
          let max = this.Dateprase(dateRange.maxDate);
          this.value1 = [min,max];
          this.setDate();
        }
      },
      //   表格
      tableData: [],
      //  echarts
      option: {
        tooltip: {
          trigger: "item"
        },
        title: {
          text: "前六个月销量",
          show: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330],
            type: "line",
            areaStyle: {},
            normal: {
              show: true,
              position: "top"
            }
          }
        ]
      }
    };
  },
  methods: {
    initCharts() {
      let myChart = Echarts.init(document.getElementById("echartsBox"));
      myChart.setOption(this.option);
    },
    // handleSizeChange(size){
    //  this.pageSize =size;
    //  console.log(this.pageSize)  //
    // },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(currentPage); //点击第几页
    },
    getdata() {
      this.$axios
        .get(
          "http://easy-mock.ncgame.cc/mock/5f29fb29b7d01c445ce4a0d5/myapp/DATA"
        )
        .then(res => {
          // console.log(res.data.data);
          this.tableData = res.data.data;
        });
    },
    setDate() {
      //当时间被传入是触发的函数
      if (this.value1) {
        this.searchDate()
      }
    },
    Dateprase(date) {
      // 转换时间格式
      var str = "";
      str += date.getFullYear();
      if (date.getMonth() + 1 >= 10) {
        str += date.getMonth() + 1;
      } else {
        str += "0" + (date.getMonth() + 1);
      }
      if (date.getDate() >= 10) {
        str += date.getDate();
      } else {
        str += "0" + date.getDate();
      }
      return str;
      console.log(str);
    },
    //  转换时间格式带-的
    changeDate(date){
      let news = date.split("-")
      let str =""
      for(var i=0;i<news.length;i++){
        str += news[i]
      }
     return str
    },
    searchDate() {
      console.log(this.value1[0],this.value1[1])
      var num1 = this.value1[0]*1   //起始时间
      var num2 = this.value1[1]*1    // 终止时间
      //
    this.tableData = this.tableData.filter(item=>(this.changeDate(item.date)>num1&&this.changeDate(item.date)<num2))
    }
  },
  created() {
    
  },
  mounted() {
    this.initCharts();
    this.getdata();
    this.searchDate();
  }
};
</script>

<style lang="less" scoped>
.box {
  position: relative;
}
// 布局css
.Sta_main {
  margin-top: 60px;
  width: 100%;
  height: 100%;
  overflow: auto;
}
body > .el-container {
  margin-bottom: 40px;
}
//   分栏
.el-row {
  margin: 5px auto 0 auto;
  width: 95%;
  &:last-child {
    margin-bottom: 0;
  }
}
.bg-purple-dark {
  background: #fff;
  border-bottom: 1px solid skyblue;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
