<template>
    <div class="tabs">
        <el-tag
            v-for="(item, index) in tags"
            :key="item.path"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            size="smal"
            >
            {{ item.label }}
  </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
    export default {
        name:'CommonTag',
        computed:{
            ...mapState({
                tags: state => state.tab.tabList
            }),
            
        },
        methods:{
            ...mapMutations(['closeTag']),
            changeMenu(item){
                this.$router.push(item.path)
            },
            //tag删除
            handleClose(item,index){
                //调用store中的mutation
                this.closeTag(item)
                const length =this.tags.length 
                //删除之后的跳转逻辑
                if(item.name !== this.$route.name){
                    return;
                }
                if(index === length){
                    this.$router.push({
                        name:this.tags[index - 1].name
                    })
                }else{
                    this.$router.push({
                        name:this.tags[index].name
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>