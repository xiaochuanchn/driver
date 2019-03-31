import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
Vue.use(Vant);
Vue.config.productionTip = false

Vue.use(iView);

import router from './router.config'
import './assets/css/base.css'
import './assets/css/van.css'
import './plugins/axios'
import store from './store'

new Vue({
  render: h => h(App),
  router,store,
}).$mount('#app')


