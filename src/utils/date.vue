<template lang="html">
  <span class="relateive-date">
    ({{ makeDate(date) }})
  </span>
</template>

<script>
import moment from 'moment'

export default {
  props: ['date'],
  data (){
    return {
      moment
    }
  },
  methods: {
    makeDate (x){
      return moment(x).fromNow()
    }
  }
}
</script>

<style lang="css">
</style>
