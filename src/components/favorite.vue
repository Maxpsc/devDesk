<template lang="html">
    <div class="panel favorite">
        <h1 class="favorite-header">
            Favorite List
            <span :style="{float:'right',marginRight: '20px'}">
                <el-button size="mini" type="info" @click="beginAdd('0')">
                    <i class="el-icon-plus"></i>
                </el-button>
            </span>
        </h1>
        <el-tree :data="showList"
            :expand-on-click-node="false"
            default-expand-all
            :render-content="renderContent">
        </el-tree>
        <el-dialog title="Add favorite-item" :visible.sync="addDialog">
            <div class="dialog-content">
                <el-form :model="addingItem" label-width="60px">
                    <el-form-item label="Type:">
                        <el-radio-group v-model="addingItem.type">
                        <el-radio label="bookmark" name="bookmark"></el-radio>
                        <el-radio label="folder" name="folder"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="Label:">
                        <el-input v-model="addingItem.label"></el-input>
                    </el-form-item>
                    <el-form-item label="Url:" v-if="addingItem.type === 'bookmark'">
                        <el-input v-model="addingItem.url"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <div class="dialog-footer" slot="footer">
                <el-button @click="addDialog = false">Cancel</el-button>
                <el-button type="primary" @click="confirmAdd()" :disabled="addDisable">Add</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex';
import _ from 'lodash';
export default {
    name: 'favorite',
    data (){
        return {
            addDialog: false,
            addingItem: {
                type: 'bookmark', //or 'folder'
                label: '',
                url: 'http://',
            }
        }
    },
    computed: {
        ...mapState({
            'nodeList': 'favoriteList'
        }),
        addDisable: function(){
            let { label, type, url } = this.addingItem;
            const urlReg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
            return (label === '') || (type === 'bookmark' && !urlReg.test(url));
        },
        //展示用nodeList, 给每个节点添加pos标志用于add,remove操作
        showList: function(){
            let list = _.cloneDeep(this.nodeList);
            let rootNode = {children: list};
            function addIndex(node, abIndex){
                if(node.children){
                    for(let i =0;i<node.children.length;i++){
                        let cNode = node.children[i];//i表示当前所在index
                        cNode.pos = abIndex + ',' + i;
                        if(cNode.children){
                            addIndex(cNode, abIndex + ',' + i);
                        }
                    }
                }
            }
            addIndex(rootNode, 0);
            return rootNode.children;
        }
    },
    methods: {
        ...mapMutations(['ADD_FAVORITEITEM', 'REMOVE_FAVORITEITEM']),
        handleOpen (data){
            console.log(data.$treeNodeId);
            data.url && window.open(data.url);
        },
        beginAdd (pos){
            this.addingItem.pos = pos;
            this.addDialog = true;
        },
        confirmAdd (){
            this.ADD_FAVORITEITEM({content: this.addingItem});
            this.$message.success('Add success');
            this.addDialog = false;
        },
        removeItem (data){
            this.$confirm('Are you sure to remove ?', 'Warning', {
                confirmButtonText: 'Remove',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(()=> {
                this.confirmRemove(data.pos);
            }).catch(() => {});
        },
        confirmRemove (pos){
            this.REMOVE_FAVORITEITEM({ pos });
            this.$message.danger('Add success');
        },
        renderContent (h, {node,data,store}) {
            return (
                <span>
                    <span>
                      <span>{data.label}</span>
                    </span>
                    <span style="float: right; margin-right: 20px">
                      {
                          data.url
                          ? (<el-button size="mini" on-click={ () => this.handleOpen(data) }><i class="el-icon-document"></i></el-button>)
                          : (<el-button size="mini" type="info" on-click={ () => this.beginAdd(data.pos) }><i class="el-icon-plus"></i></el-button>)
                      }
                      <el-button size="mini" type="danger" on-click={ () => this.removeItem(data) }><i class="el-icon-close"></i></el-button>
                    </span>
                </span>
            )
        }
    }
}
</script>

<style lang="scss">
.favorite{
    padding: 10px 20px;
    overflow-y: auto;
    .favorite-header{
        margin-bottom: 10px;
        font-size: 22px;
        text-align: center;
        color:#FFF;
    }
}
.el-tree{
    background: transparent!important;
    border: none!important;
    .el-tree-node__content{
        color:#FFF;
        font-size: 16px;
        font-weight: 900;
        &:hover{
            background: rgba(0,0,0,.4);
        }
    }
}

</style>
