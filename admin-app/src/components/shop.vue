<style lang="less" scoped>
.Users {
  .el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
  }
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  }
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
  .el-pagination {
    margin-top: 15px;
  }
}
</style>
<template>
  <div class="Users">
    <!-- 面包屑导航 -->
    <!-- 卡片试图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容"
                    clearable
                   >
            <el-button slot="append"
                       icon="el-icon-search"
                     ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                    @click="dialogFormVisible = true">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表区域 -->
      <el-table :data="goodlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                border
                stripe
                 style="width: 100%"
                 :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column label="商品名称"
                         prop="name"></el-table-column>
        <el-table-column label="商品分类"
                         prop="sort"></el-table-column>
        <el-table-column label="供货商"
                         prop="company"></el-table-column>
        <el-table-column label="商品价格"
                         prop="price"></el-table-column>
        <el-table-column label="出厂日期" prop="Time">
        </el-table-column>
        <el-table-column label="操作"
                         width="180">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="write(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
 <el-pagination class="fy"
                     layout="prev, pager, next"
                     @current-change="current_change"
                     :total="total"
                     background
                    >
                  </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加商品"
               :visible.sync="dialogFormVisible"
               width="50%"
              >
      <el-form ref="addFormRef"
               :model="addForm"
               label-width="70px">
        <el-form-item label="名称"
                      prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类"
                      prop="sort">
          <el-input v-model="addForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="供货商"
                      prop="company">
          <el-input v-model="addForm.company"></el-input>
        </el-form-item>
        <el-form-item label="价格"
                      prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="日期"
                      prop="price">
          <el-input v-model="addForm.Time"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
           @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改商品"
               :visible.sync="OJBK"
               width="50%"
              >
      <el-form ref="writFormRef"
               :model="writForm"
               label-width="70px">
        <el-form-item label="名称"
                      prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类"
                      prop="sort">
          <el-input v-model="editForm.sort"></el-input>
        </el-form-item>
        <el-form-item label="供货商"
                      prop="company">
          <el-input v-model="editForm.company"></el-input>
        </el-form-item>
        <el-form-item label="价格"
                      prop="price">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="日期"
                      prop="price">
          <el-input v-model="editForm.Time"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="OJBK = false">取 消</el-button>
        <el-button type="primary"
           @click="ojbk()">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>
 
<script>
export default {
  data () {
   
    return {
      total:1000,//默认数据总数
            pagesize:6,//每页的数据条数
            currentPage:1,//默认开始页面
        //
     // Length:0,
       id:'',
      // 控制用户对话框的显示和隐藏
      Junk :{
       
        },
      dialogFormVisible: false,
      OJBK:false,
      writForm: {
        name: '',
        sort: '',
        company: '',
        price: '',
        Time:''
      },
       editForm: {},
      // 添加用户的表单数据
      addForm: {
        name: '',
        sort: '',
        company: '',
        price: '',
        Time:'',
        id:this.Length+1
      },
      goodlist:[]
        
      ,
      //editDialogVisible: false,
    }
  },
  watch: {},
  computed: {},
  methods: {
    //  getData() {
    //   var url = 'public\json\db.json';
    //   this.$http.get(url).then((data) => {
    //     console.log(data)
    //     this.goodlist = data.goods;
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
//渲染
       get_goods(){

                    this.$axios.get("http://localhost:3004/goods")
                        .then(response=>{
                           //console.log(response);
                            this.goodlist=response.data;
                           this.Length=this.goodlist.length
                            //console.log(this.goodlist)
 
                        }).catch(error=>{
                           //console.log(error.response)
                    });
                },
                //增加
      add(){
        
              // console.log(this.addForm);
        this.$axios.post("http://localhost:3004/goods",{name:this.addForm.name,sort:this.addForm.sort,
        company:this.addForm.company,price:this.addForm.price,Time:this.addForm.Time})
                    .then(response=>{
                      //  this.addForm.push.this.goods
                         this.get_goods()
                    }).catch(error=>{

                    })
                    this.dialogFormVisible = false;
                         
      },
      //删除
      del(id,rows){
        
       // var l = i.length+1
        console.log(id);
        //回收站
          //  this.axios.get(`http://localhost:3000/goods/${id}`)
          //  .then(req=>{
          //   // console.log(req.data);
          //    this.Junk = req.data
          //    //console.log(this.Junk);
          //  })
          //  this.axios.post("http://localhost:3000/junk",this.Junk)
          //           .then(response=>{
                        
                        
          //           }).catch(error=>{

          //           })
                   // 删除
           this.$axios.delete(`http://localhost:3004/goods/${id}`)
           .then(res => {
            this.get_goods()
          })
      },
      write(id,rows){
             console.log(id);
              let _this = this;
             _this.id = id;
              this.$axios.get(`http://localhost:3004/goods/${id}`)
              .then(res => {
                console.log(res.data);
                  _this.editForm = res.data
                  })
             // console.log(editForm)
            console.log(this.editForm);
               this.OJBK = true
      },
      ojbk(){
        console.log(this.id)
           this.$axios.put(`http://localhost:3004/goods/${this.id}`,this.editForm)
                    .then(response=>{
                      //  this.addForm.push.this.goods
                        
                    }).catch(error=>{

                    })
                    this.OJBK = false;
                    this.get_goods()
      },
       tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'th';
        }
        return '';
      },
      switchChange(){
          //this.istag = !this.istag ;
          
      },
      created:function(){
           this.total=this.goodlist.length;
  },
     current_change:function(currentPage){
       this.currentPage = currentPage
     }
      
  },
  
  mounted () { 
     this.get_goods()
  }
}
</script>