import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import "../src/assets/css/common.css"
import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)

import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')