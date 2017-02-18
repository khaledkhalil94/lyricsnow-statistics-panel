<template lang="html">
  <div id="appBody">
    <vHead></vHead>
    <div id="appBody" class="ui container">
      <vTable></vTable>
    </div>
  </div>
</template>

<script>
import vHead from './../Header'
import vTable from './Table'

export default {
  components: {
    vHead, vTable
  }
}
</script>

<style media="screen">
  .ui.container {
    width: 90%;
  }
</style>