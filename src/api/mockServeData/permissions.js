import Mock from 'mockjs'
const users=[
    {
        name:'admin',
        password:'admin'
    }
]
export default{
    
    getMenu:config=>{
        const {user,pass} = JSON.parse(config.body)
        console.log(user,pass);
          
        // users.filter((item)=>{
        //     console.log(item);
        //     if(user === 'admin' && pass === 'admin'){
        //         return {
        //             code:20000,
        //             data:{
        //                 menu:[
        //                     {path:'/',name:'home',label:'首页',icon:'s-home',url:'home/index'},
        //                     {path:'/mall',name:'mall',label:'商品管理',icon:'video-play',url:'mall/index'},
        //                     {path:'/user',name:'user',label:'用户管理',icon:'user',url:'user/index'},
        //                     {label:'其他',icon:'location',children:[
        //                         {path:'/page1',name:'page1',label:'页面1',icon:'setting',url:'other/pageOne'},
        //                         {path:'/page2',name:'page2',label:'页面2',icon:'setting',url:'other/pageTwo'},
                                
        //                     ]},
    
        //                 ],
        //                 token:Mock.Random.guid(),
        //                 message:'获取成功'
        //             },
        //         }
        //     }else if (user === item.name && pass === item.password) {
        //         console.log(1);
        //         return{
        //             code:20000,
        //             data:{
        //                 menu:[
        //                     {path:'/',name:'home',label:'首页',icon:'s-home',url:'home/index'},
        //                     {path:'/user',name:'user',label:'用户管理',icon:'user',url:'user/index'},
        //                 ],
        //                 token:Mock.Random.guid(),
        //                 message:'获取成功'
        //             },
        //         }
        //     }else{
        //         return {
        //             code:-999,
        //             data:{
        //                 message:'密码错误'
        //             }
        //         }
        //     }
        // })
        for (let i = 0; i < users.length; i++) {
            if(users[i].user === 'admin' && users[i].pass === 'admin'){
                return {
                    code:20000,
                    data:{
                        menu:[
                            {path:'/',name:'home',label:'首页',icon:'s-home',url:'home/index'},
                            {path:'/mall',name:'mall',label:'商品管理',icon:'video-play',url:'mall/index'},
                            {path:'/user',name:'user',label:'用户管理',icon:'user',url:'user/index'},
                            {label:'其他',icon:'location',children:[
                                {path:'/page1',name:'page1',label:'页面1',icon:'setting',url:'other/pageOne'},
                                {path:'/page2',name:'page2',label:'页面2',icon:'setting',url:'other/pageTwo'},
                                
                            ]},
                        ],
                        token:Mock.Random.guid(),
                        message:'获取成功'
                    },
                }
            }else if (user === users[i].name && users[i].password === pass) {
                
                return{
                    code:20000,
                    data:{
                        menu:[
                            {path:'/',name:'home',label:'首页',icon:'s-home',url:'home/index'},
                            {path:'/user',name:'user',label:'用户管理',icon:'user',url:'user/index'},
                        ],
                        token:Mock.Random.guid(),
                        message:'获取成功'
                    },
                }
            }
            
        }
        return {
            code:-999,
            data:{
                message:'密码错误'
            }
        }
         
    },
    setMenu:config=>{
        const {user,pass} = JSON.parse(config.body)
        users.push({name:user,password:pass})
        console.log(users);
        return{
            code:20000,
            data:{
                message:'注册成功'
            }
        }
    }
}