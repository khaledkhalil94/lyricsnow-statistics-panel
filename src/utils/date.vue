<template lang="html">
  <span class="relateive-date" :title="date">
    {{ now }}
  </span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MakeDate',
  props: ['date'],
  data (){
    return {
      moment, now: null
    }
  },
  created: function () {
    this.renderDate()
    setInterval(() => {
      this.renderDate()
    }, 3000)
  },
  methods: {
    renderDate () {
      this.now = moment(this.date).fromNow()
    }
  }
}
</script>

<style lang="css">
</style>