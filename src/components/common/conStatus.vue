<template lang="html">
  <div class="item">
    <div>
      Status: <i class="circle icon" :class="status ? 'green' : 'red'"></i>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: mapState({
      status: state => state.stats.data.connection.connectionStatus
    })
  }
</script>

<style scoped>
  div.item div i {
    margin-left: 5px;
  }
</style>