<template lang="html">
  <div id="appBody">
    <vHead :val="getValue"></vHead>
    <div id="appBody" class="ui container">
      <Stats></Stats>
      <vTable :searchValue="searchValue" :handleCount="handleCount"></vTable>
      <Pagination :count="count"></Pagination>
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
      searchValue: '',
      count: 3
    }
  },
  methods: {
    getValue(val){
      this.searchValue = val
    },
    handleCount(count){
      this.count = Math.ceil(count.length/10)
    }
  }
}
</script>

<style media="screen">
  .ui.container {
    width: 90%;
  }
</style>