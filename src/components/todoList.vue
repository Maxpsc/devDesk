<template lang="html">
    <div class="panel todoList">
        <div class="input-box">
            <input type="text" class="desk-input"
                v-model="inputText" placeholder="To do something~~"
                @keyup.enter="addItem"
            />
        </div>
        <div class="list-box">
            <transition-group name="list" tag="ul" class="list">
                <li :key="-1" class="empty-tip" v-show="todoList.length===0">
                    Is there anything to do?
                </li>
                <li  v-for="(item, index) in todoList" :key="index" >
                    <span :class="{done: item.status === 'done'}" @click="toggleItem(index)">
                        {{index+1}}. {{item.text}}
                    </span>
                    <a href="javascript:;" class="remove-btn" @click="removeItem(index)">
                        <i class="el-icon-close"></i>
                    </a>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex';
export default {
    name: 'todolist',
    data (){
        return {
            inputText: ''
        }
    },
    computed: {
        ...mapState([
            'todoList'
        ]),
        addDispable: function(){
            return this.inputText === '';
        }
    },
    methods: {
        ...mapMutations([
            'ADD_TODOITEM','REMOVE_TODOITEM','TOGGLE_TODOITEM'
        ]),
        addItem (){
            if(this.inputText === ''){
                this.$message.warning('You should enter something~~');
            }else{
                let newItem = {
                    text: this.inputText,
                    status: 'undo'
                };
                this.ADD_TODOITEM({item: newItem});
                this.inputText = '';
            }
        },
        toggleItem (index){
            this.TOGGLE_TODOITEM({index: index});
        },
        removeItem (index){
            this.REMOVE_TODOITEM({index: index});
        }
    }
}
</script>

<style lang="scss" scoped>
.todoList{
    .input-box{
        width:100%;
        input{
            width:100%;
            max-width: 100%;
            height:50px;
            line-height: 50px;
            font-size: 24px;
        }
    }
    .list-box{
        box-sizing: border-box;
        width:100%;
        height:100%;
        padding-bottom:50px;
        overflow-y: auto;
    }
    .list{
        position:relative;
        padding-right: 20px;
        .empty-tip{
            margin-top: 20px;
            text-align: center;
            font-size: 18px;
            color:#fff;
        }
        li{
            list-style-type: none;
            margin-bottom: 10px;
            transition:all .2s ;
            span{
                font-size: 24px;
                color: #FFF;
                cursor:pointer;
                word-wrap: break-word;
            }
            .done{
                text-decoration: line-through;
            }
            .remove-btn{
                float:right;
                margin-right: 10px;
                color:#FFF;
                font-weight: 900;
                transition: all .2s;
                &:hover{
                    color: crimson;
                }
            }
        }
    }
}
.list-leave-active{
    // position:absolute;
}
.list-enter,.list-leave-to{
    opacity:0;
    transform: translateX(-100px);
}
.list-move {
  transition: transform .4s;
}
</style>
