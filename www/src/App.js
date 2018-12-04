const Quote = require('./components/Quote')

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<Quote/>',
  components: { Quote }
})
