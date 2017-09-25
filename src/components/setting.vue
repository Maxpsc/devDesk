<template lang="html">
    <div class="setting">
        <!-- <i class="el-icon-setting setting-btn" ></i> -->
        <span @click="resetState()">RESET</span>
        <span @click="toggleContent()">
            <transition name="no-mode-translate-fade">
                <i key="menu" class="el-icon-menu" v-if="!showContent"></i>
                <i key="pic" class="el-icon-picture" v-else></i>
            </transition>
        </span>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'Vuex';

export default {
    name: 'setting',
    data (){
        return {
        }
    },
    computed: {
        ...mapState(['showContent'])
    },
    methods: {
        ...mapMutations(['RESET_STATE', 'TOGGLE_CONTENT']),
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
        &:last-child{
            margin-right: 0;
            font-size: 18px;
        }
    }
    i{
        display: inline-block;
        position:absolute;
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
