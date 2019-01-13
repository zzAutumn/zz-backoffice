import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './route';
import service from './service';
import store from './store';
import App from './App.vue';
import '@/assets/main.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
declare module 'vue/types/vue' {
  interface Vue {
    $service: any;
    $Message: any;
    $Modal: any;
    $Notify: any;
  }
}

Vue.prototype.$service = service;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
