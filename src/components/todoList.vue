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
                <li v-for="(item, index) in todoList" :key="index" class="todo-item">
                    <a class="edit-btn" @click="editItem(index)"><i class="el-icon-edit"></i></a>
                    <span class="index"> {{index+1}}. </span>
                    <span v-if="editIndex!==index" class="content"
                        :class="{done: item.status === 'done'}"
                        @click="toggleItem(index)">
                        {{item.text}}
                    </span>
                    <input type="text" class="edit-input" ref="editInput"
                        v-else=""
                        v-model="editContent" @keyup.enter="saveEdit()"/>
                    <a v-show="editIndex!==index" class="remove-btn" @click="removeItem(index)">
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
            inputText: '',
            editContent: '',//二次编辑内容
            editIndex: -1//编辑状态index
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
        },
        editItem (index){
            if(index === this.editIndex){
                this.saveEdit();
            }else{
                this.editIndex = index;
                this.editContent = this.todoList[index].text;
                setTimeout(() => {
                    this.$refs.editInput[0].focus();
                },0);
            }
        },
        saveEdit (){
            this.todoList[this.editIndex].text = this.editContent;
            this.editIndex = -1;
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
        padding: 0 20px;
        li{
            list-style-type: none;
        }
        .empty-tip{
            margin-top: 20px;
            text-align: center;
            font-size: 18px;
            color:#fff;
        }
        .todo-item{
            display: flex;
            justify-content: space-between;
            align-items:center;
            margin-bottom: 10px;
            transition:all .2s ;
            a{
                margin-right: 10px;
                color:#FFF;
                cursor:pointer;
                transition: all .2s;
            }
            a,span{
                font-size: 24px;
            }
            .edit-btn{
                margin-right: 10px;
                font-size: 20px;
                &:hover{
                    color:#20a0ff;
                }
            }
            .index{
                color: #FFF;
                margin-right: 10px;
            }
            .edit-input{
                flex:1;
                width: 100%;
                background: transparent;
                color:#FFF;
                font-size: 24px;
                border-bottom: #FFF solid 1px;
            }
            .content{
                flex:1;
                color: #FFF;
                cursor:pointer;
                word-break: break-all;
            }
            .done{
                text-decoration: line-through;
            }
            .remove-btn{
                margin-left: 10px;
                font-size: 20px;
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
