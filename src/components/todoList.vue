<template lang="html">
    <div class="panel todoList">
        <div class="input-box">
            <input type="text" class="desk-input"
                v-model="inputText" placeholder="To do something~~"
                @keyup.enter="addItem"
            />
        </div>
        <transition-group name="list" tag="ul" class="list">
            <li :key="-1" class="empty-tip" v-show="todoList.length===0">
                Is there nothing to do?
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
</template>

<script>
export default {
    name: 'todoList',
    data (){
        return {
            inputText: '',
            todoList: []
        }
    },
    computed: {
        addDispable: function(){
            return this.inputText === '';
        }
    },
    methods: {
        addItem (){
            if(this.inputText === ''){
                this.$message.warning('You should enter something~~');
            }else{
                let newItem = {
                    text: this.inputText,
                    status: 'undo'
                };
                this.todoList.unshift(newItem);
                this.inputText = '';
                this.$message.success('Add success!');
            }
        },
        toggleItem (index){
            let target = this.todoList[index];
            target.status = target.status === 'undo' ? 'done' : 'undo';
        },
        removeItem (index){
            this.todoList.splice(index,1);
            this.$message.error('Delete success!');
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
    .list{
        position:relative;
        padding-right: 20px;
        .empty-tip{
            margin-top: 20px;
            text-align: center;
            font-size: 18px;
            color:#555;
        }
        li{
            list-style-type: none;
            transition:all .2s ;
            span{
                font-size: 24px;
                cursor:pointer;
                word-wrap: break-word;
            }
            .done{
                text-decoration: line-through;
            }
            .remove-btn{
                float:right;
                margin-right: 10px;
                color:#000;
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
