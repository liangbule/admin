<!-- 页面 -->
<template>
  <div id="main_body">
    <!-- 内容 -->
    <div id="main_body_con">
      <!-- 上面的3组DIV -->
      <div id="main_body_con_header">
        <!-- 左上第一个DIV -->
        <div id="today_data_list">
          <div id="title">
            <span class="vertical"></span>
            <h4>今日数据统计</h4>
          </div>

          <div id="list">
            <div id="list_first">
              <i :class="arrow[0]"></i>
            </div>
            <div id="list_data">
              <p>今日订单数量</p>
              <h5>{{todayData.todayOrder}}单</h5>
            </div>
            <div id="list_data">
              <p>昨日订单数量</p>
              <h5>{{yesterdayData.yesterdayOrder}}单</h5>
            </div>
          </div>
          <div id="list">
            <div id="list_first">
              <i :class="arrow[1]"></i>
            </div>
            <div id="list_data">
              <p>今日订单总金额</p>
              <h5>{{todayData.todayPrice}}元</h5>
            </div>
            <div id="list_data">
              <p>昨日订单总金额</p>
              <h5>{{yesterdayData.yesterdayPrice}}元</h5>
            </div>
          </div>
          <div id="list">
            <div id="list_first">
              <i :class="arrow[2]"></i>
            </div>
            <div id="list_data">
              <p>今日下单商户数</p>
              <h5>{{todayData.todayMerchant}}位</h5>
            </div>
            <div id="list_data">
              <p>昨日下单商户数</p>
              <h5>{{yesterdayData.yesterdayMerchant}}位</h5>
            </div>
          </div>
          <div id="list">
            <div id="list_first">
              <i :class="arrow[3]"></i>
            </div>
            <div id="list_data">
              <p>今日平台总商户数</p>
              <h5>{{todayData.todayPos}}位</h5>
            </div>
            <div id="list_data">
              <p>昨日平台总商户数</p>
              <h5>{{yesterdayData.yesterdayPos}}位</h5>
            </div>
          </div>
        </div>

        <!-- 上方第二个DIV -->
        <div id="city_echarts">
          <div id="title">
            <span class="vertical"></span>
            <h4>全国开通城市分布图</h4>
          </div>
          <div style="width: 100%;
            height: 325px;">
            <echartsMap></echartsMap>
          </div>
        </div>

        <!-- 第三个DIV -->
        <div id="data_time">
          <div id="title">
            <span class="vertical"></span>
            <h4>今日数据统计</h4>
          </div>
          <div class="data_time_list" v-for="(item,index) in today24HoursOrder" :key="index">
            <p>{{item.time}}</p>
            <div class="percentage">
              <div :style="{width:progress[index]+'%'}"></div>
            </div>
            <span>{{item.quantity}}单</span>
            <!-- 循环12次 用计算属性算出 item里面的最大的数 然后用其他除以他 生成百分比条 -->
          </div>
        </div>
      </div>

      <!-- 下半部分的两张统计表 -->
      <div id="main_body_con_foot">
        <!-- 左边的表 -->
        <div>
          <div id="title">
            <span class="vertical"></span>
            <h4>订单总量统计</h4>
          </div>

          <div id="left_echarts_con">
            <div id="left_echarts" style=" width: 100%; height: 325px;"></div>
          </div>
        </div>

        <!-- 右边的表 -->
        <div>
          <div id="title">
            <span class="vertical"></span>
            <h4>交易金额总量统计</h4>
          </div>

          <div id="right_echarts_con">
            <div id="right_echarts" style=" width: 100%; height: 325px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import echarts from "echarts";
import echartsMap from "../../components/echartsMap";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { echartsMap },
  data() {
    //这里存放数据
    //今日数据统计需要的数据，其实应该放在VUEX的
    return {
      todayData: {},
      yesterdayData: {},
      today24HoursOrder: [],
      weekOrder: [],
      weekPrice: [],
      arrow: [],
      max: 0,
      proportion: [],
      progress: [],
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
  mounted() {
    this.$axios
      .post(
        "http://easy-mock.ncgame.cc/mock/5f29fb29b7d01c445ce4a0d5/myapp/EchartsData",
        {}
      )
      .then((res) => {
        this.todayData = res.data.data.todayData;
        this.yesterdayData = res.data.data.yesterdayData;
        this.today24HoursOrder = res.data.data.today24HoursOrder;
        // this.weekOrder=res.data.data.weekOrder
        // this.weekPrice=res.data.data.weekPrice
        this.arrow = res.data.data.arrow;

        for (let i in res.data.data.weekOrder) {
          this.weekOrder.push(res.data.data.weekOrder[i]);
        }

        for (let i in res.data.data.weekPrice) {
          this.weekPrice.push(res.data.data.weekPrice[i]);
        }
      })
      .then(() => {
        for (let i = 0; i < this.today24HoursOrder.length; i++) {
          this.proportion.push(this.today24HoursOrder[i].quantity);
          if (this.today24HoursOrder[i].quantity >= this.max) {
            this.max = this.today24HoursOrder[i].quantity;
          }
        }
      })
      .then(() => {
        this.progress = this.proportion.map((value) => {
          return Math.ceil((value / this.max) * 100);
        });
      })
      .then(() => {
        //第一张表格的echarts代码
        let myChart = echarts.init(document.getElementById("left_echarts"));
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {},
          },
          xAxis: {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            axisLabel: {
              formatter: function (value, index) {
                return value + "单";
              },
            },
            type: "value",
          },
          series: [
            {
              data: this.weekOrder,
              type: "line",
            },
          ],
        };
        //生成第一张表格
        myChart.setOption(option);

        // 第二张折线图
        var myChartRight = echarts.init(
          document.getElementById("right_echarts")
        );
        var optionRight = {
          tooltip: {
            trigger: "axis",
          },

          xAxis: {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            axisLabel: {
              formatter: function (value, index) {
                if (value >= 10000) {
                  return value / 10000 + "万元";
                } else {
                  return value;
                }
              },
            },
            type: "value",
          },
          series: [
            {
              data: this.weekPrice,
              type: "line",
            },
          ],
        };
        //生成第二张表格
        myChartRight.setOption(optionRight);
      });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
div#main_body {
    #title{
        height:30px;
        margin-bottom:20px
    }
    h5,h4 {
        margin: 0;
        display: inline-block;
    }
    p{
        margin: 0;
        font-size: 12px;
        line-height: 30px;
        color: #a5b6c8;
    }
    span.vertical{
            vertical-align: middle;
            display: inline-block;
            
            width: 4px;
            height: 20px;
            background-color: rgb(251, 184, 11);
            margin-right: 10px;
    }
    position: relative;
    ;
  
  

  div#main_body_con {
       position: relative;
       
    div#main_body_con_header {
      display: flex;
      height: 415px;
      padding: 0.5%;
      div#today_data_list {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        margin-right: 0.5%;

        #list {
          display: flex;
          height: 80px;
          overflow: hidden;
          border-bottom: 1px solid #f1f1f1;
          text-align: center;
          #list_first {
            flex: 1;
            line-height: 50px;
            color: #ff8448;
            font-size: 20px;
          }
          #list_data {
            flex: 3;
          }
        }
      }
      div#city_echarts {
        flex: 3;
        box-sizing: border-box;
        height: 415px;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        margin-right: 0.5%;
      }

      div#data_time {
        flex: 1;
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;

        .data_time_list {
          height: 26px;
          font-size: 16px;
          overflow: hidden;
          > p {
            font-size: 14px;
            display: block;
            color: #a5b6c8;
            // white-space:pre-wrap;
            float: left;
          }
          .percentage {
            height: 12px;
            border-radius: 6px;
            background-color: #f1f1f1;
            float: left;
            width: 80px;
            margin: 0 10px;
            margin-top: 7px !important;
            > div {
              height: 12px;
              border-radius: 6px;
              background-color: #ff8448;
              background: left, #febfa0, #ff8448;
              width: 85%;
            }
          }
          > span {
            font-size: 14px;
          }
        }
      }
    }

    div#main_body_con_foot {
      height: 415px;
      display: flex;
      padding: 0.5%;
      margin-bottom: 50px;

      > div {
        flex: 1;
        box-sizing: border-box;
        margin-right: 0.5%;
        margin-left: 0.5%;
        background-color: #fff;
        border-radius: 5px;
        padding: 20px;
      }
    }
  }

  
  
}
</style>