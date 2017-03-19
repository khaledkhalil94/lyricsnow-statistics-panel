<template>
  <div class='item'>
    <b>Uptime:</b><MakeDate v-if="upTime" :date="upTime" :suffix="true" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MakeDate } from '../../utils/'

export default {
  components: {
    MakeDate
  },
  computed: mapState({
    upTime: state => state.stats.data.connection.upTime
  })
}
</script>

<style scoped>
  span {
    margin-left: 5px;
  }
</style>
