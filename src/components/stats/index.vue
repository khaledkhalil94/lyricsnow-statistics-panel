<template>
  <div id="appBody" class="ui container">
    <stats></stats>
    <vTable :searchValue="searchValue"></vTable>
  </div>
</template>

<script>
import vTable from './Table'
import stats from './Stats'

export default {
  components: {
    vTable, stats
  },
  props: ['searchValue']
}
</script>