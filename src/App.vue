<template>
  <div id="app" :style="{backgroundImage: `url(${backgroundUrl})`}">
      <clock></clock>
      <weather></weather>
      <setting></setting>
      <main-content></main-content>
  </div>
</template>

<script>
import clock from '@/components/clock';
import weather from '@/components/weather';
import setting from '@/components/setting';
import MainContent from '@/components/content';
import { mapState, mapActions } from 'Vuex';
import { setStorage } from '@/services/storage';

//根组件，组织子组件，初始化state
export default {
  name: 'app',
  data (){
      return {
          backgroundUrl: '',
          loading: true
      };
  },
  components: {
      clock,
      weather,
      setting,
      MainContent
  },
  computed: {
      ...mapState(['todoList','favorite','searchList'])
  },
  watch: {
      todoList: {
          deep: true,
          handler: function(nList,oList){
              console.log('list1 change');
              setStorage({'devDesk_todoList': nList}, () => {
                //   this.$message.success('save success');
              });
          }
      },
      favorite: {
          deep: true,
          handler: function(nList,oList){
              console.log('list2 change');
              setStorage({'devDesk_favorite': nList}, () => {
                //   this.$message.success('save success');
              });
          }
      },
      searchList: {
          deep: true,
          handler: function(nList,oList){
              console.log('list3 change');
              setStorage({'devDesk_searchList': nList}, () => {
                //   if(oList.length!==0)this.$message.success('save success');
              });
          }
      },
  },
  mounted (){
      //从chromeStorage获取数据
      this.getChromeStorage();
      //生成今日壁纸
      let num = Math.ceil(Math.random() * 51);
      num = (num >= 10) ? num : '0' + num;
      this.backgroundUrl = `/static/wallpaper/${num}.jpg`;
  },
  methods: {
      ...mapActions(['getChromeStorage'])
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
  /*background-image: url('http://api.dujin.org/bing/1920.php');*/
  background-image: url('./assets/wallpaper/01.jpg');

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
    background: transparent;
    color:#FFF;
    text-align: center;
    border-bottom: #FFF solid 2px;
}
input::-webkit-input-placeholder{
    color: rgba(255,255,255,.7);
}
</style>
