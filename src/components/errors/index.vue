<template lang="html">
  <div id="appBody">
    <vHead :val="getValue"></vHead>
    <div id="appBody" class="ui container">
      <Stats></Stats>
      <vTable :searchValue="searchValue"></vTable>
      <Pagination></Pagination>
    </div>
  </div>
</template>

<script>
import vHead from './../Header'
import Stats from './stats'
import vTable from './Table'
import Pagination from './pagination'

export default {
  components: {
    vHead, Stats, vTable, Pagination
  },
  data (){
    return {
      searchValue: ''
    }
  },
  methods: {
    getValue(val){
      this.searchValue = val
    }
  }
}
</script>