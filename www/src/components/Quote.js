const template = '<div id="quote" v-html="text"></div>'

module.exports = Vue.component('Quote', {
  template: template,
  data: () => {
    return {
      text: '',
    }
  },
  created: function () {
    this.getNewJoke()
  },
  methods: {
    getNewJoke: function() {
      const delay = 300 * 1000
      setTimeout(this.getNewJoke.bind(this), delay)

      const xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://icanhazdadjoke.com/')
      xhr.setRequestHeader('Accept', 'text/plain')
      xhr.setRequestHeader('User-Agent', 'Private Custom Desktop Quotes')
      xhr.send(null)

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this.text = xhr.responseText.replace(/\"/g, '')
        }
      }
    }
  },
})
