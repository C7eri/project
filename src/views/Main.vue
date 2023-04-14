<template>
    <el-container>
    <el-aside width="auto" style="overflow:hidden">
        <common-aside />
    </el-aside>
    <el-container>
        <el-header class="hed">
            <common-header />
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
  </template>
  
  <script>
  import CommonHeader from '../components/CommonHeader.vue'
  import CommonAside from '../components/CommonAside.vue'

  export default {

    name: 'HomeView',
    components: {
        CommonAside,
        CommonHeader
    },
    methods:{
        
    }
  }
  </script>
<style>
.hed.el-header{
    padding: 0;
}
</style>