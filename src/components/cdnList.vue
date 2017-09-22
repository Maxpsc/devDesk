<template lang="html">
    <div class="panel cdnlist">
        <div class="input-box">
            <input type="text" class="desk-input" v-model="inputText" placeholder="Enter Keyword"/>

            <el-tooltip class="item" effect="dark" content="Show up to" placement="right">
                <select v-model="sliceNum">
                    <option v-for="option in sliceGroup" :value="option">{{option}}</option>
                </select>
            </el-tooltip>
        </div>
        <transition-group name="list" tag="ul" class="list">
            <li  v-for="(item,index) in filteredList" :key="index" @click="handleClick(item[0])">
                <div class="left">
                    <h1>{{item[0]}}</h1>
                    <h5><i class="el-icon-star-on"></i>{{item[2]}}</h5>
                </div>
                <p>{{item[1]}}</p>
            </li>
        </transition-group>
    </div>
</template>

<script>
import { getCDNList } from '@/services/fetch';
export default {
    name: 'cdnList',
    data (){
        return {
            inputText: '',
            originList: [],
            list: [],
            sliceNum: 100, //截取前100,否则处理时间太长太大
            sliceGroup: [10,50,100,500,1000]
        }
    },
    computed: {
        showList: function(){
            return this.originList.slice(0,this.sliceNum);
        },
        filteredList: function(){
            return this.showList.filter((item,index) => {
                let nameContain = item[0].toLowerCase().indexOf(this.inputText.toLowerCase());
                let desContain = item[1].toLowerCase().indexOf(this.inputText.toLowerCase());
                return (nameContain !== -1)|| (desContain !== -1);
            })
        }
    },
    mounted (){
        getCDNList().then(res => {
            this.originList = res.data;
        })
    },
    methods: {
        handleClick(name){
            window.open(`http://bootcdn.cn/${name}`);
        }
    }

}
</script>

<style lang="scss" scoped>
.cdnlist{
    .input-box{
        position: absolute;
        left:50%;top:32px;
        width:70%;
        max-width: 500px;
        transform: translate(-50%,-50%);
        overflow: hidden;
        input{
            float:left;
            width:80%;
        }
        select{
            float:right;
            // width:10%;
            min-width:48px;
            appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none;
            height: 36px;
            padding:10px;
            font-size: 16px;
            border:none;
            outline: none;
        }
    }
    .list{
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
        padding:40px 0 20px 0;
        li{
            cursor:pointer;
            transition: all .4s;
            overflow: hidden;
            padding: 12px 0;
            border-bottom:#000 solid 1px;
            &:last-child{
                border-bottom: none;
            }
            &:hover{
                background:rgba(255,255,255,0.6);
            }
            .left{
                box-sizing: border-box;
                float:left;
                width:30%;
                padding-left:20px;
                max-width:270px;;
                h1{
                    font-size: 20px;
                }
                h5{
                    font-size: 14px;
                    font-weight: normal;
                    i{
                        font-size: .4em;
                        margin-right: 4px;
                    }
                }
            }
            p{
                float:left;
                width:70%;
                word-wrap: normal;
            }

        }
    }
}
.list-enter, .list-leave-to{
    opacity:0;
    transform: translateY(30px);
}
</style>
