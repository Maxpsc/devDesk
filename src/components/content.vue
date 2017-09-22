<template lang="html">
    <div id="main">
        <div class="header">
            <span class="tab" :class="{active: tabIndex===0}" @click="handleTab(0)">TodoList</span>
            <span class="tab" :class="{active: tabIndex===1}" @click="handleTab(1)">Favorite</span>
            <span class="tab" :class="{active: tabIndex===2}" @click="handleTab(2)">CDN</span>
            <span class="tab" :class="{active: tabIndex===3}" @click="handleTab(3)">Search</span>
        </div>
        <div class="container">
            <transition-group name="fade" mode="out-in">
                <todolist key="0" v-show="tabIndex===0"></todolist>
                <favorite key="1" v-show="tabIndex===1"></favorite>
                <cdnlist key="2" v-show="tabIndex===2"></cdnlist>
                <search key="3" v-show="tabIndex===3"></search>
            </transition-group>
        </div>
    </div>
</template>

<script>
import todolist from './todoList';
import favorite from './favorite';
import cdnlist from './cdnList';
import search from './search';

//中央导航组件，负责路由子组件
export default {
    name: 'main',
    data() {
        return {
            tabIndex: 0
        }
    },
    components:{
        todolist,
        favorite,
        cdnlist,
        search
    },
    methods: {
        handleTab(index){
            this.tabIndex = index;
        }
    }

}
</script>

<style lang="scss">
#main{
    box-sizing: border-box;
    width:85%;
    max-width: 900px;
    height:60%;
    background-color: rgba(210, 210, 210, 0.4);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    .header{
        display: flex;
        height:50px;
        margin-top: -50px;
        .tab{
            flex:1;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            background-color: rgba(255,255,255,0.8);
            cursor:pointer;
            transition:all .2s;
            &:first-child{
                border-top-left-radius:20px;
            }
            &:last-child{
                border-top-right-radius:20px;
            }
            &.active,&:hover{
                background-color: rgba(210, 210, 210, 0.4);
                color:#FFF;
            }
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.container{
    position:relative;
    height:100%;
}
//for each child-component
.panel{
    position:absolute;
    left:0;
    right:0;
    box-sizing: border-box;
    // padding:10px;
    height:100%;
    overflow: hidden;
    background-color: rgba(255,255,255,0.6);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
</style>
