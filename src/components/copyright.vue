<template lang="html">
    <div class="copyright">
        <span>Copyright © 2017 PSC. All rights reserved. </span>
    </div>
</template>

<script>
export default {
    name: 'copyright'
}
</script>

<style lang="scss" scoped>
.copyright{
    position: fixed;
    right:0;bottom:0;
    padding: 14px 20px 14px 20px;
    z-index:100;
    background: -webkit-radial-gradient(0% 100%, rgba(0,0,0,.4),rgba(0,0,0,0));
    border-top-left-radius: 20px;
    color:#FFF;
    text-align: center;
    -webkit-user-select:none;
    span{
        font-size: 12px;
    }
}
@media screen and (max-width:480px){
    .copyright{
        width:100%;
    }
}
</style>
