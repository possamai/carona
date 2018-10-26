// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import 'vuetify/dist/vuetify.css'
import VueFire from 'vuefire'
import VueMoment from 'vue-moment'

import App from './App'
import router from './router'
import store from './store/index'

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(VueFire)
Vue.use(VueMoment)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    this.$store.dispatch('init')
  }
})
