<template>
  <el-row>
    <el-col :span="8"
      ><div class="user-div">
        <el-card class="box-card">
          <div class="user">
            <div class="img2"></div>
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间: <span>2023-4-10</span></p>
            <p>上次登录地点: <span>石家庄市</span></p>
          </div>
        </el-card>
      </div>
      <el-card class="box-card">
          <div class="tabel-buy">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                v-for="(val, item) in tableLabel"
                :key="item"
                :prop="item"
                :label="val"
              />
            </el-table>
          </div>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left:20px">
      <div class="num">
        <el-card v-for="item in countData" :body-style="{ display:'flex'}" :key="item.name">
          <i class="icon" :style="{backgroundColor:item.color}" :class="'el-icon-' + item.icon"></i>
          <div class="datall">
            <p class="price">${{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <div class="chart">
        <el-card>
          <div class="line-chart" ref="echarts1"></div>
        </el-card>
        <el-card>
          <div class="dada-chart" ref="echarts2"></div>
        </el-card>
        <el-card>
          <div class="data-chart" ref="echarts3"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
  
</template>

<script>
import * as echarts from 'echarts'
import {getData} from '../api/index'
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日销售",
        monthBuy: "本月销售",
        totalBuy: "累积销售",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        { name: "今日收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        { name: "本月收藏订单", value: 210, icon: "star-on", color: "#ffb980" },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      days:['2019-10-01','2019-10-02','2019-10-03','2019-10-04','2019-10-05','2019-10-06','2019-10-07',]
    };
  },
  mounted(){
    getData().then(async (req)=>{
      const {data :res} = await req
      // console.log(res.data);
      this.tableData = res.data.tableData
      //图标数据
      const echarts1= echarts.init(this.$refs.echarts1)
      //指定图标的配置项和数据
      let echarts1Options ={}
      //处理数据xAxis
      const {orderData,usersData,videData} = res.data
      const xAxis = Object.keys(orderData.data[0])
      echarts1Options.xAxis={
        data:this.days
      }
      echarts1Options.tooltip={}
      echarts1Options.yAxis={}
      echarts1Options.legend ={
        data:xAxis
      }
      echarts1Options.series= xAxis.map(key=>{
        return echarts1Options.series={
          name:key,
          type:'line',
          data:orderData.data.map(item=>item[key])
        }
      })
      echarts1.setOption(echarts1Options)
      const echarts2 =echarts.init(this.$refs.echarts2)
      const echarts2Options ={
        legend:{
            textStyle:{
                color:'#333'
            }
        },
        grid:{
            left:'20%'
        },
        tooltip:{
            trigger:'axis'
        },
        xAxis:{
            type:'category',
            data:usersData.map(item=> item.data),
            axisLine:{
                lineStyle:{
                    color:'#17b3a3'
                }
            }
        },
        axisLabel:{
            interval:0,
            color:'#333'
        },
        yAxis:{
            type:'value',
            axisLine:{
                lineStyle:{
                    color:'#17b3a3'
                }
            }
        },
        color:['#2ec7c9','#b6a2de'],
        series:[
          {
            name:'新增用户',
            data:usersData.map(item=>item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:usersData.map(item =>item.active),
            type:'bar'
          },
        ]
      }
      echarts2.setOption(echarts2Options)

      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Options={
        tooltip:{
          trigger:'item'
        },
        color:['#0f78f4','#dd536b','#9462e5','#a6a6a6','#e1b22','#39c362','#3ed1cf'],
        series:[
          {data:videData,type:'pie'}
        ]
      }
        echarts3.setOption(echarts3Options)
    })
    
  }
};
</script>
<style lang="less" scoped>
.chart{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-card{
    margin-bottom: 20px;
    .line-chart{
    height: 200px;
    width: 960px;
    
    
  }
  .data-chart{
    width: 420px;
    height: 200px;
  }
  .dada-chart{
    width: 420px;
    height: 200px;
  }
  }
}
.user-div{
  margin-bottom: 20px;
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 40px;
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
    .img2 {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: pink;
      margin-right: 40px;
    }
  }
}
.tabel-buy {
  margin-bottom: 180px;
}


.login-info {
  p {
    margin-bottom: 20px;
    span {
      margin-left: 40px;
    }
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .datall{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price{
      font-size: 30px;
      margin-bottom:10px;
      height: 30px;
      line-height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999999;
    }
  }
  .el-card{
    margin-bottom: 20px;
    width: 32%;
  }
}
</style>