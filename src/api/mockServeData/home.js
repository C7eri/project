import Mock from 'mockjs'
let List =[]
export default{
    getStatisticalData:()=>{
        for (let i =0;i<7;i++){
            List.push(
                Mock.mock({
                    苹果:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    oppo:Mock.Random.float(100,8000,0,0),
                    魅族:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),

                })
            )
        }
        return{
            code:20000,
            data:{
                videData:[
                    {name:'小米',value:2999},
                    {name:'苹果',value:2999},
                    {name:'vivo',value:2999},
                    {name:'oppo',value:2999},
                    {name:'魅族',value:2999},
                    {name:'三星',value:2999},

                ],
                usersData:[
                    {data:'周一',new:5,active:200},
                    {data:'周二',new:10,active:500},
                    {data:'周三',new:12,active:550},
                    {data:'周四',new:60,active:800},
                    {data:'周五',new:65,active:550},
                    {data:'周六',new:53,active:770},
                    {data:'周日',new:33,active:170},
                ],
                orderData:{
                    date:['2019-10-01','2019-10-02','2019-10-03','2019-10-04','2019-10-05','2019-10-06','2019-10-07'],
                    data:List
                },
                tableData: [
                    { name: "oppo", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: "vivo", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: "苹果", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: "小米", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: "三星", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                    { name: "魅族", todayBuy: 100, monthBuy: 300, totalBuy: 800 },
                ],
                

            }

        }
    }
}