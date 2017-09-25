<template>
  <div id="clock">
      <h1>{{date}}</h1>
      <h2><i class="el-icon-time"></i>{{time}}</h2>
  </div>
</template>

<script>
import { getToday, getCurrentTime } from '@/services/format';
import moment from 'moment';

export default {
  name: 'clock',
  data (){
    return {
        date: getToday(),
        time: getCurrentTime()
    }
  },
  mounted (){
      setInterval(() => {
          this.time = getCurrentTime();
      },1000);
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#clock{
    position:fixed;
    top:0;left:0;
    padding: 14px 20px 14px 20px;
    z-index:100;
    // background: rgba(0,0,0,.1);
    background: -webkit-radial-gradient(0% 0%, rgba(0,0,0,.4),rgba(0,0,0,.2), rgba(0,0,0,0));
    border-bottom-right-radius: 20px;
}
h1,h2{
    color:#FFF;
    margin:0;
}
h1{
    font-size: 18px;
}
h2{
    margin-top: 6px;
    font-size: 16px;
    i{
        margin-right: 6px;
    }
}

</style>
