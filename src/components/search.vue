<template lang="html">
    <div class="panel search">
        <input type="text" class="desk-input main-search" ref="keyword" placeholder="Enter Keyword">
        <div class="btn-box">
            <!-- mouseover popover remove-btn -->
            <el-popover
                v-for="(item,index) in searchList"
                :key="index"
                placement="bottom"
                width="150"
                trigger="hover">
                <p class="remove-tip">
                    Click to <a @click="removeItem(index)">Remove<i class="el-icon-warning"></i></a>
                </p>
                <button slot="reference" :style="item.style" class="search-btn" @click="search(item)">
                    {{item.name}}
                </button>
            </el-popover>

            <!-- <button v-for="(item,index) in searchList" :style="item.style" class="search-btn"   @click="search(item)">
                {{item.name}}
            </button> -->
            <el-tooltip class="item" effect="dark" content="Custom your own search-btn" placement="right">
                <a class="add-btn" @click="showDialog = true"><i class="el-icon-plus"></i></a>
            </el-tooltip>
        </div>
        <el-dialog title="Add search-item" :visible.sync="showDialog">
            <div class="dialog-content">
                <input type="text" class="btn-input" :style="newItem.style" v-model="newItem.name" placeholder="button's name">
                <div class="left">
                    <span>Search url: ( please use <?> replace keyword )</span>
                    <el-input type="textarea"
                        :autosize="{ minRows: 4, maxRows: 6}"
                        v-model="newItem.url">
                    </el-input>
                </div>
                <div class="right">
                    <label class="color-label" for="bg-color">
                        <span>bgColor: {{newItem.style.backgroundColor}}</span>
                        <!-- <input type="color" name="bg-color" v-model="newItem.style.backgroundColor"> -->
                        <el-color-picker v-model="newItem.style.backgroundColor"></el-color-picker>
                    </label>
                    <label class="color-label" for="text-color">
                        <span>textColor: {{newItem.style.color}}</span>
                        <!-- <input type="color" name="text-color" v-model="newItem.style.color"> -->
                        <el-color-picker v-model="newItem.style.color"></el-color-picker>
                    </label>
                </div>
            </div>

            <div class="dialog-footer" slot="footer">
                <el-button @click="showDialog = false">Cancel</el-button>
                <el-button type="primary" @click="confirmAdd()" :disabled="addDisable">Add</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex';
export default {
    name: 'search',
    data (){
        return {
            showDialog: false,
            // addDisable: true,
            newItem: {
                name: '',
                url:'http://',
                style:{
                    backgroundColor: '#000000',
                    color: '#FFFFFF'
                }
            },
        }
    },
    computed: {
        ...mapState([
            "searchList"
        ]),
        addDisable: function(){
            const urlReg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
            return this.newItem.name === '' || !urlReg.test(this.newItem.url);
        }
    },
    methods: {
        ...mapMutations([
            'ADD_SEARCHITEM', 'REMOVE_SEARCHITEM'
        ]),
        search(item) {
            let keyword = this.$refs.keyword.value;
            if(keyword === '') return false;
            let nUrl = item.url.replace('<?>', keyword);
            window.open(nUrl);
        },
        confirmAdd(){
            this.ADD_SEARCHITEM({item: this.newItem});
            this.showDialog = false;
            this.newItem = {
                name: '',
                url:'http://',
                style:{
                    backgroundColor: '#FFFFFF',
                    color: '#000000'
                }
            };
            this.$message.success('Add success!');
        },
        removeItem(index) {
            console.log(index);
            this.REMOVE_SEARCHITEM({index});
            this.$message.error("Delete success");
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dialog__body{
    padding:10px !important;
}
.search{
    padding:10px;
    .main-search{
        display: block;
        width:70%;
        max-width: 500px;
        margin: 10px auto 20px;
        font-size: 20px;
    }
    .btn-box{
        overflow: auto;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        a{
            cursor:pointer;
        }
        .search-btn{
            display: block;
            position: relative;
            padding:10px 18px;
            margin: 10px;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: 2px;
            word-wrap: break-word;
            outline: none;
            border:none;
            border-radius: 10px;
            box-shadow: #333 1px 3px 4px 1px;
            cursor:pointer;
            overflow: hidden;
            &:after{
                content:'';
                display: block;
                position:absolute;
                left:0;top:0;
                width:100%;
                height:100%;
                background-color: #FFF;
                opacity:0;
                transition: all .2s;
                border-radius: 10px;
            }
            &:hover{
                box-shadow: #333 0 0 0 0;;
                &:after{
                    opacity:.5;
                }
            }
        }
        .add-btn{
            display: block;
            padding:8px 18px;
            margin: 8px;
            font-size: 20px;
            border: #8492a6 dotted 2px;
            border-radius: 10px;
            color:#FFF;
            transition:all .2s;
            &:hover{
                background: rgba(0,0,0,.6);
                color:#FFF;
                border: #FFF dotted 2px;
            }
        }
    }

    .dialog-content{
        position: relative;
        padding:50px 10px 0;
        overflow: hidden;
        .btn-input{
            position: absolute;
            left: 50%;
            top:0;
            transform: translateX(-50%);
            display: block;
            width:60%;
            max-width: 200px;
            padding:10px 18px;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: 2px;
            text-align: center;
            outline: none;
            border:none;
            border: #555 solid 1px;
            border-radius: 10px;
            overflow: hidden;
        }
        .left{
            float:left;
            width:74%;
            margin-top: 10px;
        }
        .right{
            float:right;
            width:24%;
            margin-top: 10px;
            text-align: right;
            .color-label{
                display: block;
            }
        }
        span{
            display: block;
            margin-bottom: 8px;
        }
    }
}
.remove-tip{
    text-align: center;
    a{
        display: inline-block;
        padding:4px 8px;
        margin: 0 4px;
        font-weight: bold;
        color:#FFF;
        background-color: crimson;
        border-radius: 4px;
        cursor:pointer;
        i{margin-left: 4px;}
    }
}
</style>
