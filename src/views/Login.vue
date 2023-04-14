<template>
  <div class="login-card">
    <el-card class="box-card">
        <span>后台管理系统</span>
    <div>
        <div slot="header" class="clearfix" >
            <el-tabs v-model="activeName" stretch @tab-click="handleTabsClick">
                <el-tab-pane label="登录" name="login">
                    <el-form :model="ruleform" label-width="90px" :rules="rules" ref="ruleform" status-icon >
                        <el-form-item label="用户名:"  prop="user">
                            <div class="el-inp">
                                <el-input type="text" v-model="ruleform.user" ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="密码:" prop="pass">
                            <div class="el-inp">
                                <el-input type="password" v-model="ruleform.pass" ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleform')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="enroll">
                    <el-form :model="ruleForm" label-width="90px" :rules="rules" ref="ruleForm" status-icon >
                        <el-form-item label="用户名:"  prop="user">
                            <div class="el-inp">
                                <el-input type="text" v-model="ruleForm.user" ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="密码:" prop="pass">
                            <div class="el-inp">
                                <el-input type="password" v-model="ruleForm.pass" ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkpass">
                            <div class="el-inp">
                                <el-input type="password" v-model="ruleForm.checkpass"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        
    </div>
    </el-card>
  </div>
</template>

<script>
import {getMenu,setMenu} from '../api'
export default {
    data(){
        let validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('用户名不能为空'));
            }else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
            
                callback();
            }
        };
        let validatePass2=(rule,value ,callback)=>{
            if(this.active==='enroll'){
                if(value===''){
                    callback(new Error('再次输入密码'))
                }else if(value !== this.ruleForm.pass){
                    callback(new Error('两次输入密码不一致!'))
                }else{
                    callback()
                }
            }
        }
        return{
            activeName:'login',
            ruleForm:{
                user:'',
                pass:'',
                checkpass:''
            },
            ruleform:{
                user:'',
                pass:''
            },
            active :'lgoin',
            rules:{
                pass:[
                    {validator: validatePass, trigger: 'blur'}
                ],
                user:[
                    {validator: validateUser, trigger: 'blur'}
                ],
                checkpass:[
                    {validator: validatePass2,trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){  
                    if(this.active ==='enroll'){
                        //注册点击
                        setMenu(this.ruleForm).then(({data})=>{
                            if(data.code!== -999){
                                this.$message({
                                    showClose: true,
                                    message: data.data.message,
                                    type: 'success'
                                });
                            }
                        })
                        // localStorage.setItem('users',JSON.stringify({user:this.ruleForm.user,pass:this.ruleForm.pass}))
                        // this.ruleForm.user=''
                        // this.ruleForm.pass=''
                        // this.ruleForm.checkpass=''
                        // // this.active = 'login'
                        // this.$message({
                        // showClose: true,
                        // message: '注册成功',
                        // type: 'success'
                        // });
                    }else{
                        getMenu(this.ruleform).then(({data})=>{
                            console.log(data);
                            localStorage.setItem('token',JSON.stringify({id:data.data.token,name:this.ruleform.user}))
                            if(data.code!== -999){
                                this.$message({
                                    showClose: true,
                                    message: data.data.message,
                                    type: 'success'
                                });
                                this.$router.push('/home')
                            }else{
                                this.$message.error('登录失败,请检查用户名和密码!');
                            }
                        })
                    }
                }else{
                    return
                }
            })
        },
        handleTabsClick(tab){
            this.active = tab.name
            console.log(this.active);

            this.ruleForm.user=''
            this.ruleForm.pass=''
            this.ruleForm.checkpass=''
        },
           
    }
}
</script>

<style lang="less">
.login-card{
    margin:200px auto;
    width: 500px;
    .el-inp{
        width: 300px;
    }
}
.el-card__body{
    text-align: center;
}
</style>