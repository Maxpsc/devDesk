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
    top:14px;
    left:20px;
    z-index:100;
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
