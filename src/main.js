import Vue from 'vue'
import App from './App'
import WxRequest from './utils/httpUtils'

Vue.config.productionTip = false
Vue.prototype.$wxRequest = WxRequest

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
