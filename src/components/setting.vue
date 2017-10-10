<template lang="html">
    <div class="setting">
        <!-- <i class="el-icon-setting setting-btn" ></i> -->
        <span @click="resetState()">RESET</span>
        <el-tooltip class="item" effect="dark" content="import data" placement="top">
            <span @click="importJSON()"><i class="el-icon-upload2"></i></span>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="export data" placement="top">
            <span @click="exportJSON()"><i class="el-icon-document"></i></span>
        </el-tooltip>
        <span @click="toggleContent()">
            <transition name="no-mode-translate-fade">
                <i key="menu" class="el-icon-menu" v-if="!showContent"></i>
                <i key="pic" class="el-icon-picture" v-else></i>
            </transition>
        </span>
        <input type="file" ref="importInput" id="importInput" name="importInput" accept="application/json">
    </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex';
import { setFileReader } from '@/services/storage';

export default {
    name: 'setting',
    data (){
        return {
        }
    },
    computed: {
        ...mapState(['todoList','favoriteList','searchList','showContent'])
    },
    methods: {
        ...mapMutations(['RESET_STATE', 'TOGGLE_CONTENT', 'INIT_STATE']),
        resetState() {
            this.$confirm('This will clear your data, would you continue?', 'RESET', {
                confirmButtonText: 'RESET',
                cancelButtonText: 'Canel',
                type: 'warning'
            }).then(() => {
                this.RESET_STATE();
                this.$message.success('reset success');
            }).catch(() => {

            })
        },
        toggleContent() {
            this.TOGGLE_CONTENT();
        },
        importJSON() {
            let fileNode = this.$refs.importInput;
            fileNode.onchange = () =>{
                let file = fileNode.files[0];
                if(file.type !== 'application/json'){
                    this.$message.error('Please select a valid JSON file!');
                    return;
                }else{
                    setFileReader(file, (event) => {
                        let json = JSON.parse(event.target.result);
                        if(!json.showContent || !json.todoList || !json.favoriteList || !json.searchList){
                            this.$message.error('Invalid JSON file!');
                        }else{
                            this.INIT_STATE(json);
                            this.$message.success('Import success!');
                        }
                    })
                }
            };
            fileNode.click();
        },
        exportJSON() {
            let { showContent, todoList, favoriteList, searchList } = this;
            let jsonStr = JSON.stringify({
                showContent,
                todoList,
                favoriteList,
                searchList
            });
            let blob = new Blob([jsonStr],{type: 'application/json'});
            let downloadNode = document.createElement('a');
            downloadNode.download = 'devDesk.json';
            downloadNode.href = URL.createObjectURL(blob);
            document.body.appendChild(downloadNode);
            downloadNode.click();
            document.body.removeChild(downloadNode);
        }
    }
}
</script>

<style lang="scss" scoped>
.setting{
    position: fixed;
    display: flex;
    left:0;bottom:0;
    padding: 14px 20px 14px 20px;
    z-index:100;
    background: -webkit-radial-gradient(0% 100%, rgba(0,0,0,.4),rgba(0,0,0,0));
    border-top-right-radius: 20px;
    color:#FFF;
    -webkit-user-select:none;
    span{
        display: inline-block;
        position:relative;
        min-height:14px;
        min-width:14px;
        font-size: 14px;
        margin-right: 20px;
        cursor:pointer;
        &:hover{
            color: #999;
        }
        &:last-child{
            margin-right: 0;
            font-size: 18px;
        }
    }
    i{
        display: inline-block;
        position:absolute;
    }
    #importInput{
        display: inline-block;
        width:0;
        opacity:0;
    }
}

.no-mode-translate-fade-enter-active, .no-mode-translate-fade-leave-active {
  transition: all .6s;
}
.no-mode-translate-fade-enter, .no-mode-translate-fade-leave-active {
  opacity: 0;
}
.no-mode-translate-fade-enter {
  transform: translateY(18px);
}
.no-mode-translate-fade-leave-active {
  transform: translateY(-18px);
}


</style>
