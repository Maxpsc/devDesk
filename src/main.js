import Vue from 'vue'
import App from './App'
// import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

const app = new Vue({
    el: '#app',
    store,
    // router,
    template: '<App/>',
    components: { App }
});

(function(T,h,i,n,k,P,a,g,e){g=function(){P=h.createElement(i);a=h.getElementsByTagName(i)[0];P.src=k;P.charset="utf-8";P.async=1;a.parentNode.insertBefore(P,a)};T["ThinkPageWeatherWidgetObject"]=n;T[n]||(T[n]=function(){(T[n].q=T[n].q||[]).push(arguments)});T[n].l=+new Date();if(T.attachEvent){T.attachEvent("onload",g)}else{T.addEventListener("load",g,false)}}(window,document,"script","tpwidget","//widget.seniverse.com/widget/chameleon.js"))

tpwidget("init", {
    "flavor": "bubble",
    "location": "WX4FBXXFKE4F",
    "geolocation": "enabled",
    "position": "top-right",
    "margin": "10px 10px",
    "language": "auto",
    "unit": "c",
    "theme": "chameleon",
    "uid": "U757FFE87F",
    "hash": "61b718d3952485995831a0a5995f9081"
});
tpwidget("show");
