<template lang="html">
  <span class="relateive-date" :title="date">
    {{ now }}
  </span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MakeDate',
  props: ['date', 'suffix'],
  data (){
    return {
      moment, now: null
    }
  },
  created: function () {
    this.renderDate()
    setInterval(() => {
      this.renderDate()
    }, 1000)
  },
  methods: {
    renderDate () {
      this.now = moment(this.date).fromNow(this.suffix)
    }
  }
}
</script>

<style lang="css">
</style>