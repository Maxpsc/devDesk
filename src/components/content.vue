<template lang="html">
    <transition name="fade-content">
    <div id="main" v-show="showContent">
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
</transition>
</template>

<script>
import todolist from './todolist';
import favorite from './favorite';
import cdnlist from './cdnlist';
import search from './search';
import { mapState } from 'Vuex';
//中央导航组件，负责路由子组件
export default {
    name: 'main',
    data() {
        return {
            tabIndex: 0
        }
    },
    computed: {
        ...mapState(['showContent'])
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
    height:56%;
    margin-top: 40px;
    background: -webkit-radial-gradient(50% 10%, farthest-corner, rgba(0,0,0,.5),rgba(0,0,0,.25), transparent);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    .header{
        display: flex;
        height:50px;
        margin-top: -50px;
        -webkit-user-select:none;
        .tab{
            flex:1;
            line-height: 50px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            background-color: rgba(0,0,0,.8);
            color:#FFF;
            cursor:pointer;
            transition:all .2s;
            &:first-child{
                border-top-left-radius:20px;
            }
            &:last-child{
                border-top-right-radius:20px;
            }
            &.active,&:hover{
                background-color: rgba(0, 0, 0, .45);
                color:#FFF;
            }
        }
    }
}
@media screen and (max-width: 480px){
    .header .tab{
        font-size: 18px!important;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-to, .fade-content-enter, .fade-content-leave-to{
  opacity: 0;
}
.container{
    position:relative;
    height:100%;
}
.fade-content-enter-active, .fade-content-leave-active {
  transition: all .4s ease-out;
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
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
</style>
