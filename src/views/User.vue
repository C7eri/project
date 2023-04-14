<template>
    <div class="wrap">
        <!-- 弹窗部分 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
            <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="150px">
                <el-form-item label="姓名:" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="年龄:" prop="age">
                    <el-input v-model.number="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label="1" ref="radio1">男</el-radio>
                        <el-radio :label="0" ref="radio">女</el-radio>
                    </el-radio-group>
                </el-form-item >
                <el-form-item label="出生日期" label-width="245px" prop="birth" >
                    <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format='yyyy-MM-DD'  style="width: 250px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr" style="width: 650px;" placeholder="请输入详细地址"></el-input>
                </el-form-item>
            </el-form>


            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleQuest">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 页面 -->
        <div class="seach">
            <el-button type="primary" @click="submit">+ 新增</el-button>
            <el-form :model="userForm" label-width="150px">
                <el-form-item class="seachitem">
                    <el-input v-model="userForm.name" placeholder="请输入查询内容" style="width: 250px;"></el-input>
                    <el-button type="primary" @click="seachSub" >搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableList">
            <el-table
            :data="tableData"
            stripe
            height="100%"
            style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="150px">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    width="100px">
                </el-table-column>
                <el-table-column
                    label="性别"
                    width="180px">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sex? '男':'女' }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="日期"
                    width="200px"
                    >
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit( scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageData.page"
                :page-sizes="[10,20,50,100,200]"
                :page-size="pageData.limit"
                layout="total, sizes, prev, pager, next"
                :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getUserData,getUser,addUser,editUser,delUser } from '../api/index';
export default{
    data() {
      return {
        dialogVisible: false,
        form:{
            name:'',
            age:'',
            sex:'',
            birth:'',
            addr:''
        },
        rules:{
            name:[
                {required:true,message:'请输入姓名',tigger:'blur'},
                {min:2,max:4,message:'长度在2到4个字符',tigger:'blur'}
            ],
            age:[
                {type:'number', required:true,message:'请输入年龄',tigger:'blur'},
                {type:'number',min:1,max:150,message:'请输入实际年龄',tigger:'blur'}
            ],
            sex:[
                {type:'number',required:true,message:'请选择性别',tigger:'change'}
            ],
            birth:[
                {type:'string',required:true,message:'请选择生日',tigger:'change'}
            ],
            addr:[
                {required:true,message:'请输入地址',tigger:'blur'}
            ]
        },
        tableData:[],
        handleType:true,
        total:0,
        pageData:{
            page:1,
            limit:10
        },
        userForm:{
            name:''
        }
      };
    },
    methods: {
        handleQuest(){
            this.$refs.form.validate( (valid)=>{
                // console.log(valid);
                if(valid){
                    if(this.handleType === true){
                        // ture是新增的提交
                        addUser(this.form).then(()=>{
                            this.getList()
                        })
                    }else{
                        // 编辑的确定
                        editUser(this.form).then(()=>{
                            this.getList()
                        })
                    }
                    this.$refs.form.resetFields()
                    this.dialogVisible=false

                }
                
            })
        },
        submit(){
            this.dialogVisible = true
            this.handleType =true

        },
        handleClose(row){
            this.$refs.form.resetFields()
            this.dialogVisible=false
        },
        handleEdit(row){
            this.dialogVisible=true
            this.handleType =false
            this.form = JSON.parse(JSON.stringify(row))
            
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    delUser({id:row.id}).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList()
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getList(){
            getUser({params:{...this.pageData,...this.userForm}}).then(({data})=>{
                console.log(data);
                this.tableData=data.list
                this.total = data.count ? data.count : 0
                
            })
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pageData.limit = val
            this.getList()

        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pageData.page = val
            this.getList()
        },
        seachSub(){
            this.getList()
        }
    },
    mounted() {
        getUserData().then(({data})=>{
            // console.log(req.data);
        }),
        this.getList()
    },
}
</script>
<style lang="less">
.wrap{
    position: relative;
    height: 80%;
    .tableList{
    margin-top: 20px;
    height: 100%;
    }
    .block{
        position: absolute;
        right: 0;
    }
    .seach{
        
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        .seachitem{
            margin: 0;
        }
    }
}
</style>