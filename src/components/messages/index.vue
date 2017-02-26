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