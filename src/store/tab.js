import Cookie from "js-cookie";
//import router from '../router'
export default{
    state:{
        isCollapse:false,//控制菜单展开和收起
        tabList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
        menu:[]

    },
    mutations:{
        //修改菜单收起的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse;
        },
        //更新面包屑
        selectMenu(state,val){
            console.log('val',val)
            //判断添加数据是否为首页
            if(val.name !== 'home'){
                const index = state.tabList.findIndex(item => item.name === val.name )
                //如果不存在
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state,item){
            console.log(item,'item');
            const index = state.tabList.findIndex(val => val.name === item.name);
            state.tabList.splice(index,1)
        },
        //设置menu数据
        setMenu(state,val){
            state.menu = val;
            Cookie.set('menu',JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state,router){
            //判断缓存中是否有数据
            if(!Cookie.get('menu'))return;
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu;
            //组装动态路由的数据
            const menuArray = [];
            menu.forEach(item => {
                //有子菜单
                if(item.children){
                    item.children = item.children.map(item =>{
                        //路由懒加载
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    
                    menuArray.push(...item.children)
                }else{
                    //路由懒加载
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log('menuArray',menuArray)

            //路由的动态添加
            menuArray.forEach(item =>{
                router.addRoute('Main',item)
            })
        }

    }
}