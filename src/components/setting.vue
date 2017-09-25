<template lang="html">
    <div class="setting">
        <!-- <i class="el-icon-setting setting-btn" ></i> -->
        <span @click="resetState()">RESET</span>
        <span @click="toggleContent()">
            <i class="el-icon-menu" v-show="!showContent"></i>
            <i class="el-icon-picture" v-show="showContent"></i>
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
    left:0;bottom:0;
    padding: 14px 20px 14px 20px;
    z-index:100;
    background: -webkit-radial-gradient(0% 100%, rgba(0,0,0,.4),rgba(0,0,0,0));
    border-top-right-radius: 20px;
    color:#FFF;
    -webkit-user-select:none;
    span{
        font-size: 14px;
        margin-right: 20px;
        cursor:pointer;
        &:last-child{
            margin-right: 0;
        }
    }
}
.setting-transition-enter, .setting-transition-leave-to{
    left:0;
    opacity:0;
}
</style>
