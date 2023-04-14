<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="$store.state.tabs.isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <h3>{{ $store.state.tabs.isCollapse ? '后台':'通用后台管理系统'}}</h3>
      <el-menu-item @click="menuClick(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title" >{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group  v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item @click="menuClick(subItem)" :index="subItem.name">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isCollapse: false,
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            { path: "/page1", name: "page1", label: "页面1", icon: "setting", url: "Other/PageOne" },
            { path: "/page2", name: "page2", label: "页面2", icon: "setting", url: "Other/PageTwo" },
          ],
        }
      ],
    };
  },
  methods: {
    menuClick(item){
        const thispath= this.$route.path
        if(item.path!== thispath && !(thispath === '/home'&&(item.path === '/'))){
            this.$router.push(item.path) 
        }
        this.$store.commit('addTabsList',item)
    },
    a(){
      console.log(this.$store.state.tabs.isCollapse);
    }
  },
  computed:{
    noChildren(){
        return this.menuData.filter((item)=>!item.children)
    },
    hasChildren(){
        return this.menuData.filter(item => item.children)
    }
  }
};
</script>
<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    position: fixed;
    height: 100vh;
    h3{
        
        line-height: 48px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
    }
}
.el-submenu{
        overflow: hidden;
}
.el-menu-vertical-demo.el-menu{
  border-right: none;
}
</style>