<template>
  <div id="list">
    
    <!-- 搜索框开始 -->
    <div class="list-search">
      <section class="search-input">
        <el-input v-model="input" placeholder="请输入代理商名称" style="width:100%;height:100%;"></el-input>
      </section>
      <section class="search-btn" @click="checkoutInput">检索</section>
    </div>
    <!-- 搜索框结束 -->
    <!-- table的开始 -->
    <el-table :data="tableData" border>
      <el-table-column fixed prop="agent" label="代理商名称" width="100"></el-table-column>
      <el-table-column prop="code" label="代理商编码" width="200"></el-table-column>
      <el-table-column prop="region" label="所属区域" width="120"></el-table-column>
      <el-table-column prop="leader" label="负责人" width="75"></el-table-column>
      <el-table-column prop="login" label="登录名" width="75"></el-table-column>
      <el-table-column prop="contact" label="联系方式" width="114"></el-table-column>
      <el-table-column prop="fax" label="传真" width="96"></el-table-column>
      <el-table-column prop="mail" label="邮箱" width="161"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            class="check"
            @click.capture="handleClick(scope.row)"
            type="text"
            size="middle"
          >查看</el-button>
          <el-button
            class="editor"
            type="text"
            size="middle"
            @click="dialogFormVisible = true"
            @click.capture="handleClickEdit(scope.row)"
          >编辑</el-button>
          <!-- table的结束 -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框的开始 -->
    <!-- !!!!!!!!!!!!!!!!!!!!!  不能放在el-table里面  !!!!!!!!!!!!!!!!!!!!! 吐出一口陈年老血 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="rowObj">
        <el-form-item label="代理商名称" :label-width="formLabelWidth">
          <el-input v-model="rowObj.agent" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理商编码" :label-width="formLabelWidth">
          <el-input v-model="rowObj.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属区域" :label-width="formLabelWidth">
          <el-input v-model="rowObj.region" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="rowObj.leader" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input v-model="rowObj.login" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="rowObj.contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="传真" :label-width="formLabelWidth">
          <el-input v-model="rowObj.fax" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="rowObj.mail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话框的结束 -->
  </div>
</template>

<script>
export default {
    data() {
      return {
        input: "",
        tableData: [],
        tableDataTrans:[],
        rowObj: {},
        dialogFormVisible: false,
        formLabelWidth: "90px"
      };
    },
  methods: {

    // 获取渲染页面的数据
    async getTableData() {
      const tabledres = await this.$axios.get(
        "http://easy-mock.ncgame.cc/mock/5f29fb29b7d01c445ce4a0d5/myapp/merchant"
      );
      this.tableData = tabledres.data;
      var newdata = localStorage.getItem('newdata');
      // console.log(newdata)
      if(newdata){
        var newdataArr = JSON.parse(newdata);
        newdataArr = newdataArr.map(function(item,index,array){
           item.region = item.region.join('')
           return item
        })
        this.tableData=[...this.tableData,...newdataArr]
        // console.log(this.tableData)
        this.tableDataTrans = this.tableData;
      }

    },
    // 点击搜索框逻辑
    checkoutInput() {
      console.log(this.tableDataTrans);
      if (this.input) {
        const filterdata = this.tableDataTrans.filter((item) => {
          return item.agent.indexOf(this.input) != -1;
        });

        this.tableData = filterdata;
      }else{
        this.tableData = this.tableDataTrans;
      }
    },
    // 点击编辑的时候存数据
    handleClickEdit(row) {
      // 把当前行的数据存到this.rowObj上
      this.rowObj = row;
    },
    // 弹出框逻辑
    handleClick(row) {
      this.rowObj = row;
      const h = this.$createElement;
      // 生成查看弹出款
      this.$msgbox({
        message: h("div", { style: "height:400px;" }, [
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `代理商名称: ${this.rowObj.agent}`
          ),
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `代理商编码: ${this.rowObj.code}`
          ),
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `所属区域: ${this.rowObj.region}`
          ),
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `负责人: ${this.rowObj.leader}`
          ),
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `登录名: ${this.rowObj.login}`
          ),
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `联系方式: ${this.rowObj.contact}`
          ),
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `传真: ${this.rowObj.fax}`
          ),
          h(
            "div",
            {
              style:
                "color: teal;font-size:20px;font-weight:600;margin:20px 0 0 30px;",
            },
            `邮箱: ${this.rowObj.mail}`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            done();
          } else {
            done();
          }
        },
      });
    }
  },
  mounted() {
    this.getTableData();
  }
}

</script>

<style lang="less" scoped>
.el-main {
  text-align: left;
}
.list-search {
  display: flex;
  padding: 10px 0 15px 0;
  .search-input {
    width: 190px;
    height: 38px;
    border: 1px solid #909399;
    border-radius: 2px;
    margin-left: 10px;
    box-sizing: border-box;
    input {
      border: none;
      padding-left: 10px;
      width: 100%;
      height: 100%;
    }
  }
  .search-btn {
    width: 64px;
    height: 38px;
    background: #009688;
    color: #fff;
    line-height: 38px;
    text-align: center;
    margin-left: 20px;
  }
  button .el-button .el-button--text .el-button--small {
    width: 100px;
    height: 50px;
    background-color: #009688 !important;
  }
}
</style>
