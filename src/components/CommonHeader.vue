<template>
    <div class="header-container">
        <div class="l-content">
            <el-button size="mini" @click="changeCollpse" icon="el-icon-menu"></el-button>
            <div class="bread">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="item in $store.state.tabs.tabsList" :key="item.name" :to="{ path: '/' +item.name}">{{item.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎<span>{{ $store.state.tabs.name }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >设置</el-dropdown-item>
                    <el-dropdown-item command="out">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="less">
.l-content{
    .bread{
        .el-breadcrumb__item:last-child .el-breadcrumb__inner{
            color:#fff;
        }
        .el-breadcrumb__inner.is-link{
            color: #606266;
        }
    }
}
.header-container{
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
}
.bread{
    margin-left: 20px;
    display: inline-block;
    vertical-align: middle;
    
}
</style>

<script>
export default{
    data() {
        return {
            username:''
        }
    },
    mounted(){

        let token =JSON.parse(localStorage.getItem('token'))
        this.$store.commit('changetoken',token.id)
        this.$store.commit('changename',token.name)
    },
    methods:{
        handleCommand(command){
            if(command==='out'){
                this.$message({
                        showClose: true,
                        message: '已退出',
                        type: 'success'
                        });
                localStorage.removeItem('token')
                this.$router.push('/login')
            }
        },
        changeCollpse(){
            this.$store.commit('changeCollapse')
        },
        
    }
}
</script>