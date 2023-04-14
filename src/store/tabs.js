export default {
    state: {
        isCollapse:false,
        tabsList:[
            //面包屑数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }

        ],
        token:'',
        name:''
    },
    mutations: {
        changeCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        addTabsList(state,item1){
            
            const index = state.tabsList.findIndex(item => item.name === item1.name)
            if(index === -1){
                state.tabsList.push(item1)
            }
        },
        changetoken(state,item){
            state.token = item
        },
        changename(state,item){
            state.name = item
        }
    }
}