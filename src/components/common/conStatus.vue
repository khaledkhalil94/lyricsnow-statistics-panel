<template lang="html">
  <div class="item">
    <div>Status: <span :class="status ? 'connected' : 'disconnected'"></span></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState({
      status: state => state.stats.data.connectionStatus
    })
  }
</script>

<style lang="sass" scoped>
  div.item div span
    display: inline-flex
    vertical-align: bottom
    margin-left: 5px
    height: 13px
    width: 13px
    border-radius: 100%
    border: 1px solid #cccccc
    &.connected
      background-color: green
    &.disconnected
      background-color: red
</style>