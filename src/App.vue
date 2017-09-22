<template>
  <div id="app">
      <clock></clock>
      <weather></weather>
      <main-content></main-content>
  </div>
</template>

<script>
import Clock from './components/clock';
import Weather from './components/weather';
import Content from './components/content';
// import { getStorage, setStorage } from '@/services/storage';

//根组件，组织子组件，初始化state
export default {
  name: 'app',
  data (){
      return {
          backgroundUrl: 'http://api.dujin.org/bing/1920.php',
          loading: true
      };
  },
  components: {
      'clock': Clock,
      'weather': Weather,
      'main-content': Content,
  },
  mounted(){
      //加载背景图片（通过本地缓存获取）
  },
  methods: {
  }
}
</script>

<style>
html,body{
    height:100%;
}
body,div,h1,h2,h3,h4,h5,p,span{margin:0;padding:0;}
input{outline:none;border:none;}
a{
    color:#000,;
    text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
  height:100%;

  background-size: cover;
  background-position: center center;
  background-image: url('http://api.dujin.org/bing/1920.php');

  display: flex;
  justify-content: center;
  align-items: center;
}
.desk-input{
    display: inline-block;
    width:60%;
    max-width:400px;
    height:32px;
    line-height: 32px;
    font-size: 18px;
    font-weight: bold;
    background: rgba(255,255,255,0.6);
    color:#000;
    text-align: center;
    border-bottom: #000 solid 2px;
}
</style>
