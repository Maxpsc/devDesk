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
